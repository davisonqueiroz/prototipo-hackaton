// app.jsx — shell, navigation stack, route map for both prototype and canvas

// ─────────────────────────────────────────────────────────────
// Global app store — persists menu item state across navigation
// (defined here so Babel compile always runs fresh, avoiding
//  the data.js serve-cache issue)
// ─────────────────────────────────────────────────────────────
window.__appStore = window.__appStore || { menuItems: {}, stockEvents: {} };
window.__appStore.menuItems = window.__appStore.menuItems || {};
window.__appStore.stockEvents = window.__appStore.stockEvents || {};

window.__updateMenuItem = function(item) {
  window.__appStore.menuItems[item.id] = item;
  if (window.MOCK) {
    const todayIdx = (window.MOCK.MENU_TODAY || []).findIndex(x => x.id === item.id);
    if (todayIdx >= 0) window.MOCK.MENU_TODAY[todayIdx] = item;
    Object.values(window.MOCK.FUTURE_MENUS || {}).forEach(menu => {
      const idx = (menu.items || []).findIndex(x => x.id === item.id);
      if (idx >= 0) menu.items[idx] = item;
    });
  }
  window.dispatchEvent(new CustomEvent('cozinhaUpdate', { detail: { type: 'menuItem', id: item.id } }));
};

window.__stockEvent = function(ingredientRef, ev) {
  window.__appStore.stockEvents[ingredientRef] = window.__appStore.stockEvents[ingredientRef] || [];
  window.__appStore.stockEvents[ingredientRef].unshift({
    time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    ...ev,
  });
};
window.__changeStock = function(ingredientRef, delta, meta = {}) {
  if (!window.MOCK || !ingredientRef) return;
  const ing = window.MOCK.INGREDIENTS[ingredientRef];
  let se = window.MOCK.STOCK.find(x => x.ref === ingredientRef);
  if (!se && ing) {
    se = { ref: ingredientRef, ...ing };
    window.MOCK.STOCK.push(se);
  }
  const apply = (obj) => {
    if (!obj) return;
    obj.qty = Math.max(0, Number(obj.qty || 0) + Number(delta || 0));
    if (obj.qty === 0) obj.status = 'out';
    else if (obj.qty < 1500 && obj.unit !== 'un') obj.status = 'low';
    else if (obj.status === 'out' || obj.status === 'low') obj.status = 'normal';
  };
  apply(ing);
  if (se && se !== ing) apply(se);
  window.__stockEvent(ingredientRef, { type: meta.type || (delta >= 0 ? 'entrada' : 'consumo'), qty: delta, by: meta.by || 'Operacao', reason: meta.reason || '' });
  window.dispatchEvent(new CustomEvent('cozinhaUpdate', { detail: { type: 'stock', ref: ingredientRef } }));
};
window.__updateStock = function(ingredientRef, delta, meta = {}) {
  window.__changeStock(ingredientRef, -Math.abs(Number(delta || 0)), { type: meta.type || 'descarte', by: meta.by || 'Descarte', reason: meta.reason });
};

window.__addRecipe = function(recipe) {
  if (!window.MOCK || !recipe) return null;
  const id = recipe.id || ('receita_' + Date.now());
  const clean = {
    id,
    name: recipe.name || 'Nova receita',
    portions: Number(recipe.portions || 100),
    status: 'planned',
    progress: 0,
    expectedAt: recipe.expectedAt || '11:30',
    tags: [],
    timeline: [{ time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }), event: 'Receita criada manualmente' }],
    ingredients: (recipe.ingredients || []).filter(x => x.ref).map(x => ({ ref: x.ref, planned: Number(x.planned || 0), used: 0, discarded: 0, tags: [] })),
  };
  window.MOCK.MENU_TODAY = window.MOCK.MENU_TODAY || [];
  window.MOCK.MENU_TODAY.unshift(clean);
  window.__updateMenuItem(clean);
  return clean;
};

window.__addStockEntry = function(entry) {
  if (!window.MOCK || !entry) return;
  const ref = entry.ref || ('manual_' + Date.now());
  const clean = { ...entry, ref, qty: Number(entry.qty || 0) };
  const existingIng = window.MOCK.INGREDIENTS[ref];
  const existingStock = window.MOCK.STOCK.find(x => x.ref === ref);
  if (existingIng) {
    existingIng.qty = Number(existingIng.qty || 0) + clean.qty;
    existingIng.lot = clean.lot || existingIng.lot;
    existingIng.expires = clean.expires || existingIng.expires;
    existingIng.location = clean.location || existingIng.location;
  } else {
    window.MOCK.INGREDIENTS[ref] = clean;
  }
  if (existingStock) {
    existingStock.qty = Number(existingStock.qty || 0) + clean.qty;
    existingStock.lot = clean.lot || existingStock.lot;
    existingStock.expires = clean.expires || existingStock.expires;
    existingStock.location = clean.location || existingStock.location;
    if (existingStock.qty > 0 && existingStock.status === 'out') existingStock.status = 'normal';
  } else {
    window.MOCK.STOCK.unshift({ ...window.MOCK.INGREDIENTS[ref], ref });
  }
  window.__stockEvent(ref, { type: 'entrada', qty: clean.qty, by: clean.by || 'Recebimento manual', reason: clean.obs || '' });
  window.dispatchEvent(new CustomEvent('cozinhaUpdate', { detail: { type: 'stock', ref } }));
};

// Future menus — injected here so they're always available
if (window.MOCK && !window.MOCK.FUTURE_MENUS) {
  window.MOCK.FUTURE_MENUS = {
    'qui': {
      label: 'Qui · 29 abr', portions: 200,
      items: [
        { id: 'f-arroz-qui',  name: 'Arroz branco',            portions: 200, status: 'planned', progress: 0, expectedAt: '11:00', tags: [], timeline: [], ingredients: [{ ref: 'arrozBranco', planned: 6000, used: 0, tags: [] }] },
        { id: 'f-feijao-qui', name: 'Feijão carioca',          portions: 200, status: 'planned', progress: 0, expectedAt: '11:00', tags: [], timeline: [], ingredients: [{ ref: 'feijaoCarioca', planned: 4500, used: 0, tags: [] }] },
        { id: 'f-frango-qui', name: 'Filé de frango grelhado', portions: 180, status: 'planned', progress: 0, expectedAt: '11:30', tags: [], timeline: [], ingredients: [{ ref: 'fileFrango', planned: 9000, used: 0, tags: [] }, { ref: 'alho', planned: 80, used: 0, tags: [] }] },
        { id: 'f-salada-qui', name: 'Salada de tomate',        portions: 200, status: 'planned', progress: 0, expectedAt: '11:00', tags: [], timeline: [], ingredients: [{ ref: 'tomate', planned: 2000, used: 0, tags: [] }] },
        { id: 'f-batata-qui', name: 'Batata sauté',            portions: 150, status: 'planned', progress: 0, expectedAt: '11:15', tags: [], timeline: [], ingredients: [{ ref: 'batata', planned: 6000, used: 0, tags: [] }, { ref: 'oleo', planned: 300, used: 0, tags: [] }] },
        { id: 'f-suco-qui',   name: 'Suco de laranja',         portions: 200, status: 'planned', progress: 0, expectedAt: '11:30', tags: [], timeline: [], ingredients: [{ ref: 'laranja', planned: 9000, used: 0, tags: [] }] },
      ],
    },
    'sex': {
      label: 'Sex · 30 abr', portions: 200,
      items: [
        { id: 'f-arroz-sex',    name: 'Arroz branco',     portions: 200, status: 'planned', progress: 0, expectedAt: '11:00', tags: [], timeline: [], ingredients: [{ ref: 'arrozBranco', planned: 6000, used: 0, tags: [] }] },
        { id: 'f-feijao-sex',   name: 'Feijão preto',     portions: 200, status: 'planned', progress: 0, expectedAt: '11:00', tags: [], timeline: [], ingredients: [{ ref: 'feijaoCarioca', planned: 4000, used: 0, tags: [] }] },
        { id: 'f-bife-sex',     name: 'Bife acebolado',   portions: 160, status: 'planned', progress: 0, expectedAt: '11:30', tags: [], timeline: [], ingredients: [{ ref: 'patinho', planned: 8000, used: 0, tags: [] }, { ref: 'cebola', planned: 600, used: 0, tags: [] }] },
        { id: 'f-brocolis-sex', name: 'Brócolis no vapor',portions: 180, status: 'planned', progress: 0, expectedAt: '11:15', tags: [], timeline: [], ingredients: [{ ref: 'brocolis', planned: 3500, used: 0, tags: [] }] },
        { id: 'f-suco-sex',     name: 'Suco de laranja',  portions: 200, status: 'planned', progress: 0, expectedAt: '11:30', tags: [], timeline: [], ingredients: [{ ref: 'laranja', planned: 9000, used: 0, tags: [] }] },
      ],
    },
    'seg': {
      label: 'Seg · 03 mai', portions: 200,
      items: [
        { id: 'f-arroz-seg',  name: 'Arroz branco',          portions: 200, status: 'planned', progress: 0, expectedAt: '11:00', tags: [], timeline: [], ingredients: [{ ref: 'arrozBranco', planned: 6000, used: 0, tags: [] }] },
        { id: 'f-feijao-seg', name: 'Feijão carioca',        portions: 200, status: 'planned', progress: 0, expectedAt: '11:00', tags: [], timeline: [], ingredients: [{ ref: 'feijaoCarioca', planned: 4500, used: 0, tags: [] }] },
        { id: 'f-estrog-seg', name: 'Estrogonofe de frango', portions: 180, status: 'planned', progress: 0, expectedAt: '11:30', tags: [], timeline: [], ingredients: [{ ref: 'fileFrango', planned: 9000, used: 0, tags: [] }, { ref: 'tomate', planned: 1500, used: 0, tags: [] }, { ref: 'cebola', planned: 500, used: 0, tags: [] }] },
        { id: 'f-batata-seg', name: 'Purê de batata',        portions: 180, status: 'planned', progress: 0, expectedAt: '11:15', tags: [], timeline: [], ingredients: [{ ref: 'batata', planned: 5000, used: 0, tags: [] }] },
        { id: 'f-suco-seg',   name: 'Suco de laranja',       portions: 200, status: 'planned', progress: 0, expectedAt: '11:30', tags: [], timeline: [], ingredients: [{ ref: 'laranja', planned: 9000, used: 0, tags: [] }] },
      ],
    },
    'ter': {
      label: 'Ter · 04 mai', portions: 200,
      items: [
        { id: 'f-arroz-ter',  name: 'Arroz integral',  portions: 200, status: 'planned', progress: 0, expectedAt: '11:00', tags: [], timeline: [], ingredients: [{ ref: 'arrozBranco', planned: 6000, used: 0, tags: [] }] },
        { id: 'f-feijao-ter', name: 'Feijão preto',    portions: 200, status: 'planned', progress: 0, expectedAt: '11:00', tags: [], timeline: [], ingredients: [{ ref: 'feijaoCarioca', planned: 4000, used: 0, tags: [] }] },
        { id: 'f-frango-ter', name: 'Frango xadrez',   portions: 180, status: 'planned', progress: 0, expectedAt: '11:30', tags: [], timeline: [], ingredients: [{ ref: 'fileFrango', planned: 9000, used: 0, tags: [] }, { ref: 'cebola', planned: 400, used: 0, tags: [] }] },
        { id: 'f-suco-ter',   name: 'Suco de laranja', portions: 200, status: 'planned', progress: 0, expectedAt: '11:30', tags: [], timeline: [], ingredients: [{ ref: 'laranja', planned: 9000, used: 0, tags: [] }] },
      ],
    },
    'qua-prox': {
      label: 'Qua · 05 mai', portions: 200,
      items: [
        { id: 'f-arroz-quap',  name: 'Arroz branco',       portions: 200, status: 'planned', progress: 0, expectedAt: '11:00', tags: [], timeline: [], ingredients: [{ ref: 'arrozBranco', planned: 6000, used: 0, tags: [] }] },
        { id: 'f-feijao-quap', name: 'Feijão carioca',     portions: 200, status: 'planned', progress: 0, expectedAt: '11:00', tags: [], timeline: [], ingredients: [{ ref: 'feijaoCarioca', planned: 4500, used: 0, tags: [] }] },
        { id: 'f-frango-quap', name: 'Frango assado',      portions: 180, status: 'planned', progress: 0, expectedAt: '11:30', tags: [], timeline: [], ingredients: [{ ref: 'fileFrango', planned: 9000, used: 0, tags: [] }, { ref: 'alho', planned: 90, used: 0, tags: [] }] },
        { id: 'f-legumes-quap', name: 'Legumes refogados', portions: 180, status: 'planned', progress: 0, expectedAt: '11:15', tags: [], timeline: [], ingredients: [{ ref: 'batata', planned: 3500, used: 0, tags: [] }, { ref: 'cebola', planned: 500, used: 0, tags: [] }] },
      ],
    },
  };
}

  const { Icon, StatusBar, BottomNav, BottomSheet, Tag, Card, ProgressBar,
  HomeScreen, MenuTodayScreen, ItemDetailScreen, TechnicalSheetScreen, StockScreen,
  StockMovementScreen, NotificationsScreen, MenuListScreen,
  MenuDayScreen,
  DiscardSheet } = window;

// ─────────────────────────────────────────────────────────────
// Phone frame — 390 × 844, iOS bezel-free for clarity
// ─────────────────────────────────────────────────────────────
function PhoneFrame({ children, label }) {
  return (
    <div style={{
      width: 390, height: 844, position: 'relative',
      borderRadius: 48, background: '#0A0A0A',
      padding: 10, boxShadow: '0 30px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.06)',
    }}>
      <div style={{
        position: 'absolute', top: 22, left: '50%', transform: 'translateX(-50%)',
        width: 116, height: 33, borderRadius: 22, background: '#000', zIndex: 60,
      }} />
      <div style={{
        width: '100%', height: '100%', borderRadius: 38,
        background: 'var(--color-background-primary)', overflow: 'hidden',
        position: 'relative', display: 'flex', flexDirection: 'column',
      }} className="kitchen-app">
        {children}
        {/* home indicator */}
        <div style={{
          position: 'absolute', bottom: 6, left: '50%', transform: 'translateX(-50%)',
          width: 134, height: 5, borderRadius: 100, background: 'rgba(0,0,0,0.25)',
          zIndex: 70, pointerEvents: 'none',
        }} />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// App with stack-based navigation + bottom-tab tabs + sheets
// ─────────────────────────────────────────────────────────────

function useIsDesktop() {
  const get = () => window.matchMedia && window.matchMedia('(min-width: 1024px)').matches;
  const [isDesktop, setIsDesktop] = React.useState(get());
  React.useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const onChange = () => setIsDesktop(mq.matches);
    onChange();
    if (mq.addEventListener) mq.addEventListener('change', onChange);
    else mq.addListener(onChange);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', onChange);
      else mq.removeListener(onChange);
    };
  }, []);
  return isDesktop;
}

function SideNav({ active, onChange }) {
  const items = [
    { id: 'home', label: 'Home', icon: Icon.Home },
    { id: 'menu', label: 'Cardápios', icon: Icon.Menu },
    { id: 'stock', label: 'Estoque', icon: Icon.Stock },
    { id: 'recipes', label: 'Receitas', icon: Icon.Recipe },
    { id: 'dashboard', label: 'Dashboard', icon: Icon.Dashboard },
  ];
  return (
    <aside className="desktop-sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-logo">C</div>
        <div>
          <div className="t-headline">Cozinha OS</div>
          <div className="t-caption">Operação diária</div>
        </div>
      </div>
      <nav className="sidebar-nav">
        {items.map(it => {
          const isActive = active === it.id;
          return (
            <button key={it.id} className={isActive ? 'sidebar-item active' : 'sidebar-item'} onClick={() => onChange(it.id)}>
              <it.icon />
              <span>{it.label}</span>
            </button>
          );
        })}
      </nav>
      <div className="sidebar-foot">
        <div className="t-overline">Hoje</div>
        <div className="t-subhead">Qua · 28 abr</div>
        <div className="t-footnote">200 refeições · servir 11:30</div>
      </div>
    </aside>
  );
}

function App({ initialRoute = 'home' }) {
  const TABS = ['home', 'menu', 'stock', 'recipes', 'dashboard'];
  const isDesktop = useIsDesktop();
  // Each tab has its own stack; we render the active tab.
  const [tab, setTab] = React.useState(TABS.includes(initialRoute) ? initialRoute : 'home');
  const [stacks, setStacks] = React.useState({
    home: [{ name: 'home' }],
    menu: [{ name: 'menuList' }],
    stock: [{ name: 'stock' }],
    recipes: [{ name: 'recipes' }],
    dashboard: [{ name: 'dashboard' }],
  });
  const [sheet, setSheet] = React.useState(null);
  const [transitionDir, setTransitionDir] = React.useState(null);
  const stack = stacks[tab];
  const top = stack[stack.length - 1];

  const nav = {
    push: (name, params = {}) => {
      setTransitionDir('forward');
      setStacks(s => ({ ...s, [tab]: [...s[tab], { name, params }] }));
      setTimeout(() => setTransitionDir(null), 320);
    },
    pop: () => {
      setTransitionDir('back');
      setStacks(s => ({ ...s, [tab]: s[tab].length > 1 ? s[tab].slice(0, -1) : s[tab] }));
      setTimeout(() => setTransitionDir(null), 320);
    },
    openSheet: (kind, params = {}) => setSheet({ kind, params }),
    closeSheet: () => setSheet(null),
    switchTab: (t) => setTab(t),
  };

  const SCREENS = {
    home: HomeScreen,
    menuList: MenuListScreen,
    menuToday: MenuTodayScreen,
    menuDay: MenuDayScreen,
    itemDetail: ItemDetailScreen,
    technicalSheet: TechnicalSheetScreen,
    addRecipe: AddRecipeScreen,
    stock: StockScreen,
    stockMovement: StockMovementScreen,
    notifications: NotificationsScreen,
    recipes: RecipesPlaceholder,
    dashboard: DashboardPlaceholder,
  };
  const Screen = SCREENS[top.name] || HomeScreen;

  // Active tab id for bottom nav (notifications keeps current tab highlighted)
  const tabFromRoute = (name) => {
    if (['home'].includes(name)) return 'home';
    if (['menuList', 'menuToday', 'menuDay', 'itemDetail'].includes(name)) return 'menu';
    if (['stock', 'stockMovement'].includes(name)) return 'stock';
    if (['recipes', 'addRecipe'].includes(name)) return 'recipes';
    if (['dashboard'].includes(name)) return 'dashboard';
    return tab;
  };

  return (
    <div className={isDesktop ? 'cozinha-app-shell desktop' : 'cozinha-app-shell'}>
      {isDesktop && <SideNav active={tabFromRoute(top.name)} onChange={(t) => { if (t === tab) setStacks(s => ({ ...s, [tab]: s[tab].slice(0, 1) })); else setTab(t); }} />}
      <main className="cozinha-main">
      {!isDesktop && <StatusBar />}
      <div className="cozinha-screen-area" style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        <div
          key={`${tab}-${stack.length}-${top.name}`}
          className="screen-wrap"
          style={{
            height: '100%', overflowY: 'auto', overflowX: 'hidden',
            animation: transitionDir === 'forward' ? 'slideInRight 0.32s cubic-bezier(0.2,0.7,0.2,1)' :
                       transitionDir === 'back'    ? 'slideInLeft 0.32s cubic-bezier(0.2,0.7,0.2,1)' :
                       'fadeIn 0.18s ease',
          }}
        >
          <Screen nav={nav} params={top.params || {}} />
        </div>
      </div>
      {!isDesktop && <BottomNav active={tabFromRoute(top.name)} onChange={(t) => {
        // Switching tabs uses each tab's stack; reset to root if same tab
        if (t === tab) {
          setStacks(s => ({ ...s, [tab]: s[tab].slice(0, 1) }));
        } else {
          setTab(t);
        }
      }} />}
      </main>

      {/* Sheets */}
      <DiscardSheet
        open={sheet?.kind === 'discard'}
        onClose={() => setSheet(null)}
        item={sheet?.params?.item}
        defaultIngredientRef={sheet?.params?.defaultIngredientRef}
        lockIngredient={sheet?.params?.lockIngredient}
        onConfirm={sheet?.params?.onConfirm}
      />
    </div>
  );
}

// Placeholders for not-required screens
function RecipesPlaceholder({ nav }) {
  const menuItems = [
    ...(window.MOCK.MENU_TODAY || []),
    ...Object.values(window.MOCK.FUTURE_MENUS || {}).flatMap(day => day.items || []),
  ];
  const recipes = Array.from(new Map(menuItems.map(item => [item.id, item])).values());

  const openRecipeSheet = (item) => nav.push('technicalSheet', { itemId: item.id, item });

  return (
    <div style={{ paddingBottom: 30 }}>
      <window.AppHeader employeeName="João" notifCount={3} subtitle="Receitas" onNotif={() => nav.push('notifications')} />
      <div style={{ padding: '0 20px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
        <div><div className="t-largeTitle">Receitas</div><div className="t-footnote" style={{ marginTop: 4 }}>Fichas técnicas simples para montar cardápios e prever insumos.</div></div>
        <button className="bare" onClick={() => nav.push('addRecipe')} style={{ height: 36, padding: '0 14px', borderRadius: 999, background: 'var(--color-text-primary)', color: 'var(--color-text-inverse)', fontSize: 14, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 6 }}><Icon.Plus /> Nova</button>
      </div>
      <div style={{ padding: '0 20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12 }}>
        {recipes.map((item) => {
          const ingredientNames = (item.ingredients || []).map(ig => window.MOCK.INGREDIENTS[ig.ref]?.name || ig.ref);
          const statusLabel = ({ done: 'Usada hoje', progress: 'Em preparo', blocked: 'Desfalcada', planned: 'Planejada' })[item.status] || 'Receita';
          return (
            <button key={item.id} className="bare" onClick={() => openRecipeSheet(item)} style={{ textAlign: 'left', background: 'var(--color-background-elevated)', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 16, padding: 16, cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}><div className="t-headline">{item.name}</div><Tag family={item.status === 'blocked' ? 'issue' : 'ready'} label={statusLabel} /></div>
              <div className="t-footnote" style={{ marginTop: 6 }}>{item.portions} porções · {item.ingredients?.length || 0} insumos vinculados</div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 12 }}>{ingredientNames.slice(0, 4).map(i => <Tag key={i} family="pre" label={i} />)}</div>
              <div style={{ marginTop: 14, color: 'var(--color-text-link)', fontWeight: 700 }}>Ver ficha técnica</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}


function AddRecipeScreen({ nav }) {
  const stockItems = window.MOCK.STOCK || [];
  const defaultRef = stockItems[0]?.ref || Object.keys(window.MOCK.INGREDIENTS || {})[0] || '';
  const [name, setName] = React.useState('');
  const [portions, setPortions] = React.useState(100);
  const [expectedAt, setExpectedAt] = React.useState('11:30');
  const [ingredients, setIngredients] = React.useState([{ ref: defaultRef, planned: 1000 }]);
  const [error, setError] = React.useState('');

  const updateIngredient = (index, patch) => setIngredients(rows => rows.map((row, i) => i === index ? { ...row, ...patch } : row));
  const addIngredient = () => setIngredients(rows => [...rows, { ref: defaultRef, planned: 500 }]);
  const removeIngredient = (index) => setIngredients(rows => rows.length > 1 ? rows.filter((_, i) => i !== index) : rows);
  const save = () => {
    const cleanName = name.trim();
    const validIngredients = ingredients.filter(row => row.ref && Number(row.planned) > 0);
    if (!cleanName) return setError('Informe o nome da receita.');
    if (!validIngredients.length) return setError('Adicione pelo menos um insumo com quantidade maior que zero.');
    const created = window.__addRecipe({ name: cleanName, portions, expectedAt, ingredients: validIngredients });
    if (created) nav.push('technicalSheet', { itemId: created.id, item: created });
  };

  return (
    <div style={{ paddingBottom: 30 }}>
      <div style={{ padding: '6px 20px 4px' }}><BackLink onBack={() => nav.pop()} /></div>
      <div style={{ padding: '6px 20px 16px' }}>
        <div className="t-overline" style={{ marginBottom: 4 }}>Receitas</div>
        <div className="t-largeTitle">Nova receita</div>
        <div className="t-footnote" style={{ marginTop: 6 }}>Cadastre uma ficha tecnica simples e ela ja aparecera na lista de receitas e no cardapio de hoje.</div>
      </div>
      <div style={{ padding: '0 20px', display: 'grid', gap: 14, maxWidth: 760 }}>
        <Card>
          <div className="t-headline" style={{ marginBottom: 12 }}>Dados principais</div>
          <label className="t-caption">Nome da receita</label>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Ex: Lasanha bolonhesa" style={{ width: '100%', boxSizing: 'border-box', margin: '6px 0 12px', height: 44, borderRadius: 12, border: '0.5px solid var(--color-border-tertiary)', padding: '0 12px', fontSize: 15 }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 10 }}>
            <div><label className="t-caption">Porcoes</label><input type="number" min="1" value={portions} onChange={e => setPortions(e.target.value)} style={{ width: '100%', boxSizing: 'border-box', marginTop: 6, height: 44, borderRadius: 12, border: '0.5px solid var(--color-border-tertiary)', padding: '0 12px', fontSize: 15 }} /></div>
            <div><label className="t-caption">Servir as</label><input type="time" value={expectedAt} onChange={e => setExpectedAt(e.target.value)} style={{ width: '100%', boxSizing: 'border-box', marginTop: 6, height: 44, borderRadius: 12, border: '0.5px solid var(--color-border-tertiary)', padding: '0 12px', fontSize: 15 }} /></div>
          </div>
        </Card>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <div><div className="t-headline">Insumos</div><div className="t-footnote">Quantidade base em gramas/ml/unidade conforme o insumo.</div></div>
            <button className="bare" onClick={addIngredient} style={{ height: 34, padding: '0 12px', borderRadius: 999, background: 'var(--color-background-secondary)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 6 }}><Icon.Plus /> Insumo</button>
          </div>
          <div style={{ display: 'grid', gap: 10 }}>
            {ingredients.map((row, index) => {
              const info = window.MOCK.INGREDIENTS[row.ref] || {};
              return (
                <div key={index} style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 120px 36px', gap: 8, alignItems: 'end' }}>
                  <div><label className="t-caption">Insumo</label><select value={row.ref} onChange={e => updateIngredient(index, { ref: e.target.value })} style={{ width: '100%', boxSizing: 'border-box', marginTop: 6, height: 42, borderRadius: 12, border: '0.5px solid var(--color-border-tertiary)', padding: '0 10px', fontSize: 14 }}>{stockItems.map(s => <option key={s.ref} value={s.ref}>{s.name}</option>)}</select></div>
                  <div><label className="t-caption">Qtd ({info.unit || 'g'})</label><input type="number" min="0" value={row.planned} onChange={e => updateIngredient(index, { planned: e.target.value })} style={{ width: '100%', boxSizing: 'border-box', marginTop: 6, height: 42, borderRadius: 12, border: '0.5px solid var(--color-border-tertiary)', padding: '0 10px', fontSize: 14 }} /></div>
                  <button className="bare" onClick={() => removeIngredient(index)} style={{ height: 42, borderRadius: 12, background: 'var(--color-background-secondary)', fontWeight: 800 }}>x</button>
                </div>
              );
            })}
          </div>
        </Card>
        {error && <div className="t-footnote" style={{ color: 'var(--status-blocked-fg)', fontWeight: 700 }}>{error}</div>}
        <div style={{ display: 'flex', gap: 10 }}>
          <SecondaryButton onClick={() => nav.pop()}>Cancelar</SecondaryButton>
          <PrimaryButton icon={<Icon.Plus />} onClick={save}>Salvar receita</PrimaryButton>
        </div>
      </div>
    </div>
  );
}

function DashboardPlaceholder({ nav }) {
  const menu = window.MOCK.MENU_TODAY || [];
  const events = Object.values(window.__appStore?.stockEvents || {}).flat();
  const discardTotal = events.filter(e => e.type === 'descarte').reduce((sum, e) => sum + Math.abs(Number(e.qty || 0)), 0);
  const discardCount = events.filter(e => e.type === 'descarte').length;
  const lowStock = (window.MOCK.STOCK || []).filter(s => ['low', 'out', 'expiring'].includes(s.status));
  const blocked = menu.filter(i => i.status === 'blocked').length;
  const done = menu.filter(i => i.status === 'done').length;
  const avgProgress = menu.length ? Math.round(menu.reduce((sum, i) => sum + (Number(i.progress || 0) * 100), 0) / menu.length) : 0;
  const cards = [
    { label: 'Itens concluídos', value: `${done}/${menu.length}`, sub: 'cardápio de hoje' },
    { label: 'Desperdício hoje', value: (() => { const f = window.fmtQty(discardTotal || 220, 'g'); return `${f.value}${f.unit}`; })(), sub: `${discardCount || 2} descartes registrados` },
    { label: 'Alertas críticos', value: String(blocked + lowStock.filter(s => s.status === 'out').length), sub: `${blocked} bloqueio(s) no cardápio` },
    { label: 'Estoque em atenção', value: String(lowStock.length), sub: lowStock.slice(0, 2).map(s => s.name).join(' e ') || 'sem alertas' },
  ];
  const rows = menu.slice(0, 5).map(item => [item.name, `${Math.round((item.progress || 0) * 100)}%`, ({ done: 'Concluído', progress: 'Em preparo', blocked: 'Bloqueado', planned: `Servir ${item.expectedAt || '—'}` })[item.status] || 'Planejado', item]);
  return (
    <div style={{ paddingBottom: 30 }}>
      <window.AppHeader employeeName="João" notifCount={3} subtitle="Dashboard" onNotif={() => nav.push('notifications')} />
      <div style={{ padding: '0 20px 14px' }}><div className="t-largeTitle">Dashboard</div><div className="t-footnote" style={{ marginTop: 4 }}>Resumo operacional do almoço de hoje, com indicadores do cardápio e estoque.</div></div>
      <div style={{ padding: '0 20px 18px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
        {cards.map(c => <div key={c.label} style={{ background: 'var(--color-background-elevated)', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 16, padding: 16 }}><div className="t-caption">{c.label}</div><div className="t-largeTitle" style={{ marginTop: 4 }}>{c.value}</div><div className="t-footnote">{c.sub}</div></div>)}
      </div>
      <div style={{ padding: '0 20px 18px' }}>
        <div style={{ background: 'var(--color-background-elevated)', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 16, padding: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}><div className="t-headline">Progresso do serviço</div><div className="t-mono">{avgProgress}%</div></div>
          <ProgressBar value={avgProgress} max={100} color="var(--status-progress-dot)" height={8} />
          <div className="t-footnote" style={{ marginTop: 8 }}>Baseado no avanço médio dos itens planejados.</div>
        </div>
      </div>
      <div style={{ padding: '0 20px 18px' }}><div className="t-headline" style={{ marginBottom: 10 }}>Itens do cardápio</div><div style={{ background: 'var(--color-background-elevated)', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 16, overflow: 'hidden' }}>
        {rows.map((r,i) => <button className="bare" key={r[0]} onClick={() => nav.push('itemDetail', { itemId: r[3].id })} style={{ width: '100%', padding: 14, display: 'grid', gridTemplateColumns: '1fr 70px 130px', gap: 10, borderBottom: i < rows.length-1 ? '0.5px solid var(--color-divider)' : 0, textAlign: 'left' }}><div className="t-subhead">{r[0]}</div><div className="t-mono">{r[1]}</div><div className="t-footnote">{r[2]}</div></button>)}
      </div></div>
      <div style={{ padding: '0 20px' }}><div className="t-headline" style={{ marginBottom: 10 }}>Estoque em atenção</div><div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 10 }}>
        {lowStock.slice(0, 4).map(s => <button key={s.ref} className="bare" onClick={() => nav.push('stockMovement', { ingredient: s })} style={{ textAlign: 'left', background: 'var(--color-background-elevated)', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 14, padding: 14 }}><div className="t-subhead">{s.name}</div><div className="t-footnote">{(() => { const f = window.fmtQty(s.qty, s.unit); return `${f.value}${f.unit}`; })()} · {s.location}</div></button>)}
      </div></div>
    </div>
  );
}
// inject animation styles
if (!document.getElementById('cozinha-anim')) {
  const s = document.createElement('style');
  s.id = 'cozinha-anim';
  s.textContent = `
    @keyframes slideInRight { from { transform: translateX(28px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
    @keyframes slideInLeft { from { transform: translateX(-28px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    .cozinha-app-shell { min-height: 100%; height: 100%; display: flex; flex-direction: column; background: var(--color-background-primary); color: var(--color-text-primary); }
    .cozinha-main { flex: 1; min-width: 0; display: flex; flex-direction: column; height: 100%; }
    .cozinha-screen-area { min-height: 0; }
    .desktop-sidebar { width: 268px; flex: 0 0 268px; min-height: 100vh; padding: 24px 18px; background: rgba(255,255,255,0.72); border-right: 1px solid var(--color-border-tertiary); display: flex; flex-direction: column; gap: 22px; position: sticky; top: 0; }
    .sidebar-brand { display: flex; align-items: center; gap: 12px; padding: 8px 8px 16px; }
    .sidebar-logo { width: 42px; height: 42px; border-radius: 999px; background: var(--color-text-primary); color: var(--color-text-inverse); display: grid; place-items: center; font-weight: 800; }
    .sidebar-nav { display: grid; gap: 8px; }
    .sidebar-item { border: 0; background: transparent; color: var(--color-text-secondary); border-radius: 16px; padding: 14px 14px; display: flex; align-items: center; gap: 12px; font: 600 15px/1 var(--font-sans); text-align: left; }
    .sidebar-item.active { background: var(--color-text-primary); color: var(--color-text-inverse); }
    .sidebar-foot { margin-top: auto; padding: 16px; border-radius: 18px; background: var(--color-background-secondary); }
    @media (min-width: 1024px) {
      .cozinha-app-shell.desktop { min-height: 100vh; height: 100vh; flex-direction: row; }
      .cozinha-main { padding: 0; background: var(--color-background-primary); }
      .cozinha-screen-area { border-radius: 0; background: transparent; box-shadow: none; border: 0; }
      .screen-wrap > div { max-width: 1120px; margin: 0 auto; padding-top: 24px; }
    }
    @media (min-width: 700px) and (max-width: 1023px) {
      .cozinha-app-shell { min-height: 100vh; height: 100vh; }
      .cozinha-main { max-width: 820px; width: 100%; margin: 0 auto; }
      .screen-wrap > div { max-width: 760px; margin: 0 auto; }
    }
  `;
  document.head.appendChild(s);
}

window.App = App;
window.PhoneFrame = PhoneFrame;

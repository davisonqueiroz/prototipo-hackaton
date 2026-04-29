// Cardápio realista para 200 refeições/dia

const TODAY = "Qua · 28 abr";

const TAGS_LIBRARY = {
  prep:  ["descongelando", "marinando", "tempero pronto"],
  pre:   ["cortado", "porcionado", "higienizado"],
  ready: ["pronto", "reservado", "no balcão"],
  issue: ["vencido", "insuficiente", "sem lote"],
};

const INGREDIENTS = {
  arrozBranco:   { name: "Arroz branco tipo 1",  qty: 8000,  unit: "g",  lot: "L240412", expires: "12/05", location: "Despensa B - prat 1" },
  feijaoCarioca: { name: "Feijão carioca",        qty: 5500,  unit: "g",  lot: "L240328", expires: "30/06", location: "Despensa B - prat 2" },
  patinho:       { name: "Patinho moído",          qty: 12000, unit: "g",  lot: "L240425", expires: "29/04", location: "Câmara fria 1 - prat 3" },
  fileFrango:    { name: "Filé de frango",         qty: 9500,  unit: "g",  lot: "L240426", expires: "30/04", location: "Câmara fria 1 - prat 1" },
  cebola:        { name: "Cebola amarela",         qty: 3200,  unit: "g",  lot: "L240424", expires: "08/05", location: "Despensa A - cx 4" },
  alho:          { name: "Alho descascado",        qty: 800,   unit: "g",  lot: "L240423", expires: "02/05", location: "Câmara fria 2" },
  oleo:          { name: "Óleo de soja",           qty: 4500,  unit: "ml", lot: "L240301", expires: "01/12", location: "Despensa A - prat 2" },
  tomate:        { name: "Tomate italiano",        qty: 2100,  unit: "g",  lot: "L240427", expires: "01/05", location: "Câmara fria 2" },
  alface:        { name: "Alface crespa",          qty: 0,     unit: "un", lot: "—",       expires: "—",     location: "Câmara fria 2",      status: "out" },
  batata:        { name: "Batata inglesa",         qty: 6800,  unit: "g",  lot: "L240422", expires: "06/05", location: "Despensa A - cx 1" },
  brocolis:      { name: "Brócolis ninja",         qty: 1400,  unit: "g",  lot: "L240427", expires: "30/04", location: "Câmara fria 2",      status: "low" },
  laranja:       { name: "Laranja pera",           qty: 9500,  unit: "g",  lot: "L240425", expires: "04/05", location: "Despensa A - cx 3" },
};

// Today's menu
const MENU_TODAY = [
  {
    id: "arroz", name: "Arroz branco", portions: 200, status: "done", progress: 1,
    startedAt: "06:10", finishedAt: "07:42",
    ingredients: [
      { ref: "arrozBranco", planned: 6000, used: 6000, tags: [{ family: "ready", label: "pronto" }] },
      { ref: "alho", planned: 60, used: 60, tags: [] },
      { ref: "oleo", planned: 200, used: 200, tags: [] },
    ],
    tags: [{ family: "ready", label: "no balcão" }],
    timeline: [
      { time: "06:10", event: "Iniciado por João" },
      { time: "06:14", event: "Insumos retirados do estoque" },
      { time: "07:42", event: "Concluído — 200 porções" },
    ],
  },
  {
    id: "feijao", name: "Feijão carioca", portions: 200, status: "done", progress: 1,
    startedAt: "05:40", finishedAt: "08:05",
    ingredients: [
      { ref: "feijaoCarioca", planned: 4500, used: 4500, tags: [{ family: "ready", label: "pronto" }] },
      { ref: "cebola", planned: 300, used: 320, tags: [{ family: "pre", label: "cortado" }] },
      { ref: "alho", planned: 50, used: 50, tags: [] },
    ],
    tags: [{ family: "ready", label: "no balcão" }],
    timeline: [
      { time: "05:40", event: "Iniciado por Marina" },
      { time: "08:05", event: "Concluído — 200 porções" },
    ],
  },
  {
    id: "salada", name: "Salada de alface e tomate", portions: 200, status: "done", progress: 1,
    ingredients: [
      { ref: "tomate", planned: 1500, used: 1480, tags: [{ family: "pre", label: "cortado" }] },
    ],
    tags: [], timeline: [],
  },
  {
    id: "estrogonofe", name: "Estrogonofe de carne", portions: 200, status: "progress", progress: 0.55,
    startedAt: "07:30", expectedAt: "10:00",
    ingredients: [
      { ref: "patinho",  planned: 10000, used: 4200, tags: [{ family: "prep", label: "marinando" }] },
      { ref: "cebola",   planned: 800,   used: 800,  tags: [{ family: "pre",  label: "cortado" }] },
      { ref: "tomate",   planned: 600,   used: 0,    tags: [] },
      { ref: "oleo",     planned: 250,   used: 120,  tags: [] },
    ],
    tags: [{ family: "prep", label: "em refogamento" }],
    timeline: [
      { time: "07:30", event: "Iniciado por João" },
      { time: "07:42", event: "Carne adicionada ao refogado" },
      { time: "08:15", event: "Tags atualizadas" },
    ],
  },
  {
    id: "frangoGrelhado", name: "Filé de frango grelhado", portions: 200, status: "planned", progress: 0,
    expectedAt: "10:30",
    ingredients: [
      { ref: "fileFrango", planned: 9000, used: 0, tags: [{ family: "prep", label: "marinando" }] },
      { ref: "alho",       planned: 80,   used: 0, tags: [] },
    ],
    tags: [], timeline: [], alert: "Iniciar até 09:00",
  },
  {
    id: "pure", name: "Purê de batata", portions: 200, status: "planned", progress: 0,
    expectedAt: "11:00",
    ingredients: [{ ref: "batata", planned: 6500, used: 0, tags: [] }],
    tags: [], timeline: [],
  },
  {
    id: "brocolis", name: "Brócolis no vapor", portions: 200, status: "blocked", progress: 0,
    blockedReason: "Sem estoque suficiente · 1.4kg de 4kg",
    ingredients: [{ ref: "brocolis", planned: 4000, used: 0, tags: [{ family: "issue", label: "insuficiente" }] }],
    tags: [{ family: "issue", label: "insuficiente" }], timeline: [], alert: "Insumo insuficiente",
  },
  {
    id: "laranja", name: "Sobremesa: laranja", portions: 200, status: "planned", progress: 0,
    expectedAt: "11:30",
    ingredients: [{ ref: "laranja", planned: 9000, used: 0, tags: [] }],
    tags: [], timeline: [],
  },
];

// Upcoming days (Home widget)
const UPCOMING_MENUS = [
  { day: "Qui", date: "29 abr", items: ["Arroz", "Feijão preto", "Lasanha", "Salada"], count: 7 },
  { day: "Sex", date: "30 abr", items: ["Arroz", "Feijão", "Peixe assado"], count: 8 },
  { day: "Seg", date: "03 mai", items: ["Arroz", "Feijão", "Almôndegas"], count: 8 },
  { day: "Ter", date: "04 mai", items: ["Arroz integral", "Feijão preto", "Frango xadrez"], count: 7 },
];

// Stock
const STOCK = [
  { ref: "patinho",       ...INGREDIENTS.patinho,       status: "expiring" },
  { ref: "fileFrango",    ...INGREDIENTS.fileFrango,    status: "expiring" },
  { ref: "brocolis",      ...INGREDIENTS.brocolis,      status: "low"      },
  { ref: "tomate",        ...INGREDIENTS.tomate,        status: "expiring" },
  { ref: "alface",        ...INGREDIENTS.alface,        status: "out"      },
  { ref: "alho",          ...INGREDIENTS.alho,          status: "normal"   },
  { ref: "cebola",        ...INGREDIENTS.cebola,        status: "normal"   },
  { ref: "arrozBranco",   ...INGREDIENTS.arrozBranco,   status: "normal"   },
  { ref: "feijaoCarioca", ...INGREDIENTS.feijaoCarioca, status: "normal"   },
  { ref: "batata",        ...INGREDIENTS.batata,        status: "normal"   },
  { ref: "oleo",          ...INGREDIENTS.oleo,          status: "normal"   },
  { ref: "laranja",       ...INGREDIENTS.laranja,       status: "normal"   },
];

// Critical alerts (Home)
const CRITICAL_ALERTS = [
  { id: 1, type: "blocked", item: "Brócolis no vapor",  reason: "Sem estoque suficiente" },
  { id: 2, type: "alert",   item: "Filé de frango",     reason: "Iniciar até 09:00 (em 18 min)" },
];

// Notifications
const NOTIFICATIONS = [
  { group: "Estoque", items: [
    { time: "07:55", text: "Tomate vence amanhã (2.1kg)" },
    { time: "07:30", text: "Alface esgotou no estoque" },
    { time: "06:12", text: "Brócolis abaixo do mínimo" },
  ]},
  { group: "Operações", items: [
    { time: "07:42", text: "Arroz branco concluído por João" },
    { time: "06:10", text: "Marina iniciou Feijão carioca" },
  ]},
  { group: "Sistema", items: [
    { time: "05:00", text: "Cardápio do dia carregado" },
  ]},
];

// Future day menus (Qui / Sex / Seg)
const FUTURE_MENUS = {
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
      { id: 'f-arroz-sex',   name: 'Arroz branco',    portions: 200, status: 'planned', progress: 0, expectedAt: '11:00', tags: [], timeline: [], ingredients: [{ ref: 'arrozBranco', planned: 6000, used: 0, tags: [] }] },
      { id: 'f-feijao-sex',  name: 'Feijão preto',    portions: 200, status: 'planned', progress: 0, expectedAt: '11:00', tags: [], timeline: [], ingredients: [{ ref: 'feijaoCarioca', planned: 4000, used: 0, tags: [] }] },
      { id: 'f-bife-sex',    name: 'Bife acebolado',  portions: 160, status: 'planned', progress: 0, expectedAt: '11:30', tags: [], timeline: [], ingredients: [{ ref: 'patinho', planned: 8000, used: 0, tags: [] }, { ref: 'cebola', planned: 600, used: 0, tags: [] }] },
      { id: 'f-brocolis-sex',name: 'Brócolis no vapor',portions: 180, status: 'planned', progress: 0, expectedAt: '11:15', tags: [], timeline: [], ingredients: [{ ref: 'brocolis', planned: 3500, used: 0, tags: [] }] },
      { id: 'f-suco-sex',    name: 'Suco de laranja', portions: 200, status: 'planned', progress: 0, expectedAt: '11:30', tags: [], timeline: [], ingredients: [{ ref: 'laranja', planned: 9000, used: 0, tags: [] }] },
    ],
  },
  'seg': {
    label: 'Seg · 03 mai', portions: 200,
    items: [
      { id: 'f-arroz-seg',  name: 'Arroz branco',           portions: 200, status: 'planned', progress: 0, expectedAt: '11:00', tags: [], timeline: [], ingredients: [{ ref: 'arrozBranco', planned: 6000, used: 0, tags: [] }] },
      { id: 'f-feijao-seg', name: 'Feijão carioca',         portions: 200, status: 'planned', progress: 0, expectedAt: '11:00', tags: [], timeline: [], ingredients: [{ ref: 'feijaoCarioca', planned: 4500, used: 0, tags: [] }] },
      { id: 'f-estrog-seg', name: 'Estrogonofe de frango',  portions: 180, status: 'planned', progress: 0, expectedAt: '11:30', tags: [], timeline: [], ingredients: [{ ref: 'fileFrango', planned: 9000, used: 0, tags: [] }, { ref: 'tomate', planned: 1500, used: 0, tags: [] }, { ref: 'cebola', planned: 500, used: 0, tags: [] }] },
      { id: 'f-batata-seg', name: 'Purê de batata',         portions: 180, status: 'planned', progress: 0, expectedAt: '11:15', tags: [], timeline: [], ingredients: [{ ref: 'batata', planned: 5000, used: 0, tags: [] }] },
      { id: 'f-suco-seg',   name: 'Suco de laranja',        portions: 200, status: 'planned', progress: 0, expectedAt: '11:30', tags: [], timeline: [], ingredients: [{ ref: 'laranja', planned: 9000, used: 0, tags: [] }] },
    ],
  },
  'ter': {
    label: 'Ter · 04 mai', portions: 200,
    items: [
      { id: 'f-arroz-ter',  name: 'Arroz integral',       portions: 200, status: 'planned', progress: 0, expectedAt: '11:00', tags: [], timeline: [], ingredients: [{ ref: 'arrozBranco', planned: 6000, used: 0, tags: [] }] },
      { id: 'f-feijao-ter', name: 'Feijão preto',         portions: 200, status: 'planned', progress: 0, expectedAt: '11:00', tags: [], timeline: [], ingredients: [{ ref: 'feijaoCarioca', planned: 4000, used: 0, tags: [] }] },
      { id: 'f-frango-ter', name: 'Frango xadrez',        portions: 180, status: 'planned', progress: 0, expectedAt: '11:30', tags: [], timeline: [], ingredients: [{ ref: 'fileFrango', planned: 9000, used: 0, tags: [] }, { ref: 'cebola', planned: 400, used: 0, tags: [] }, { ref: 'oleo', planned: 200, used: 0, tags: [] }] },
      { id: 'f-suco-ter',   name: 'Suco de laranja',      portions: 200, status: 'planned', progress: 0, expectedAt: '11:30', tags: [], timeline: [], ingredients: [{ ref: 'laranja', planned: 9000, used: 0, tags: [] }] },
    ],
  },
};

// ─── Global app store — persists state across React navigation ───────────────
window.__appStore = {
  menuItems: {}, // itemId → latest item state (survives push/pop)
};

window.__updateMenuItem = function(item) {
  window.__appStore.menuItems[item.id] = item;
  window.dispatchEvent(new CustomEvent('cozinhaUpdate', { detail: { type: 'menuItem', id: item.id } }));
};

window.__updateStock = function(ingredientRef, delta) {
  if (window.MOCK && window.MOCK.INGREDIENTS[ingredientRef]) {
    window.MOCK.INGREDIENTS[ingredientRef].qty = Math.max(0, window.MOCK.INGREDIENTS[ingredientRef].qty - delta);
  }
  if (window.MOCK) {
    const se = window.MOCK.STOCK.find(x => x.ref === ingredientRef);
    if (se) {
      se.qty = Math.max(0, se.qty - delta);
      if (se.qty === 0) se.status = 'out';
      else if (se.qty < 1500 && (se.status === 'normal' || se.status === 'expiring')) se.status = 'low';
    }
  }
  window.dispatchEvent(new CustomEvent('cozinhaUpdate', { detail: { type: 'stock', ref: ingredientRef } }));
};
// ─────────────────────────────────────────────────────────────────────────────

window.MOCK = {
  TODAY, TAGS_LIBRARY, INGREDIENTS, MENU_TODAY,
  UPCOMING_MENUS, STOCK, CRITICAL_ALERTS, NOTIFICATIONS,
  FUTURE_MENUS,
};

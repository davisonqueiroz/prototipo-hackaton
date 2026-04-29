import React from 'react';

// screens.jsx — All screens for Cozinha OS
// Each screen is a function component receiving { nav, state, setState }

const { Icon, StatusBar, AppHeader, BackLink, BottomNav,
  StatusBadge, Tag, TAG_FAM, ProgressBar, BottomSheet, Card,
  SwipeableRow, QtyEditor, FloatingCTA, PrimaryButton, SecondaryButton } = window;

// ─────────────────────────────────────────────────────────────
// HOME
// ─────────────────────────────────────────────────────────────
function HomeScreen({ nav }) {
  const { CRITICAL_ALERTS, MENU_TODAY, UPCOMING_MENUS, TODAY } = window.MOCK;
  const total = MENU_TODAY.length;
  const done = MENU_TODAY.filter(m => m.status === 'done').length;
  const inProg = MENU_TODAY.filter(m => m.status === 'progress').length;
  const visibleItems = MENU_TODAY.slice(0, 3);

  return (
    <div style={{ paddingBottom: 20 }}>
      <AppHeader employeeName="João" notifCount={3}
        subtitle={TODAY}
        onNotif={() => nav.push('notifications')} />

      {/* Critical alerts — compact list */}
      {CRITICAL_ALERTS.length > 0 && (
        <div style={{ padding: '0 20px 18px' }}>
          <div className="t-overline" style={{ marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: 999, background: 'var(--status-alert-dot)' }} />
            Alertas críticos
            <span style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 600, color: 'var(--color-text-tertiary)', letterSpacing: 0.4 }}>
              {CRITICAL_ALERTS.length}
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {CRITICAL_ALERTS.map(a => {
              const target = MENU_TODAY.find(m => m.name === a.item);
              return (
                <button key={a.id} className="bare"
                  onClick={() => target && nav.push('itemDetail', { itemId: target.id })}
                  style={{
                    width: '100%', textAlign: 'left',
                    background: 'var(--color-background-elevated)',
                    borderRadius: 12, padding: '10px 14px',
                    display: 'flex', alignItems: 'center', gap: 10,
                    border: '0.5px solid var(--color-border-tertiary)',
                    borderLeft: `3px solid ${a.type === 'blocked' ? 'var(--status-blocked-dot)' : 'var(--status-alert-dot)'}`,
                  }}>
                  <div style={{ color: a.type === 'blocked' ? 'var(--status-blocked-fg)' : 'var(--status-alert-fg)' }}>
                    {a.type === 'blocked' ? <Icon.Lock /> : <Icon.Alert />}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{a.item}</div>
                    <div className="t-footnote">{a.reason}</div>
                  </div>
                  <Icon.Chevron style={{ color: 'var(--color-text-tertiary)' }} />
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Cardápio de hoje — main card */}
      <div style={{ padding: '0 20px 20px' }}>
        <Card padded={false} onClick={() => nav.push('menuToday')} style={{
          padding: 0, border: '0.5px solid var(--color-border-tertiary)',
        }}>
          <div style={{
            padding: '18px 18px 14px',
            display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
          }}>
            <div>
              <div className="t-overline" style={{ marginBottom: 4 }}>Cardápio de hoje</div>
              <div className="t-title2" style={{ marginBottom: 2 }}>Almoço · {TODAY.split('·')[1].trim()}</div>
              <div className="t-footnote">Servir 200 refeições · 11:30</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="t-mono" style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.6, lineHeight: 1 }}>
                {done}<span style={{ color: 'var(--color-text-tertiary)', fontWeight: 600 }}>/{total}</span>
              </div>
              <div className="t-caption" style={{ marginTop: 2 }}>concluídos</div>
            </div>
          </div>

          <div style={{ padding: '0 18px' }}>
            <ProgressBar value={done + inProg * 0.5} max={total} color="var(--color-text-primary)" height={6} />
          </div>

          <ul style={{ padding: '14px 6px 6px' }}>
            {visibleItems.map((item, i) => {
              const s = window.STATUS_LABEL ? window.STATUS_LABEL[item.status] : null;
              const dotColor = ({ done: 'var(--status-done-dot)', progress: 'var(--status-progress-dot)', planned: 'var(--status-planned-dot)', blocked: 'var(--status-blocked-dot)' })[item.status];
              return (
                <li key={item.id} style={{
                  padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 12,
                }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 999,
                    background: 'var(--color-background-secondary)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: dotColor, flexShrink: 0,
                  }}>
                    {item.status === 'done' && <Icon.Check />}
                    {item.status === 'progress' && <Icon.Play />}
                    {item.status === 'planned' && <span style={{ width: 8, height: 8, borderRadius: 999, background: dotColor }} />}
                    {item.status === 'blocked' && <Icon.Lock />}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: -0.2 }}>{item.name}</div>
                    <div style={{ marginTop: 4, height: 3, borderRadius: 3, background: 'var(--color-border-tertiary)', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${item.progress * 100}%`, background: dotColor, borderRadius: 3 }} />
                    </div>
                  </div>
                  <StatusBadge status={item.status} size="sm" />
                </li>
              );
            })}
          </ul>
          <div style={{
            padding: '10px 18px 14px', borderTop: '0.5px solid var(--color-divider)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            fontSize: 14, color: 'var(--color-text-secondary)',
          }}>
            <span>Ver todos os {total} itens</span>
            <Icon.Chevron style={{ color: 'var(--color-text-tertiary)' }} />
          </div>
        </Card>
      </div>

      {/* Próximos cardápios */}
      <div>
        <div className="t-overline" style={{ padding: '0 20px 8px' }}>Próximos cardápios</div>
        <div style={{
          display: 'flex', gap: 10, padding: '0 20px 4px',
          overflowX: 'auto', WebkitOverflowScrolling: 'touch',
        }}>
          {UPCOMING_MENUS.map((m, i) => (
            <button key={i} className="bare" onClick={() => nav.push('menuDay', { day: m })}
              style={{
                flex: '0 0 138px', padding: 14, borderRadius: 14,
                background: 'var(--color-background-elevated)',
                border: '0.5px solid var(--color-border-tertiary)',
                textAlign: 'left',
              }}>
              <div className="t-caption" style={{ color: 'var(--color-text-tertiary)' }}>{m.day}</div>
              <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: -0.3 }}>{m.date}</div>
              <div className="t-footnote" style={{ margin: '8px 0 6px' }}>{m.count} itens</div>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {m.items.slice(0, 3).map((it, j) => (
                  <li key={j} className="t-footnote" style={{ color: 'var(--color-text-secondary)', fontSize: 12 }}>· {it}</li>
                ))}
              </ul>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MENU TODAY (Cardápio do dia)
// ─────────────────────────────────────────────────────────────
function MenuTodayScreen({ nav }) {
  const [menu, setMenu] = React.useState(window.MOCK.MENU_TODAY);
  const startItem = (id) => setMenu(menu.map(m => m.id === id ? { ...m, status: 'progress', progress: 0.05 } : m));
  const completeItem = (id) => setMenu(menu.map(m => m.id === id ? { ...m, status: 'done', progress: 1 } : m));
  const handleDiscardForItem = (item) => ({ ingredientRef, qty, reason, obs }) => {
    const nextMenu = menu.map(m => {
      if (m.id !== item.id) return m;
      const nextItem = {
        ...m,
        ingredients: m.ingredients.map(ig => {
          if (ig.ref !== ingredientRef) return ig;
          const newUsed = Math.max(0, Number(ig.used ?? ig.planned ?? 0) - Number(qty || 0));
          return { ...ig, used: newUsed, planned: ig.planned || 0, discarded: Number(ig.discarded || 0) + Number(qty || 0) };
        }),
        timeline: [ ...(m.timeline || []), { time: new Date().toTimeString().slice(0, 5), event: `Descarte registrado · ${window.MOCK.INGREDIENTS[ingredientRef]?.name || ingredientRef}` } ],
      };
      window.__updateMenuItem && window.__updateMenuItem(nextItem);
      return nextItem;
    });
    setMenu(nextMenu);
    window.__updateStock && window.__updateStock(ingredientRef, qty, { type: 'descarte', by: `Cardápio · ${item.name}`, reason: [reason, obs].filter(Boolean).join(' · ') });
  };

  return (
    <div style={{ paddingBottom: 30 }}>
      <div style={{ padding: '6px 20px 4px' }}>
        <BackLink onBack={() => nav.pop()} />
      </div>
      <div style={{ padding: '6px 20px 18px' }}>
        <div className="t-overline" style={{ marginBottom: 4 }}>{window.MOCK.TODAY}</div>
        <div className="t-largeTitle">Cardápio do dia</div>
        <div className="t-footnote" style={{ marginTop: 6 }}>200 refeições · servir às 11:30</div>
      </div>
      <ul style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {menu.map((item, i) => (
          <li key={item.id}>
            <SwipeableRow
              onSwipeRight={item.status === 'planned' ? () => startItem(item.id) : undefined}
              rightLabel={item.status === 'planned' ? 'Iniciar preparo' : ''}
              rightColor="var(--status-progress-dot)"
              rightIcon={<Icon.Play />}
              actions={item.status === 'blocked' ? [] : [
                ...(item.status !== 'done' ? [{ label: 'Concluir', icon: <Icon.Check />, color: 'var(--status-done-dot)', onPress: () => completeItem(item.id) }] : []),
                { label: 'Descarte', icon: <Icon.Discard />, color: 'var(--status-alert-dot)', onPress: () => nav.openSheet('discard', { item, onConfirm: handleDiscardForItem(item) }) },
                { label: 'Ficha', icon: <Icon.Recipe />, color: 'var(--status-planned-dot)', onPress: () => nav.push('technicalSheet', { itemId: item.id, item }) },
                { label: 'Tags', icon: <Icon.Plus />, color: 'var(--color-text-secondary)', onPress: () => nav.push('itemDetail', { itemId: item.id }) },
              ]}
            >
              <MenuItemRow item={item} onClick={() => nav.push('itemDetail', { itemId: item.id })} />
            </SwipeableRow>
          </li>
        ))}
      </ul>

      <div style={{ padding: '20px 20px 0' }}>
        <div className="t-footnote" style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--color-text-tertiary)' }}>
          <Icon.Search /> Arraste para a direita para iniciar · esquerda para mais ações
        </div>
      </div>
    </div>
  );
}

function MenuItemRow({ item, onClick }) {
  const dotColor = ({ done: 'var(--status-done-dot)', progress: 'var(--status-progress-dot)', planned: 'var(--status-planned-dot)', blocked: 'var(--status-blocked-dot)' })[item.status];
  const isBlocked = item.status === 'blocked';
  return (
    <div onClick={onClick} style={{
      padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 10,
      border: '0.5px solid var(--color-border-tertiary)',
      borderRadius: 14, background: 'var(--color-background-elevated)',
      opacity: isBlocked ? 0.7 : 1, cursor: 'pointer',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 8, alignSelf: 'stretch', minHeight: 36,
          background: dotColor, borderRadius: 999,
        }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ fontSize: 16, fontWeight: 600, letterSpacing: -0.2,
              textDecoration: isBlocked ? 'none' : 'none' }}>{item.name}</div>
            {item.alert && <Icon.Alert style={{ color: 'var(--status-alert-dot)' }} />}
          </div>
          <div className="t-footnote" style={{ marginTop: 2 }}>
            {item.portions} porções
            {item.expectedAt && <> · servir {item.expectedAt}</>}
            {item.startedAt && item.status === 'progress' && <> · iniciado {item.startedAt}</>}
          </div>
        </div>
        <StatusBadge status={item.status} size="sm" />
      </div>
      <div>
        <ProgressBar value={item.progress} max={1} color={dotColor} height={4} />
      </div>
      {item.status === 'blocked' && (
        <div className="t-footnote" style={{ color: 'var(--status-blocked-fg)', display: 'flex', alignItems: 'center', gap: 6 }}>
          <Icon.Lock /> {item.blockedReason}
        </div>
      )}
      {item.tags && item.tags.length > 0 && (
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {item.tags.map((t, i) => <Tag key={i} family={t.family} label={t.label} />)}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ITEM DETAIL (Detalhe do item)
// ─────────────────────────────────────────────────────────────
function ItemDetailScreen({ nav, params }) {
  const { MENU_TODAY, INGREDIENTS } = window.MOCK;
  // Read from global store first (survives navigation), fall back to MOCK
  const storedItem = window.__appStore?.menuItems?.[params.itemId];
  const futureItem = params.item || Object.values(window.MOCK.FUTURE_MENUS || {}).flatMap(m => m.items || []).find(m => m.id === params.itemId);
  const initialItem = storedItem || MENU_TODAY.find(m => m.id === params.itemId) || futureItem || MENU_TODAY[3];
  const [item, setItemLocal] = React.useState(initialItem);
  const [tagSheetFor, setTagSheetFor] = React.useState(null);

  // Always sync local state from store when params change (navigating to different item)
  React.useEffect(() => {
    const s = window.__appStore?.menuItems?.[params.itemId];
    const futureItem = params.item || Object.values(window.MOCK.FUTURE_MENUS || {}).flatMap(m => m.items || []).find(m => m.id === params.itemId);
    const base = MENU_TODAY.find(m => m.id === params.itemId) || futureItem || MENU_TODAY[3];
    setItemLocal(s || base);
  }, [params.itemId]);

  const setItem = (next) => {
    setItemLocal(next);
    window.__updateMenuItem && window.__updateMenuItem(next);
  };

  const updateIngredient = (idx, patch) => {
    setItem({ ...item, ingredients: item.ingredients.map((ig, i) => i === idx ? { ...ig, ...patch } : ig) });
  };

  const handleDiscardConfirm = ({ ingredientRef, qty, reason, obs }) => {
    const next = {
      ...item,
      ingredients: item.ingredients.map(ig => {
        if (ig.ref !== ingredientRef) return ig;
        const newUsed = Math.max(0, Number(ig.used ?? ig.planned ?? 0) - Number(qty || 0));
        const newPlanned = ig.planned || 0;
        return { ...ig, used: newUsed, planned: newPlanned, discarded: Number(ig.discarded || 0) + Number(qty || 0) };
      }),
      timeline: [
        ...(item.timeline || []),
        { time: new Date().toTimeString().slice(0, 5),
          event: `Descarte registrado · ${window.MOCK.INGREDIENTS[ingredientRef]?.name || ingredientRef}` },
      ],
    };
    setItem(next);
    window.__updateStock && window.__updateStock(ingredientRef, qty, { type: 'descarte', by: `Cardápio · ${item.name}`, reason: [reason, obs].filter(Boolean).join(' · ') });
  };

  const replenishIngredient = (idx) => {
    const ig = item.ingredients[idx];
    const info = window.MOCK.INGREDIENTS[ig.ref];
    const missing = Math.max(0, (ig.planned || 0) - (ig.used || 0));
    const add = Math.min(missing, info?.qty || 0);
    if (!add) return;
    const next = {
      ...item,
      ingredients: item.ingredients.map((x, i) => i === idx ? { ...x, used: (x.used || 0) + add } : x),
      timeline: [
        ...(item.timeline || []),
        { time: new Date().toTimeString().slice(0, 5), event: `Reposição no item · ${info?.name || ig.ref}` },
      ],
    };
    setItem(next);
    window.__changeStock && window.__changeStock(ig.ref, -add, { type: 'consumo', by: `Reposição · ${item.name}` });
  };

  const isBlocked = item.status === 'blocked';
  const isDone = item.status === 'done';

  const openDiscard = () => nav.openSheet('discard', { item, onConfirm: handleDiscardConfirm });

  return (
    <div style={{ paddingBottom: 110 }}>
      <div style={{ padding: '6px 20px 4px' }}>
        <BackLink onBack={() => nav.pop()} />
      </div>
      <div style={{ padding: '6px 20px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <StatusBadge status={item.status} />
          {item.expectedAt && <span className="t-footnote">· servir {item.expectedAt}</span>}
        </div>
        <div className="t-largeTitle">{item.name}</div>
        <div className="t-footnote" style={{ marginTop: 4 }}>
          {item.portions} porções
          {item.startedAt && <> · iniciado {item.startedAt}</>}
        </div>
        <button className="bare" onClick={() => nav.push('technicalSheet', { itemId: item.id, item })} style={{
          marginTop: 12, height: 36, padding: '0 14px', borderRadius: 999,
          background: 'var(--color-background-secondary)', color: 'var(--color-text-link)',
          fontSize: 14, fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 6,
        }}>
          <Icon.Recipe /> Ver ficha técnica
        </button>
        {item.status === 'progress' && (
          <div style={{ marginTop: 14 }}>
            <ProgressBar value={item.progress} max={1} color="var(--status-progress-dot)" height={6} />
            <div className="t-footnote" style={{ marginTop: 6 }}>{Math.round(item.progress * 100)}% · {item.expectedAt && `previsto para ${item.expectedAt}`}</div>
          </div>
        )}
      </div>

      {/* INGREDIENTS */}
      <Section title="Ingredientes" subtitle={`${item.ingredients.length} insumos`}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {item.ingredients.map((ig, i) => (
            <IngredientCard
              key={i} ingredient={ig} info={INGREDIENTS[ig.ref]}
              onQtyChange={(v) => updateIngredient(i, { used: v })}
              onAddTag={() => setTagSheetFor(i)}
              onRemoveTag={(tagIdx) => updateIngredient(i, {
                tags: ig.tags.filter((_, idx) => idx !== tagIdx)
              })}
              onReplenish={() => replenishIngredient(i)}
            />
          ))}
        </div>
      </Section>

      {/* EXECUÇÃO */}
      <Section title="Execução">
        <div style={{
          background: 'var(--color-background-elevated)',
          border: '0.5px solid var(--color-border-tertiary)',
          borderRadius: 14, overflow: 'hidden',
        }}>
          <ExecRow label="Início planejado" value="07:00" />
          <ExecRow label="Início realizado" value={item.startedAt || '—'} highlight={!!item.startedAt} />
          <ExecRow label="Servir às" value={item.expectedAt || '11:30'} />
          <ExecRow label="Conclusão" value={item.finishedAt || (isDone ? '07:42' : '—')} highlight={isDone} last />
        </div>
      </Section>

      {/* TAGS */}
      <Section title="Tags do item">
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {item.tags.length === 0 && <span className="t-footnote">Nenhuma tag aplicada</span>}
          {item.tags.map((t, i) => (
            <Tag key={i} family={t.family} label={t.label}
              onRemove={() => setItem({ ...item, tags: item.tags.filter((_, idx) => idx !== i) })} />
          ))}
          <button className="bare" onClick={() => setTagSheetFor('item')}
            style={{
              padding: '4px 10px', borderRadius: 999,
              border: '1px dashed var(--color-border-secondary)',
              fontSize: 12, fontWeight: 600, color: 'var(--color-text-secondary)',
              display: 'inline-flex', alignItems: 'center', gap: 4,
            }}>
            <Icon.Plus /> Tag
          </button>
        </div>
      </Section>

      {/* TIMELINE */}
      <Section title="Timeline">
        {item.timeline.length === 0 ? (
          <div className="t-footnote">Sem eventos registrados</div>
        ) : (
          <ol style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {item.timeline.map((ev, i) => (
              <li key={i} style={{ display: 'flex', gap: 12, padding: '10px 0', position: 'relative' }}>
                <div style={{ width: 56, flexShrink: 0 }}>
                  <span className="t-mono" style={{ fontSize: 13, fontWeight: 600 }}>{ev.time}</span>
                </div>
                <div style={{ position: 'relative', width: 18 }}>
                  <span style={{
                    position: 'absolute', top: 6, left: 5, width: 8, height: 8,
                    borderRadius: 999, background: 'var(--color-text-primary)',
                  }} />
                  {i < item.timeline.length - 1 && (
                    <span style={{
                      position: 'absolute', top: 16, left: 8.5, bottom: -10, width: 1,
                      background: 'var(--color-border-tertiary)',
                    }} />
                  )}
                </div>
                <div className="t-callout" style={{ paddingTop: 1 }}>{ev.event}</div>
              </li>
            ))}
          </ol>
        )}
      </Section>

      {/* CTA */}
      <FloatingCTA>
        {item.status === 'planned' && (
          <PrimaryButton icon={<Icon.Play />}
            onClick={() => setItem({ ...item, status: 'progress', progress: 0.05, startedAt: '08:42' })}>
            Iniciar preparo
          </PrimaryButton>
        )}
        {item.status === 'progress' && (
          <PrimaryButton icon={<Icon.Check />} color="var(--status-done-dot)"
            onClick={() => setItem({ ...item, status: 'done', progress: 1, finishedAt: '09:30' })}>
            Concluir item
          </PrimaryButton>
        )}
        {item.status === 'blocked' && (
          <PrimaryButton color="var(--color-background-secondary)" textColor="var(--color-text-tertiary)">
            Aguardando estoque
          </PrimaryButton>
        )}
        {item.status === 'done' && (
          <SecondaryButton icon={<Icon.Edit />} onClick={openDiscard}>
            Editar registro
          </SecondaryButton>
        )}
        {!isBlocked && !isDone && (
          <button className="bare" onClick={openDiscard}
            style={{
              width: 52, height: 52, borderRadius: 14,
              background: 'var(--color-background-secondary)',
              color: 'var(--status-alert-fg)',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }} aria-label="Registrar descarte">
            <Icon.Discard />
          </button>
        )}
      </FloatingCTA>

      {/* Tag picker sheet */}
      <TagPickerSheet
        open={tagSheetFor !== null}
        onClose={() => setTagSheetFor(null)}
        onPick={(tag) => {
          if (tagSheetFor === 'item') {
            setItem({ ...item, tags: [...item.tags, tag] });
          } else {
            const idx = tagSheetFor;
            updateIngredient(idx, { tags: [...item.ingredients[idx].tags, tag] });
          }
          setTagSheetFor(null);
        }}
      />
    </div>
  );
}

function Section({ title, subtitle, children }) {
  return (
    <div style={{ padding: '0 20px 22px' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 10 }}>
        <div className="t-headline" style={{ fontSize: 15, letterSpacing: -0.2 }}>{title}</div>
        {subtitle && <div className="t-caption">{subtitle}</div>}
      </div>
      {children}
    </div>
  );
}

function ExecRow({ label, value, highlight, last }) {
  return (
    <div style={{
      padding: '12px 16px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      borderBottom: last ? 'none' : '0.5px solid var(--color-divider)',
    }}>
      <div className="t-callout" style={{ color: 'var(--color-text-secondary)' }}>{label}</div>
      <div className="t-mono" style={{
        fontSize: 15, fontWeight: 600,
        color: highlight ? 'var(--status-done-fg)' : 'var(--color-text-primary)',
      }}>{value}</div>
    </div>
  );
}

function IngredientCard({ ingredient, info, onQtyChange, onAddTag, onRemoveTag, onReplenish }) {
  if (!info) return null;
  const isExpiring = ['29/04', '30/04', '01/05'].includes(info.expires);
  return (
    <div style={{
      background: 'var(--color-background-elevated)',
      border: '0.5px solid var(--color-border-tertiary)',
      borderRadius: 14, padding: 14,
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: -0.2 }}>{info.name}</div>
          <div className="t-footnote" style={{ marginTop: 2, display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
            <span className="t-mono">Lote {info.lot}</span>
            <span style={{ color: 'var(--color-border-secondary)' }}>·</span>
            <span style={{ color: isExpiring ? 'var(--status-alert-fg)' : 'inherit' }}>
              Val {info.expires}
            </span>
          </div>
          <div className="t-footnote" style={{ marginTop: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
            <Icon.Pin style={{ color: 'var(--color-text-tertiary)' }} /> {info.location}
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div className="t-caption" style={{ marginBottom: 4 }}>UTILIZADO</div>
          <QtyEditor value={ingredient.used} unit={info.unit}
            step={info.unit === 'g' || info.unit === 'ml' ? 50 : 1}
            min={0} max={ingredient.planned}
            onChange={onQtyChange} />
          <div className="t-caption" style={{ marginTop: 6 }}>
            plan. {(() => { const f = window.fmtQty(ingredient.planned, info.unit); return `${f.value}${f.unit}`; })()}
          </div>
          <div className="t-caption" style={{ marginTop: 3, color: 'var(--color-text-tertiary)' }}>
            disp. {(() => { const f = window.fmtQty(info.qty, info.unit); return `${f.value}${f.unit}`; })()}
          </div>
        </div>
      </div>
      <div style={{ marginTop: 12, display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
        {ingredient.tags.map((t, i) => (
          <Tag key={i} family={t.family} label={t.label} onRemove={() => onRemoveTag(i)} />
        ))}
        <button className="bare" onClick={onAddTag} style={{
          padding: '4px 10px', borderRadius: 999,
          border: '1px dashed var(--color-border-secondary)',
          fontSize: 12, fontWeight: 600, color: 'var(--color-text-secondary)',
          display: 'inline-flex', alignItems: 'center', gap: 4,
        }}>
          <Icon.Plus /> Tag
        </button>
        {(ingredient.discarded || 0) > 0 && (
          <Tag family="issue" label={`descartado ${(() => { const f = window.fmtQty(ingredient.discarded, info.unit); return `${f.value}${f.unit}`; })()}`} />
        )}
        {(ingredient.used || 0) < (ingredient.planned || 0) && (
          <button className="bare" onClick={onReplenish} style={{
            padding: '4px 10px', borderRadius: 999,
            background: 'var(--status-planned-bg)', color: 'var(--status-planned-fg)',
            fontSize: 12, fontWeight: 700,
            display: 'inline-flex', alignItems: 'center', gap: 4,
          }}>
            <Icon.Plus /> Repor insumo
          </button>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// TAG PICKER (bottom sheet)
// ─────────────────────────────────────────────────────────────
function TagPickerSheet({ open, onClose, onPick }) {
  const groups = [
    { key: 'prep',  title: 'Preparo',     tags: window.MOCK.TAGS_LIBRARY.prep },
    { key: 'pre',   title: 'Pré-preparo', tags: window.MOCK.TAGS_LIBRARY.pre },
    { key: 'ready', title: 'Pronto',      tags: window.MOCK.TAGS_LIBRARY.ready },
    { key: 'issue', title: 'Problema',    tags: window.MOCK.TAGS_LIBRARY.issue },
  ];
  return (
    <BottomSheet open={open} onClose={onClose} title="Adicionar tag">
      <div style={{ padding: '8px 20px 32px' }}>
        {groups.map(g => (
          <div key={g.key} style={{ marginBottom: 18 }}>
            <div className="t-overline" style={{ marginBottom: 8 }}>{g.title}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {g.tags.map(label => (
                <button key={label} className="bare"
                  onClick={() => onPick({ family: g.key, label })}
                  style={{
                    padding: '8px 14px', borderRadius: 999,
                    background: TAG_FAM[g.key].bg, color: TAG_FAM[g.key].fg,
                    fontSize: 14, fontWeight: 600,
                  }}>
                  {label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </BottomSheet>
  );
}

// ─────────────────────────────────────────────────────────────

function DiscardQtyInput({ qty, setQty, maxQty, baseUnit, overMax }) {
  const units = baseUnit === 'g' ? ['g', 'kg'] : baseUnit === 'ml' ? ['ml', 'L'] : [baseUnit];
  const [displayUnit, setDisplayUnit] = React.useState(units.includes('kg') ? 'kg' : units[0]);
  React.useEffect(() => { setDisplayUnit(units.includes('kg') ? 'kg' : units[0]); }, [baseUnit]);
  const displayValue = fromBaseQty(qty, displayUnit, baseUnit);
  const step = displayUnit === 'kg' || displayUnit === 'L' ? 0.1 : (baseUnit === 'un' ? 1 : 50);
  const changeDisplay = (val) => setQty(Math.max(0, Math.min(maxQty, toBaseQty(val, displayUnit, baseUnit))));
  const bump = (delta) => changeDisplay(Math.max(0, Number(displayValue || 0) + delta));
  return (
    <div style={{
      background: 'var(--color-background-elevated)',
      border: overMax ? '1.5px solid var(--status-alert-fg)' : '0.5px solid var(--color-border-tertiary)',
      borderRadius: 12, padding: '14px 16px',
      display: 'flex', flexDirection: 'column', gap: 12,
    }}>
      {units.length > 1 && (
        <div style={{ display: 'flex', gap: 6 }}>
          {units.map(u => (
            <button key={u} className="bare" onClick={() => setDisplayUnit(u)} style={{
              padding: '7px 12px', borderRadius: 999,
              background: displayUnit === u ? 'var(--color-text-primary)' : 'var(--color-background-secondary)',
              color: displayUnit === u ? 'var(--color-text-inverse)' : 'var(--color-text-primary)',
              fontSize: 13, fontWeight: 700,
            }}>{u}</button>
          ))}
        </div>
      )}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <button className="bare" onClick={() => bump(-step)} style={qtyAdjustBtn}>−</button>
          <input type="number" value={displayValue} min="0" step={step}
            onChange={(e) => changeDisplay(e.target.value)}
            style={{ width: 86, textAlign: 'center', border: 0, outline: 'none', background: 'var(--color-background-secondary)', borderRadius: 8, padding: '8px 6px', fontSize: 16, fontWeight: 700 }}
            className="t-mono" />
          <span className="t-footnote" style={{ fontWeight: 700 }}>{displayUnit}</span>
          <button className="bare" onClick={() => bump(step)} style={qtyAdjustBtn}>+</button>
        </div>
        <div className="t-footnote" style={{ color: overMax ? 'var(--status-alert-fg)' : 'var(--color-text-tertiary)', textAlign: 'right' }}>
          {overMax
            ? 'Acima do disponível'
            : `restarão ${(() => { const f = window.fmtQty(Math.max(0, maxQty - qty), baseUnit); return `${f.value}${f.unit}`; })()}`}
        </div>
      </div>
    </div>
  );
}
const qtyAdjustBtn = { width: 32, height: 32, borderRadius: 8, background: 'var(--color-background-secondary)', fontSize: 18, fontWeight: 800 };

// DISCARD SHEET (Bottom sheet for descarte)
// ─────────────────────────────────────────────────────────────
function DiscardSheet({ open, onClose, item, defaultIngredientRef, onConfirm, lockIngredient }) {
  const [reason, setReason] = React.useState('vencido');
  // Available ingredients = the item's ingredients (or full library if no item)
  const candidates = lockIngredient && defaultIngredientRef
    ? [defaultIngredientRef]
    : item?.ingredients?.length
      ? item.ingredients.map(ig => ig.ref)
      : Object.keys(window.MOCK.INGREDIENTS);
  const [ingredient, setIngredient] = React.useState(defaultIngredientRef || candidates[0]);
  const [pickerOpen, setPickerOpen] = React.useState(false);
  React.useEffect(() => {
    if (open) setIngredient(defaultIngredientRef || candidates[0]);
  }, [item, defaultIngredientRef, open]);
  const ingInfo = window.MOCK.INGREDIENTS[ingredient];
  // Available qty for this ingredient: from item if context, else stock
  const itemIngredient = item?.ingredients?.find(ig => ig.ref === ingredient);
  const maxQty = itemIngredient
    ? (itemIngredient.used || itemIngredient.planned || 0)
    : (ingInfo?.qty || 0);
  const defaultQty = Math.min(
    ingInfo?.unit === 'g' || ingInfo?.unit === 'ml' ? 100 : 1,
    maxQty
  );
  const [qty, setQty] = React.useState(defaultQty);
  React.useEffect(() => { setQty(defaultQty); }, [ingredient, open]);
  const [obs, setObs] = React.useState('');
  const overMax = qty > maxQty;
  const stepBase = ingInfo?.unit === 'g' || ingInfo?.unit === 'ml' ? 50 : 1;
  const reasons = [
    { id: 'vencido', label: 'Vencido' },
    { id: 'erro', label: 'Erro' },
    { id: 'sobra', label: 'Sobra' },
    { id: 'outro', label: 'Outro' },
  ];
  return (
    <BottomSheet open={open} onClose={onClose} title="Registrar descarte">
      <div style={{ padding: '4px 20px 28px', display: 'flex', flexDirection: 'column', gap: 18 }}>
        {/* Insumo */}
        <div>
          <div className="t-overline" style={{ marginBottom: 8 }}>
            Insumo {item ? `· ${item.name}` : ''}
          </div>
          {!pickerOpen ? (
            <button className="bare" onClick={() => setPickerOpen(true)} style={{
              width: '100%', padding: '14px 16px', borderRadius: 12,
              background: 'var(--color-background-elevated)',
              border: '0.5px solid var(--color-border-tertiary)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              textAlign: 'left', gap: 12,
            }}>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 600 }}>{ingInfo?.name || 'Selecionar insumo'}</div>
                <div className="t-footnote">Lote {ingInfo?.lot} · Val {ingInfo?.expires}</div>
              </div>
              <span className="t-footnote" style={{ color: 'var(--color-text-link)', fontWeight: 600 }}>Trocar</span>
            </button>
          ) : (
            <div style={{
              background: 'var(--color-background-elevated)',
              border: '0.5px solid var(--color-border-tertiary)',
              borderRadius: 12, overflow: 'hidden',
            }}>
              {candidates.map((ref, i) => {
                const info = window.MOCK.INGREDIENTS[ref];
                if (!info) return null;
                const sel = ingredient === ref;
                return (
                  <button key={ref} className="bare"
                    onClick={() => { setIngredient(ref); setPickerOpen(false); }}
                    style={{
                      width: '100%', padding: '12px 14px',
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      borderBottom: i < candidates.length - 1 ? '0.5px solid var(--color-divider)' : 'none',
                      background: sel ? 'var(--color-background-secondary)' : 'transparent',
                      textAlign: 'left',
                    }}>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: 15, fontWeight: 600 }}>{info.name}</div>
                      <div className="t-footnote">
                        Lote {info.lot} ·{' '}
                        {(() => { const f = window.fmtQty(info.qty, info.unit); return `${f.value}${f.unit}`; })()} disponível
                      </div>
                    </div>
                    {sel && <Icon.Check style={{ color: 'var(--color-text-primary)' }} />}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Quantidade */}
        <div>
          <div className="t-overline" style={{ marginBottom: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span>Quantidade descartada</span>
            <span className="t-footnote" style={{ color: 'var(--color-text-tertiary)', textTransform: 'none', letterSpacing: 0 }}>
              máx {(() => { const f = window.fmtQty(maxQty, ingInfo?.unit || 'g'); return `${f.value}${f.unit}`; })()}
              {itemIngredient ? ' (utilizado no item)' : ' (em estoque)'}
            </span>
          </div>
          <DiscardQtyInput
            qty={qty}
            setQty={setQty}
            maxQty={maxQty}
            baseUnit={ingInfo?.unit || 'g'}
            overMax={overMax}
          />
        </div>

        {/* Motivo */}
        <div>
          <div className="t-overline" style={{ marginBottom: 8 }}>Motivo</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {reasons.map(r => (
              <button key={r.id} className="bare" onClick={() => setReason(r.id)}
                style={{
                  padding: '14px 14px', borderRadius: 12, textAlign: 'left',
                  background: reason === r.id ? 'var(--color-text-primary)' : 'var(--color-background-elevated)',
                  color: reason === r.id ? 'var(--color-text-inverse)' : 'var(--color-text-primary)',
                  border: '0.5px solid var(--color-border-tertiary)',
                  fontSize: 15, fontWeight: 600,
                }}>{r.label}</button>
            ))}
          </div>
        </div>

        {/* Observação */}
        <div>
          <div className="t-overline" style={{ marginBottom: 8 }}>Observação (opcional)</div>
          <textarea
            value={obs} onChange={e => setObs(e.target.value)}
            placeholder="Ex: caiu no chão durante o porcionamento"
            style={{
              width: '100%', minHeight: 70, padding: 14, borderRadius: 12,
              background: 'var(--color-background-elevated)',
              border: '0.5px solid var(--color-border-tertiary)',
              fontSize: 15, resize: 'none', outline: 'none',
            }}
          />
        </div>

        {/* Confirm */}
        <div style={{ display: 'flex', gap: 10 }}>
          <SecondaryButton icon={<Icon.Barcode />}>Ler código</SecondaryButton>
          <PrimaryButton color="var(--status-alert-dot)"
            disabled={qty <= 0 || overMax}
            onClick={() => {
              if (qty <= 0 || overMax) return;
              onConfirm && onConfirm({ ingredientRef: ingredient, qty, reason, obs, itemId: item?.id });
              onClose && onClose();
            }}>
            Confirmar descarte
          </PrimaryButton>
        </div>
        <div className="t-footnote" style={{ textAlign: 'center', color: 'var(--color-text-tertiary)' }}>
          O estoque só é alterado após a confirmação
        </div>
      </div>
    </BottomSheet>
  );
}
const iconBtn = {
  width: 36, height: 36, borderRadius: 10,
  background: 'var(--color-background-secondary)',
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  color: 'var(--color-text-primary)',
};

// ─────────────────────────────────────────────────────────────
// STOCK
// ─────────────────────────────────────────────────────────────
function StockScreen({ nav }) {
  const [q, setQ] = React.useState('');
  const [filter, setFilter] = React.useState('all');
  const [tick, setTick] = React.useState(0);

  React.useEffect(() => {
    const handler = () => setTick(t => t + 1);
    window.addEventListener('cozinhaUpdate', handler);
    return () => window.removeEventListener('cozinhaUpdate', handler);
  }, []);

  const items = window.MOCK.STOCK.filter(s =>
    (filter === 'all' || s.status === filter) &&
    (q === '' || s.name.toLowerCase().includes(q.toLowerCase()))
  );
  const handleStockDiscard = (s) => {
    nav.openSheet('discard', {
      defaultIngredientRef: s.ref,
      lockIngredient: true,
      onConfirm: ({ ingredientRef, qty }) => {
        window.__updateStock && window.__updateStock(ingredientRef, qty, { type: 'descarte', by: 'Baixa manual no estoque' });
      },
    });
  };
  const filters = [
    { id: 'all', label: 'Todos' },
    { id: 'low', label: 'Baixo' },
    { id: 'expiring', label: 'Validade' },
    { id: 'out', label: 'Sem estoque' },
  ];
  const [addOpen, setAddOpen] = React.useState(false);
  return (
    <div>
      <AppHeader employeeName="João" notifCount={3}
        subtitle="Estoque · 32 itens"
        onNotif={() => nav.push('notifications')} />
      <div style={{ padding: '0 20px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <div className="t-largeTitle">Estoque</div>
        <button className="bare" onClick={() => setAddOpen(true)} style={{
          height: 36, padding: '0 14px', borderRadius: 999,
          background: 'var(--color-text-primary)', color: 'var(--color-text-inverse)',
          fontSize: 14, fontWeight: 600,
          display: 'inline-flex', alignItems: 'center', gap: 6,
        }}>
          <Icon.Plus /> Adicionar
        </button>
      </div>

      {/* Search */}
      <div style={{ padding: '0 20px 12px' }}>
        <div style={{
          background: 'var(--color-background-elevated)',
          border: '0.5px solid var(--color-border-tertiary)',
          borderRadius: 12, padding: '11px 14px',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <Icon.Search style={{ color: 'var(--color-text-tertiary)' }} />
          <input
            value={q} onChange={e => setQ(e.target.value)}
            placeholder="Buscar insumo, lote ou local"
            style={{ flex: 1, border: 0, background: 'transparent', outline: 'none', fontSize: 15 }}
          />
          <button className="bare" style={{ color: 'var(--color-text-secondary)' }}>
            <Icon.Barcode />
          </button>
        </div>
      </div>

      {/* Filters */}
      <div style={{ padding: '0 20px 14px', display: 'flex', gap: 8, overflowX: 'auto' }}>
        {filters.map(f => (
          <button key={f.id} className="bare" onClick={() => setFilter(f.id)} style={{
            padding: '8px 14px', borderRadius: 999, whiteSpace: 'nowrap',
            background: filter === f.id ? 'var(--color-text-primary)' : 'var(--color-background-elevated)',
            color: filter === f.id ? 'var(--color-text-inverse)' : 'var(--color-text-secondary)',
            border: filter === f.id ? 'none' : '0.5px solid var(--color-border-tertiary)',
            fontSize: 13, fontWeight: 600,
          }}>{f.label}</button>
        ))}
      </div>

      {/* List */}
      <ul style={{ padding: '0 16px 30px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {items.map((s, i) => <StockRow key={i} s={s}
          onClick={() => nav.push('stockMovement', { ingredient: s })}
          onDiscard={handleStockDiscard} />)}
      </ul>

      <AddEntrySheet open={addOpen} onClose={() => setAddOpen(false)} onAdded={() => setTick(t => t + 1)} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Format quantity in kg/L when applicable
// ─────────────────────────────────────────────────────────────
function fmtQty(qty, unit) {
  if (unit === 'g' && qty >= 1000) return { value: (qty / 1000).toFixed(qty % 1000 === 0 ? 0 : 1).replace('.', ','), unit: 'kg' };
  if (unit === 'ml' && qty >= 1000) return { value: (qty / 1000).toFixed(qty % 1000 === 0 ? 0 : 1).replace('.', ','), unit: 'L' };
  return { value: qty, unit };
}
window.fmtQty = fmtQty;

function toBaseQty(value, displayUnit, baseUnit) {
  const n = Number(String(value).replace(',', '.')) || 0;
  if (baseUnit === 'g' && displayUnit === 'kg') return Math.round(n * 1000);
  if (baseUnit === 'ml' && displayUnit === 'L') return Math.round(n * 1000);
  return n;
}
function fromBaseQty(value, displayUnit, baseUnit) {
  const n = Number(value || 0);
  if (baseUnit === 'g' && displayUnit === 'kg') return Number((n / 1000).toFixed(3));
  if (baseUnit === 'ml' && displayUnit === 'L') return Number((n / 1000).toFixed(3));
  return n;
}
window.toBaseQty = toBaseQty;
window.fromBaseQty = fromBaseQty;

function AddEntrySheet({ open, onClose, onAdded }) {
  const UNITS = ['g', 'ml', 'un', 'kg', 'L'];
  const LOCATIONS = ['Despensa A - prat 1', 'Despensa A - prat 2', 'Despensa A - cx 1', 'Despensa A - cx 3', 'Despensa A - cx 4', 'Despensa B - prat 1', 'Despensa B - prat 2', 'Câmara fria 1 - prat 1', 'Câmara fria 1 - prat 3', 'Câmara fria 2'];
  const emptyForm = { name: '', unit: 'g', qty: '', lot: '', expires: '', location: '', locationCustom: '', obs: '' };
  const [mode, setMode] = React.useState('menu'); // 'menu' | 'manual'
  const [existingRef, setExistingRef] = React.useState(Object.keys(window.MOCK.INGREDIENTS || {})[0] || '');
  const [form, setForm] = React.useState(emptyForm);
  const [errors, setErrors] = React.useState({});
  const [success, setSuccess] = React.useState(false);

  const set = (k, v) => { setForm(f => ({ ...f, [k]: v })); setErrors(e => ({ ...e, [k]: undefined })); };

  const validate = () => {
    const e = {};
    if (mode === 'manual' && !form.name.trim()) e.name = 'Obrigatório';
    if (mode === 'existing' && !existingRef) e.name = 'Selecione um insumo';
    if (!form.qty || isNaN(Number(form.qty)) || Number(form.qty) <= 0) e.qty = 'Quantidade inválida';
    if (mode === 'manual' && !form.lot.trim()) e.lot = 'Obrigatório';
    if (mode === 'manual' && !form.expires.trim()) e.expires = 'Obrigatório';
    return e;
  };

  const confirm = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    // Convert kg→g, L→ml for internal storage
    let qty = Number(form.qty);
    let unit = form.unit;
    if (unit === 'kg') { qty *= 1000; unit = 'g'; }
    if (unit === 'L') { qty *= 1000; unit = 'ml'; }
    const finalLocation = form.location === 'Outro' ? (form.locationCustom || 'Outro local') : (form.location || 'Não especificado');
    const base = mode === 'existing' ? window.MOCK.INGREDIENTS[existingRef] : null;
    const ref = mode === 'existing' ? existingRef : 'manual_' + Date.now();
    const entry = { ref, name: mode === 'existing' ? base.name : form.name.trim(), qty, unit: mode === 'existing' ? base.unit : unit, lot: form.lot.trim() || base?.lot || 'Entrada manual', expires: form.expires.trim() || base?.expires || '—', location: finalLocation === 'Não especificado' ? (base?.location || finalLocation) : finalLocation, status: 'normal', obs: form.obs };
    window.__addStockEntry ? window.__addStockEntry(entry) : (window.MOCK.INGREDIENTS[ref] = entry, window.MOCK.STOCK.push({ ...entry }), window.dispatchEvent(new CustomEvent('cozinhaUpdate', { detail: { type: 'stock' } })));
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false); setForm(emptyForm); setMode('menu');
      onAdded && onAdded(entry);
      onClose();
    }, 1200);
  };

  const handleClose = () => { setForm(emptyForm); setMode('menu'); setErrors({}); setSuccess(false); onClose(); };

  const fieldStyle = (err) => ({
    width: '100%', padding: '13px 14px', borderRadius: 12, boxSizing: 'border-box',
    background: 'var(--color-background-elevated)',
    border: err ? '1.5px solid var(--status-alert-fg)' : '0.5px solid var(--color-border-tertiary)',
    fontSize: 15, outline: 'none', color: 'var(--color-text-primary)',
    fontFamily: 'inherit',
  });

  return (
    <BottomSheet open={open} onClose={handleClose} title={mode === 'manual' ? 'Cadastrar insumo' : mode === 'existing' ? 'Entrada no estoque' : 'Adicionar entrada'}>
      {mode === 'menu' ? (
        <div style={{ padding: '4px 20px 28px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button className="bare" style={{
            padding: '16px', borderRadius: 12, background: 'var(--color-background-elevated)',
            border: '1.5px solid var(--color-text-primary)',
            display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left',
          }} onClick={() => setMode('existing')}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--color-background-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon.Plus />
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 600 }}>Adicionar em insumo existente</div>
              <div className="t-footnote">Atualiza quantidade e histórico</div>
            </div>
          </button>
          <button className="bare" style={{
            padding: '16px', borderRadius: 12, background: 'var(--color-background-elevated)',
            border: '1.5px solid var(--color-text-primary)',
            display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left',
          }} onClick={() => setMode('manual')}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--color-background-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon.Edit />
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 600 }}>Cadastrar manualmente</div>
              <div className="t-footnote">Insumo, lote, validade e quantidade</div>
            </div>
          </button>
          {[
            { icon: <Icon.Barcode />, title: 'Ler código de barras', sub: 'Recebimento rápido com leitura' },
            { icon: <Icon.Box />, title: 'Importar nota fiscal', sub: 'Múltiplos itens de uma vez' },
          ].map((opt, i) => (
            <button key={i} className="bare" style={{
              padding: '16px', borderRadius: 12, background: 'var(--color-background-elevated)',
              border: '0.5px solid var(--color-border-tertiary)',
              display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left',
              opacity: 0.5,
            }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--color-background-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{opt.icon}</div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600 }}>{opt.title}</div>
                <div className="t-footnote">{opt.sub} · em breve</div>
              </div>
            </button>
          ))}
        </div>
      ) : success ? (
        <div style={{ padding: '40px 20px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 56, height: 56, borderRadius: 18, background: 'var(--status-done-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon.Check style={{ color: 'var(--status-done-fg)', width: 24, height: 24 }} />
          </div>
          <div className="t-headline">Entrada registrada!</div>
          <div className="t-footnote">Estoque e histórico atualizados.</div>
        </div>
      ) : (
        <div style={{ padding: '4px 20px 28px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Voltar */}
          <button className="bare" onClick={() => { setMode('menu'); setErrors({}); }}
            style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: 6, color: 'var(--color-text-link)', fontSize: 14, fontWeight: 600 }}>
            <Icon.Back style={{ width: 12, height: 12 }} /> Voltar
          </button>

          {mode === 'existing' ? (
            <div>
              <div className="t-overline" style={{ marginBottom: 6 }}>Insumo *</div>
              <select value={existingRef} onChange={e => { setExistingRef(e.target.value); setErrors(er => ({ ...er, name: undefined })); }} style={fieldStyle(errors.name)}>
                {Object.keys(window.MOCK.INGREDIENTS).map(ref => (
                  <option key={ref} value={ref}>{window.MOCK.INGREDIENTS[ref].name}</option>
                ))}
              </select>
              {errors.name && <div style={{ fontSize: 12, color: 'var(--status-alert-fg)', marginTop: 4 }}>{errors.name}</div>}
            </div>
          ) : (
            <div>
              <div className="t-overline" style={{ marginBottom: 6 }}>Nome do insumo *</div>
              <input value={form.name} onChange={e => set('name', e.target.value)}
                placeholder="Ex: Cebola amarela"
                style={fieldStyle(errors.name)} />
              {errors.name && <div style={{ fontSize: 12, color: 'var(--status-alert-fg)', marginTop: 4 }}>{errors.name}</div>}
            </div>
          )}

          {/* Quantidade + Unidade */}
          <div>
            <div className="t-overline" style={{ marginBottom: 6 }}>Quantidade *</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <input value={form.qty} onChange={e => set('qty', e.target.value)}
                type="number" min="0" placeholder="0"
                style={{ ...fieldStyle(errors.qty), flex: 2 }} />
              <div style={{ flex: 1, display: 'flex', gap: 4, background: 'var(--color-background-elevated)', borderRadius: 12, border: '0.5px solid var(--color-border-tertiary)', padding: 4 }}>
                {UNITS.map(u => (
                  <button key={u} className="bare" onClick={() => set('unit', u)}
                    style={{ flex: 1, height: '100%', borderRadius: 8, fontSize: 13, fontWeight: 600,
                      background: form.unit === u ? 'var(--color-text-primary)' : 'transparent',
                      color: form.unit === u ? 'var(--color-text-inverse)' : 'var(--color-text-secondary)',
                    }}>{u}</button>
                ))}
              </div>
            </div>
            {errors.qty && <div style={{ fontSize: 12, color: 'var(--status-alert-fg)', marginTop: 4 }}>{errors.qty}</div>}
          </div>

          {/* Lote + Validade */}
          <div style={{ display: 'flex', gap: 10 }}>
            <div style={{ flex: 1 }}>
              <div className="t-overline" style={{ marginBottom: 6 }}>Lote *</div>
              <input value={form.lot} onChange={e => set('lot', e.target.value)}
                placeholder="Ex: L240429"
                style={fieldStyle(errors.lot)} />
              {errors.lot && <div style={{ fontSize: 12, color: 'var(--status-alert-fg)', marginTop: 4 }}>{errors.lot}</div>}
            </div>
            <div style={{ flex: 1 }}>
              <div className="t-overline" style={{ marginBottom: 6 }}>Validade *</div>
              <input value={form.expires} onChange={e => set('expires', e.target.value)}
                placeholder="DD/MM"
                style={fieldStyle(errors.expires)} />
              {errors.expires && <div style={{ fontSize: 12, color: 'var(--status-alert-fg)', marginTop: 4 }}>{errors.expires}</div>}
            </div>
          </div>

          {/* Localizacao */}
          <div>
            <div className="t-overline" style={{ marginBottom: 6 }}>Localização</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {LOCATIONS.slice(0, 8).map(l => (
                <button key={l} type="button" className="bare" onClick={() => set('location', l)}
                  style={{
                    padding: '10px 10px', borderRadius: 10, textAlign: 'left', fontSize: 13, fontWeight: 600,
                    background: form.location === l ? 'var(--color-text-primary)' : 'var(--color-background-elevated)',
                    color: form.location === l ? 'var(--color-text-inverse)' : 'var(--color-text-secondary)',
                    border: '0.5px solid var(--color-border-tertiary)',
                  }}>{l}</button>
              ))}
              <button type="button" className="bare" onClick={() => set('location', 'Outro')}
                style={{
                  padding: '10px 10px', borderRadius: 10, textAlign: 'left', fontSize: 13, fontWeight: 600,
                  background: form.location === 'Outro' ? 'var(--color-text-primary)' : 'var(--color-background-elevated)',
                  color: form.location === 'Outro' ? 'var(--color-text-inverse)' : 'var(--color-text-secondary)',
                  border: '0.5px solid var(--color-border-tertiary)',
                }}>Outro local</button>
            </div>
            {form.location === 'Outro' && (
              <input value={form.locationCustom || ''} onChange={e => set('locationCustom', e.target.value)}
                placeholder="Descreva a localização"
                style={{ ...fieldStyle(false), marginTop: 8 }} />
            )}
          </div>


          {/* Observação */}
          <div>
            <div className="t-overline" style={{ marginBottom: 6 }}>Observação (opcional)</div>
            <textarea value={form.obs} onChange={e => set('obs', e.target.value)}
              placeholder="Ex: produto orgânico, fornecedor X"
              style={{ ...fieldStyle(false), minHeight: 60, resize: 'none', display: 'block' }} />
          </div>

          {/* Confirm */}
          <PrimaryButton onClick={confirm} icon={<Icon.Check />}>
            Confirmar entrada
          </PrimaryButton>
          <div className="t-footnote" style={{ textAlign: 'center', color: 'var(--color-text-tertiary)' }}>
            O insumo será adicionado ao estoque imediatamente
          </div>
        </div>
      )}
    </BottomSheet>
  );
}

function StockRow({ s, onClick, onDiscard }) {
  const STATUS_MAP = {
    normal: { label: 'OK', fg: 'var(--color-text-secondary)', bg: 'var(--color-background-secondary)', dot: 'var(--color-text-tertiary)' },
    low: { label: 'Baixo', fg: 'var(--status-progress-fg)', bg: 'var(--status-progress-bg)', dot: 'var(--status-progress-dot)' },
    expiring: { label: 'Validade próxima', fg: 'var(--status-alert-fg)', bg: 'var(--status-alert-bg)', dot: 'var(--status-alert-dot)' },
    out: { label: 'Sem estoque', fg: 'var(--status-blocked-fg)', bg: 'var(--status-blocked-bg)', dot: 'var(--status-blocked-dot)' },
  };
  const st = STATUS_MAP[s.status];
  const canDiscard = s.qty > 0;
  return (
    <li style={{
      background: 'var(--color-background-elevated)',
      border: '0.5px solid var(--color-border-tertiary)',
      borderRadius: 14, padding: 14,
    }}>
      <div onClick={onClick} style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, cursor: 'pointer' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: -0.2 }}>{s.name}</div>
          </div>
          <div className="t-footnote" style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
            <span className="t-mono">Lote {s.lot}</span>
            <span style={{ color: 'var(--color-border-secondary)' }}>·</span>
            <span>Val {s.expires}</span>
          </div>
          <div className="t-footnote" style={{ marginTop: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
            <Icon.Pin style={{ color: 'var(--color-text-tertiary)' }} /> {s.location}
          </div>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div className="t-mono" style={{ fontSize: 17, fontWeight: 700 }}>
            {(() => { const f = fmtQty(s.qty, s.unit); return (<>{f.value}<span style={{ fontSize: 12, color: 'var(--color-text-tertiary)', fontWeight: 500 }}> {f.unit}</span></>); })()}
          </div>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            padding: '3px 8px', borderRadius: 999,
            background: st.bg, color: st.fg,
            fontSize: 11, fontWeight: 600, marginTop: 4,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: 999, background: st.dot }} />
            {st.label}
          </span>
        </div>
      </div>
      {/* Quick actions row */}
      <div style={{
        marginTop: 12, paddingTop: 10,
        borderTop: '0.5px solid var(--color-divider)',
        display: 'flex', gap: 8,
      }}>
        <button className="bare" onClick={(e) => { e.stopPropagation(); onClick && onClick(); }}
          style={stockActionBtn('default')}>
          <Icon.History /> Movimentações
        </button>
        <button className="bare"
          disabled={!canDiscard}
          onClick={(e) => { e.stopPropagation(); if (canDiscard) onDiscard && onDiscard(s); }}
          style={stockActionBtn('discard', !canDiscard)}>
          <Icon.Discard /> Dar baixa
        </button>
      </div>
    </li>
  );
}

const stockActionBtn = (variant, disabled = false) => ({
  flex: 1,
  height: 36, padding: '0 10px', borderRadius: 10,
  background: variant === 'discard'
    ? 'var(--status-alert-bg)'
    : 'var(--color-background-secondary)',
  color: variant === 'discard'
    ? 'var(--status-alert-fg)'
    : 'var(--color-text-primary)',
  fontSize: 13, fontWeight: 600,
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
  opacity: disabled ? 0.4 : 1,
  cursor: disabled ? 'not-allowed' : 'pointer',
});

// ─────────────────────────────────────────────────────────────
// STOCK MOVEMENT (histórico do insumo)
// ─────────────────────────────────────────────────────────────
function StockMovementScreen({ nav, params }) {
  const ing = params.ingredient;
  const baseEvents = [
    { time: 'Hoje · 08:15', type: 'consumo', qty: -800, by: 'João · Estrogonofe' },
    { time: 'Hoje · 06:14', type: 'consumo', qty: -300, by: 'Marina · Feijão' },
    { time: 'Ontem · 17:22', type: 'descarte', qty: -120, by: 'Pedro · sobra' },
    { time: 'Ontem · 10:00', type: 'entrada', qty: +5000, by: 'Recebimento' },
    { time: '26/04 · 09:30', type: 'consumo', qty: -1200, by: 'João · Refogado' },
  ];
  const events = [...(window.__appStore?.stockEvents?.[ing.ref] || []).map(e => ({ ...e, time: `Hoje · ${e.time}` })), ...baseEvents];
  const colorFor = (t) => ({ entrada: 'var(--status-done-fg)', consumo: 'var(--color-text-primary)', descarte: 'var(--status-alert-fg)' })[t];
  return (
    <div style={{ paddingBottom: 30 }}>
      <div style={{ padding: '6px 20px 4px' }}>
        <BackLink onBack={() => nav.pop()} />
      </div>
      <div style={{ padding: '6px 20px 18px' }}>
        <div className="t-overline" style={{ marginBottom: 4 }}>Estoque · movimentação</div>
        <div className="t-largeTitle">{ing.name}</div>
        <div className="t-footnote" style={{ marginTop: 4 }}>Lote {ing.lot} · Val {ing.expires}</div>
      </div>

      {/* Resumo */}
      <div style={{ padding: '0 20px 18px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <Card>
          <div className="t-caption">Disponível</div>
          <div className="t-mono" style={{ fontSize: 26, fontWeight: 700, marginTop: 2 }}>
            {(() => { const f = fmtQty(ing.qty, ing.unit); return (<>{f.value}<span style={{ fontSize: 14, color: 'var(--color-text-tertiary)', fontWeight: 500 }}> {f.unit}</span></>); })()}
          </div>
        </Card>
        <Card>
          <div className="t-caption">Consumido hoje</div>
          <div className="t-mono" style={{ fontSize: 26, fontWeight: 700, marginTop: 2 }}>
            {(() => { const f = fmtQty(1100, ing.unit); return (<>{f.value}<span style={{ fontSize: 14, color: 'var(--color-text-tertiary)', fontWeight: 500 }}> {f.unit}</span></>); })()}
          </div>
        </Card>
      </div>

      <div style={{ padding: '0 20px 8px' }}>
        <div className="t-headline" style={{ fontSize: 15 }}>Histórico</div>
      </div>
      <div style={{ padding: '0 20px 16px' }}>
        <div style={{
          background: 'var(--color-background-elevated)',
          border: '0.5px solid var(--color-border-tertiary)',
          borderRadius: 14, overflow: 'hidden',
        }}>
          {events.map((ev, i) => (
            <div key={i} style={{
              padding: '12px 14px',
              borderBottom: i < events.length - 1 ? '0.5px solid var(--color-divider)' : 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10,
            }}>
              <div style={{ minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{
                    fontSize: 11, fontWeight: 700, letterSpacing: 0.4, textTransform: 'uppercase',
                    color: colorFor(ev.type),
                  }}>{ev.type}</span>
                </div>
                <div className="t-footnote" style={{ marginTop: 2 }}>{ev.by}</div>
                <div className="t-caption" style={{ marginTop: 2 }}>{ev.time}</div>
              </div>
              <div className="t-mono" style={{ fontSize: 17, fontWeight: 700, color: colorFor(ev.type) }}>
                {(() => { const f = fmtQty(Math.abs(ev.qty), ing.unit); return (<>{ev.qty > 0 ? '+' : '−'}{f.value}<span style={{ fontSize: 12, color: 'var(--color-text-tertiary)', fontWeight: 500 }}> {f.unit}</span></>); })()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// NOTIFICATIONS
// ─────────────────────────────────────────────────────────────
function NotificationsScreen({ nav }) {
  return (
    <div style={{ paddingBottom: 30 }}>
      <div style={{ padding: '6px 20px 4px' }}>
        <BackLink onBack={() => nav.pop()} />
      </div>
      <div style={{ padding: '6px 20px 16px' }}>
        <div className="t-largeTitle">Notificações</div>
        <div className="t-footnote" style={{ marginTop: 4 }}>Atualizado agora · 6 não lidas</div>
      </div>
      {window.MOCK.NOTIFICATIONS.map((g, i) => (
        <div key={i} style={{ padding: '0 20px 18px' }}>
          <div className="t-overline" style={{ marginBottom: 8 }}>{g.group}</div>
          <div style={{
            background: 'var(--color-background-elevated)',
            border: '0.5px solid var(--color-border-tertiary)',
            borderRadius: 14, overflow: 'hidden',
          }}>
            {g.items.map((n, j) => (
              <div key={j} style={{
                padding: '12px 14px', display: 'flex', gap: 12, alignItems: 'flex-start',
                borderBottom: j < g.items.length - 1 ? '0.5px solid var(--color-divider)' : 'none',
              }}>
                <div style={{
                  width: 8, height: 8, borderRadius: 999,
                  background: g.group === 'Estoque' ? 'var(--status-alert-dot)' :
                              g.group === 'Operações' ? 'var(--status-done-dot)' : 'var(--color-text-tertiary)',
                  marginTop: 7, flexShrink: 0,
                }} />
                <div style={{ flex: 1 }}>
                  <div className="t-callout">{n.text}</div>
                  <div className="t-caption" style={{ marginTop: 2 }}>{n.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// CARDÁPIOS (visão semanal)
// ─────────────────────────────────────────────────────────────
function MenuListScreen({ nav }) {
  const days = [
    { key: 'hoje', day: "Qua", date: "28 abr", count: 8, status: "Em andamento", isToday: true, doneText: "3 de 8 concluídos" },
    { key: 'qui', day: "Qui", date: "29 abr", count: 7, status: "Planejado", doneText: "Servir 200 refeições" },
    { key: 'sex', day: "Sex", date: "30 abr", count: 8, status: "Planejado", doneText: "Servir 200 refeições" },
    { key: null, day: "Sáb", date: "01 mai", count: 0, status: "Feriado", doneText: "Sem operação" },
    { key: 'seg', day: "Seg", date: "03 mai", count: 8, status: "Planejado", doneText: "Servir 200 refeições" },
    { key: 'ter', day: "Ter", date: "04 mai", count: 7, status: "Planejado", doneText: "Servir 200 refeições" },
    { key: 'qua-prox', day: "Qua", date: "05 mai", count: 8, status: "Rascunho", doneText: "3 itens pendentes" },
  ];  return (
    <div style={{ paddingBottom: 20 }}>
      <AppHeader employeeName="João" notifCount={3}
        subtitle="Semana 18 · abr/mai"
        onNotif={() => nav.push('notifications')} />
      <div style={{ padding: '0 20px 18px' }}>
        <div className="t-largeTitle">Cardápios</div>
      </div>
      <ul style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {days.map((d, i) => {
          const isFuture = !d.isToday && d.status !== 'Feriado';
          return (
            <li key={i} onClick={() => d.isToday ? nav.push('menuToday') : (d.status !== 'Feriado' && nav.push('menuDay', { day: d }))}
              style={{
                background: 'var(--color-background-elevated)',
                borderRadius: 14, padding: '14px 16px',
                border: d.isToday ? '1.5px solid var(--color-text-primary)' : '0.5px solid var(--color-border-tertiary)',
                display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer',
                opacity: d.status === 'Feriado' ? 0.55 : 1,
              }}>
              <div style={{ width: 56, textAlign: 'center', flexShrink: 0 }}>
                <div className="t-caption" style={{ color: 'var(--color-text-tertiary)' }}>{d.day}</div>
                <div className="t-mono" style={{ fontSize: 22, fontWeight: 700, lineHeight: '24px' }}>
                  {d.date.split(' ')[0]}
                </div>
                <div className="t-caption">{d.date.split(' ')[1]}</div>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <div style={{ fontSize: 16, fontWeight: 600 }}>{d.count > 0 ? `${d.count} itens` : 'Sem cardápio'}</div>
                  {d.isToday && (
                    <span style={{
                      padding: '2px 8px', borderRadius: 999,
                      background: 'var(--color-text-primary)', color: 'var(--color-text-inverse)',
                      fontSize: 10, fontWeight: 700, letterSpacing: 0.4, textTransform: 'uppercase',
                    }}>HOJE</span>
                  )}
                </div>
                <div className="t-footnote">{d.doneText}</div>
              </div>
              {isFuture && (
                <button className="bare" onClick={(e) => { e.stopPropagation(); nav.push('menuDay', { day: d }); }} style={{
                  fontSize: 14, color: 'var(--color-text-link)', fontWeight: 600,
                }}>Editar</button>
              )}
              {!isFuture && d.count > 0 && <Icon.Chevron style={{ color: 'var(--color-text-tertiary)' }} />}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MENU DAY (Cardápio de dia futuro — planejamento)
// ─────────────────────────────────────────────────────────────
function MenuDayScreen({ nav, params }) {
  const day = params?.day || {};
  const [tick, setTick] = React.useState(0);
  // Find future menu data by key (qui/sex/seg etc) or by date match
  const FUTURE = window.MOCK.FUTURE_MENUS || {};
  const dayKeyMap = { 'qui': 'qui', 'sex': 'sex', 'sáb': null, 'seg': 'seg', 'ter': 'ter', 'qua': day.key === 'qua-prox' ? 'qua-prox' : null };
  const key = day.key || dayKeyMap[(day.day || '').toLowerCase()] || Object.keys(FUTURE)[0];
  const menuData = key ? FUTURE[key] : null;
  const items = (menuData?.items || []).map(it => window.__appStore?.menuItems?.[it.id] || it);

  const openItem = (item) => nav.push('itemDetail', { itemId: item.id, item });
  const addPlannedItem = () => {
    if (!menuData) return;
    const item = {
      id: 'new-' + Date.now(), name: 'Novo preparo planejado', portions: 200,
      status: 'planned', progress: 0, expectedAt: '11:30', tags: [], timeline: [],
      ingredients: [{ ref: 'arrozBranco', planned: 1000, used: 0, tags: [] }],
    };
    menuData.items.push(item);
    setTick(t => t + 1);
    nav.push('itemDetail', { itemId: item.id, item });
  };

  const statusColor = { done: 'var(--status-done-dot)', progress: 'var(--status-progress-dot)', planned: 'var(--status-planned-dot)', blocked: 'var(--status-blocked-dot)' };

  return (
    <div style={{ paddingBottom: 30 }}>
      <div style={{ padding: '6px 20px 4px' }}>
        <BackLink onBack={() => nav.pop()} />
      </div>
      <div style={{ padding: '6px 20px 16px' }}>
        <div className="t-footnote" style={{ color: 'var(--color-text-secondary)', marginBottom: 6 }}>
          {day.day} · {day.date}
        </div>
        <div className="t-largeTitle" style={{ marginBottom: 4 }}>
          {day.count > 0 ? `${day.count} itens planejados` : 'Sem cardápio'}
        </div>
        <div className="t-footnote">{day.doneText}</div>
      </div>

      {/* Aviso planejamento */}
      <div style={{ margin: '0 16px 16px', padding: '12px 14px', borderRadius: 12,
        background: 'var(--status-progress-bg)', border: '0.5px solid var(--status-progress-dot)',
        display: 'flex', alignItems: 'center', gap: 10 }}>
        <Icon.Clock style={{ color: 'var(--status-progress-fg)', flexShrink: 0 }} />
        <div className="t-footnote" style={{ color: 'var(--status-progress-fg)', fontWeight: 500 }}>
          Cardápio planejado · ainda não iniciado · pode ser editado
        </div>
      </div>

      {/* Lista de itens */}
      {items.length > 0 ? (
        <ul style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {items.map((item, i) => (
            <li key={i} onClick={() => openItem(item)} style={{
              background: 'var(--color-background-elevated)',
              border: '0.5px solid var(--color-border-tertiary)',
              borderRadius: 14, padding: '14px 16px',
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <div style={{ width: 8, height: 8, borderRadius: 999, background: statusColor.planned, flexShrink: 0 }} />
                    <div style={{ fontSize: 16, fontWeight: 600, letterSpacing: -0.2 }}>{item.name}</div>
                  </div>
                  <div className="t-footnote" style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    <span>{item.portions} porções</span>
                    <span style={{ color: 'var(--color-border-secondary)' }}>·</span>
                    <span>Servir {item.expectedAt}</span>
                    <span style={{ color: 'var(--color-border-secondary)' }}>·</span>
                    <span>{item.ingredients.length} insumos</span>
                  </div>
                </div>
                <button className="bare" onClick={(e) => { e.stopPropagation(); openItem(item); }} style={{
                  fontSize: 13, fontWeight: 600, color: 'var(--color-text-link)',
                  padding: '4px 0', flexShrink: 0,
                }}>Editar</button>
              </div>

              {/* Insumos collapse */}
              <div style={{ marginTop: 10, paddingTop: 10, borderTop: '0.5px solid var(--color-divider)' }}>
                <div className="t-caption" style={{ marginBottom: 6 }}>INSUMOS PREVISTOS</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {item.ingredients.map((ig, j) => {
                    const info = window.MOCK.INGREDIENTS[ig.ref];
                    const f = window.fmtQty ? window.fmtQty(ig.planned, info?.unit || 'g') : { value: ig.planned, unit: info?.unit || 'g' };
                    const hasStock = info && info.qty >= ig.planned;
                    return (
                      <div key={j} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span className="t-footnote">{info?.name || ig.ref}</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <span className="t-mono" style={{ fontSize: 13 }}>{f.value}{f.unit}</span>
                          <div style={{ width: 6, height: 6, borderRadius: 999,
                            background: hasStock ? 'var(--status-done-dot)' : 'var(--status-blocked-dot)' }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div style={{ margin: '0 16px', padding: '40px 24px', borderRadius: 16,
          background: 'var(--color-background-elevated)', border: '1px dashed var(--color-border-secondary)',
          textAlign: 'center' }}>
          <div className="t-headline">Sem itens planejados</div>
          <div className="t-footnote" style={{ marginTop: 6 }}>Adicione itens para este dia</div>
        </div>
      )}

      {/* CTA */}
      <div style={{ padding: '20px 16px 0' }}>
        <PrimaryButton icon={<Icon.Plus />} onClick={addPlannedItem}>
          Adicionar item ao cardápio
        </PrimaryButton>
      </div>
    </div>
  );
}


function TechnicalSheetScreen({ nav, params }) {
  const item = params.item || window.__appStore?.menuItems?.[params.itemId]
    || window.MOCK.MENU_TODAY.find(m => m.id === params.itemId)
    || Object.values(window.MOCK.FUTURE_MENUS || {}).flatMap(m => m.items || []).find(m => m.id === params.itemId)
    || window.MOCK.MENU_TODAY[0];
  const totalPlanned = item.ingredients.reduce((sum, ig) => sum + Number(ig.planned || 0), 0);
  const totalUsed = item.ingredients.reduce((sum, ig) => sum + Number(ig.used || 0), 0);
  const totalDiscarded = item.ingredients.reduce((sum, ig) => sum + Number(ig.discarded || 0), 0);
  return (
    <div style={{ paddingBottom: 30 }}>
      <div style={{ padding: '6px 20px 4px' }}><BackLink onBack={() => nav.pop()} /></div>
      <div style={{ padding: '6px 20px 16px' }}>
        <div className="t-overline" style={{ marginBottom: 4 }}>Ficha técnica</div>
        <div className="t-largeTitle">{item.name}</div>
        <div className="t-footnote" style={{ marginTop: 6 }}>{item.portions} porções · servir {item.expectedAt || '11:30'}</div>
      </div>
      <div style={{ padding: '0 20px 16px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 10 }}>
        <Card><div className="t-caption">Planejado</div><div className="t-mono" style={{ fontSize: 22, fontWeight: 800 }}>{window.fmtQty(totalPlanned, 'g').value} kg</div></Card>
        <Card><div className="t-caption">Utilizado</div><div className="t-mono" style={{ fontSize: 22, fontWeight: 800 }}>{window.fmtQty(totalUsed, 'g').value} kg</div></Card>
        <Card><div className="t-caption">Descartado</div><div className="t-mono" style={{ fontSize: 22, fontWeight: 800 }}>{window.fmtQty(totalDiscarded, 'g').value} kg</div></Card>
      </div>
      <Section title="Insumos da receita" subtitle="quantidade base">
        <div style={{ background: 'var(--color-background-elevated)', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 16, overflow: 'hidden' }}>
          {item.ingredients.map((ig, i) => {
            const info = window.MOCK.INGREDIENTS[ig.ref];
            const planned = window.fmtQty(ig.planned, info?.unit || 'g');
            const available = window.fmtQty(info?.qty || 0, info?.unit || 'g');
            const enough = (info?.qty || 0) >= (ig.planned || 0);
            return (
              <div key={ig.ref + i} style={{ padding: 14, borderBottom: i < item.ingredients.length - 1 ? '0.5px solid var(--color-divider)' : 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
                  <div><div className="t-subhead">{info?.name || ig.ref}</div><div className="t-footnote">Lote {info?.lot || '—'} · Val {info?.expires || '—'}</div></div>
                  <Tag family={enough ? 'ready' : 'issue'} label={enough ? 'estoque ok' : 'desfalcado'} />
                </div>
                <div className="t-footnote" style={{ marginTop: 8, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <span>Previsto: <b>{planned.value}{planned.unit}</b></span>
                  <span>Disponível: <b>{available.value}{available.unit}</b></span>
                </div>
              </div>
            );
          })}
        </div>
      </Section>
      <Section title="Modo de preparo operacional">
        <div style={{ background: 'var(--color-background-elevated)', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 16, padding: 16 }}>
          <ol style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingLeft: 18 }}>
            <li>Separar e conferir lotes conforme validade e localização.</li>
            <li>Registrar retirada/consumo antes do preparo para manter o estoque atualizado.</li>
            <li>Durante o preparo, registrar tags de ocorrência e descarte quando houver perda.</li>
            <li>Finalizar o item somente após conferência de porções e baixa dos insumos.</li>
          </ol>
        </div>
      </Section>
    </div>
  );
}

Object.assign(window, {
  HomeScreen, MenuTodayScreen, ItemDetailScreen, TechnicalSheetScreen, StockScreen,
  StockMovementScreen, NotificationsScreen, MenuListScreen,
  MenuDayScreen,
  TagPickerSheet, DiscardSheet,
});

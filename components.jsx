// components.jsx — shared building blocks for Cozinha OS
// All components are written for a 390px iPhone frame.

// ─────────────────────────────────────────────────────────────
// Icons — line, 24px, currentColor. Hand-tuned for kitchen ops.
// ─────────────────────────────────────────────────────────────
const Icon = {
  Home: (p) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...p}>
      <path d="M3.5 10.5L12 4l8.5 6.5V20a1 1 0 01-1 1h-4v-6h-7v6h-4a1 1 0 01-1-1V10.5z"
        stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/>
    </svg>
  ),
  Menu: (p) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...p}>
      <rect x="3.5" y="4.5" width="17" height="15" rx="2.5" stroke="currentColor" strokeWidth="1.7"/>
      <path d="M7 9h10M7 12.5h10M7 16h7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
    </svg>
  ),
  Stock: (p) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...p}>
      <path d="M3.5 7.5L12 3l8.5 4.5v9L12 21l-8.5-4.5v-9z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/>
      <path d="M3.5 7.5L12 12m0 0l8.5-4.5M12 12v9" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/>
    </svg>
  ),
  Recipe: (p) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...p}>
      <path d="M6 4.5h11a2 2 0 012 2v13.5l-3-2-3 2-3-2-3 2V6.5a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/>
      <path d="M9 9h7M9 12.5h5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
    </svg>
  ),
  Dashboard: (p) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...p}>
      <path d="M3.5 14.5a8.5 8.5 0 1117 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
      <path d="M12 14.5l4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
      <circle cx="12" cy="14.5" r="1.5" fill="currentColor"/>
    </svg>
  ),
  Bell: (p) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...p}>
      <path d="M5.5 17h13l-1.5-2v-4a5.5 5.5 0 00-10 0v4l-1.5 2z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/>
      <path d="M10 19.5a2 2 0 004 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
    </svg>
  ),
  Chevron: (p) => (
    <svg width="8" height="14" viewBox="0 0 8 14" fill="none" {...p}>
      <path d="M1 1l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Back: (p) => (
    <svg width="9" height="15" viewBox="0 0 9 15" fill="none" {...p}>
      <path d="M8 1L1 7.5 8 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Search: (p) => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" {...p}>
      <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.7"/>
      <path d="M12.5 12.5L16 16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
    </svg>
  ),
  Plus: (p) => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}>
      <path d="M7 1.5v11M1.5 7h11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  Minus: (p) => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}>
      <path d="M1.5 7h11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  Close: (p) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}>
      <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  Alert: (p) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}>
      <path d="M8 1.5l7 12.5H1L8 1.5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
      <path d="M8 6v3.5M8 11.5v.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),
  Clock: (p) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}>
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M8 4v4l2.5 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),
  Lock: (p) => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}>
      <rect x="2.5" y="6" width="9" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M5 6V4a2 2 0 014 0v2" stroke="currentColor" strokeWidth="1.6"/>
    </svg>
  ),
  Check: (p) => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}>
      <path d="M2.5 7.5l3 3 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Box: (p) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}>
      <path d="M2 5l6-3 6 3v6l-6 3-6-3V5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M2 5l6 3 6-3M8 8v6" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  Discard: (p) => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" {...p}>
      <path d="M2.5 4.5h13M7 4.5V3a1 1 0 011-1h2a1 1 0 011 1v1.5M4.5 4.5l1 11a1 1 0 001 1h5a1 1 0 001-1l1-11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Play: (p) => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" {...p}>
      <path d="M3 1.5L12 7l-9 5.5v-11z"/>
    </svg>
  ),
  Edit: (p) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}>
      <path d="M11 2.5l2.5 2.5-8 8H3v-2.5l8-8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  ),
  History: (p) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}>
      <path d="M2.5 8a5.5 5.5 0 1 0 1.6-3.9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M2 3v3h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 5v3.2l2 1.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),
  Filter: (p) => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" {...p}>
      <path d="M2 4h14M4.5 9h9M7 14h4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
    </svg>
  ),
  Barcode: (p) => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" {...p}>
      <path d="M2 3v12M5 3v12M8 3v12M10 3v12M13 3v12M16 3v12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
  Pin: (p) => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}>
      <path d="M7 1.5c2.2 0 4 1.7 4 3.9 0 2.9-4 7.1-4 7.1S3 8.3 3 5.4c0-2.2 1.8-3.9 4-3.9z" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="7" cy="5.4" r="1.4" fill="currentColor"/>
    </svg>
  ),
};

// ─────────────────────────────────────────────────────────────
// StatusBar — simulated iOS top bar (time + signal + battery)
// ─────────────────────────────────────────────────────────────
function StatusBar({ time = "08:42" }) {
  return (
    <div style={{
      height: 47, padding: '0 28px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      flexShrink: 0,
    }}>
      <div style={{ fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 600, letterSpacing: -0.2 }}>
        {time}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <svg width="17" height="11" viewBox="0 0 17 11"><rect x="0" y="6.5" width="3" height="4" rx="0.6" fill="#11110F"/><rect x="4.5" y="4" width="3" height="6.5" rx="0.6" fill="#11110F"/><rect x="9" y="2" width="3" height="8.5" rx="0.6" fill="#11110F"/><rect x="13.5" y="0" width="3" height="10.5" rx="0.6" fill="#11110F"/></svg>
        <svg width="15" height="11" viewBox="0 0 15 11"><path d="M7.5 2.8c2 0 3.8.8 5.1 2.1l1-1A8.5 8.5 0 007.5 1.5 8.5 8.5 0 001.4 3.9l1 1A7.2 7.2 0 017.5 2.8z" fill="#11110F"/><path d="M7.5 6c1.2 0 2.3.5 3.1 1.3l1-1A6 6 0 007.5 4.5 6 6 0 003.4 6.3l1 1A4.4 4.4 0 017.5 6z" fill="#11110F"/><circle cx="7.5" cy="9.5" r="1.3" fill="#11110F"/></svg>
        <svg width="25" height="12" viewBox="0 0 25 12"><rect x="0.5" y="0.5" width="21" height="11" rx="3" stroke="#11110F" strokeOpacity="0.4" fill="none"/><rect x="2" y="2" width="18" height="8" rx="1.8" fill="#11110F"/><path d="M22.6 4v4c.7-.3 1.2-1 1.2-2s-.5-1.7-1.2-2z" fill="#11110F" fillOpacity="0.4"/></svg>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// AppHeader — used on Home and section roots (avatar + bell)
// ─────────────────────────────────────────────────────────────
function AppHeader({ employeeName = "João", notifCount = 3, onNotif, subtitle }) {
  const initials = employeeName.split(' ').map(n => n[0]).slice(0, 2).join('');
  return (
    <div style={{
      padding: '6px 20px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      gap: 12, flexShrink: 0,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
        <div style={{
          width: 40, height: 40, borderRadius: 999,
          background: 'var(--color-text-primary)', color: 'var(--color-text-inverse)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 15, fontWeight: 600, letterSpacing: -0.2, flexShrink: 0,
        }}>{initials}</div>
        <div style={{ minWidth: 0 }}>
          <div className="t-footnote" style={{ color: 'var(--color-text-tertiary)', lineHeight: '14px' }}>
            {subtitle || "Bom dia"}
          </div>
          <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: -0.3, lineHeight: '22px' }}>
            Olá, {employeeName}
          </div>
        </div>
      </div>
      <button className="bare" onClick={onNotif} aria-label="Notificações" style={{
        width: 44, height: 44, borderRadius: 999, position: 'relative',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--color-text-primary)',
      }}>
        <Icon.Bell />
        {notifCount > 0 && (
          <span style={{
            position: 'absolute', top: 6, right: 6,
            minWidth: 18, height: 18, padding: '0 5px',
            borderRadius: 999, background: 'var(--status-alert-dot)',
            color: '#fff', fontSize: 11, fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '2px solid var(--color-background-primary)', boxSizing: 'content-box',
          }}>{notifCount}</span>
        )}
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SectionHeader — "Voltar" link style for inner screens
// ─────────────────────────────────────────────────────────────
function BackLink({ onBack, label = "Voltar" }) {
  return (
    <button className="bare" onClick={onBack} style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      color: 'var(--color-text-secondary)', fontSize: 14, padding: '0',
    }}>
      <Icon.Back />
      <span>{label}</span>
    </button>
  );
}

// ─────────────────────────────────────────────────────────────
// BottomNav — iOS native pattern, no pills/borders, just border-top
// ─────────────────────────────────────────────────────────────
function BottomNav({ active, onChange }) {
  const items = [
    { id: 'home',     label: 'Home',      icon: Icon.Home },
    { id: 'menu',     label: 'Cardápios', icon: Icon.Menu },
    { id: 'stock',    label: 'Estoque',   icon: Icon.Stock },
    { id: 'recipes',  label: 'Receitas',  icon: Icon.Recipe },
    { id: 'dashboard',label: 'Dashboard', icon: Icon.Dashboard },
  ];
  return (
    <div style={{
      flexShrink: 0,
      borderTop: '0.5px solid var(--color-border-tertiary)',
      background: 'var(--color-background-primary)',
      paddingBottom: 22, paddingTop: 8,
      display: 'flex', justifyContent: 'space-around',
    }}>
      {items.map(it => {
        const isActive = active === it.id;
        const color = isActive ? 'var(--color-text-primary)' : 'var(--color-text-tertiary)';
        return (
          <button key={it.id} className="bare" onClick={() => onChange(it.id)}
            style={{
              flex: 1, padding: '4px 0',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
              color,
            }}>
            <it.icon />
            <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: 0.1 }}>{it.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// StatusBadge — colored pill for item statuses
// ─────────────────────────────────────────────────────────────
const STATUS_LABEL = {
  planned:  { label: 'Planejado',  fg: 'var(--status-planned-fg)',  bg: 'var(--status-planned-bg)',  dot: 'var(--status-planned-dot)' },
  progress: { label: 'Em preparo', fg: 'var(--status-progress-fg)', bg: 'var(--status-progress-bg)', dot: 'var(--status-progress-dot)' },
  done:     { label: 'Concluído',  fg: 'var(--status-done-fg)',     bg: 'var(--status-done-bg)',     dot: 'var(--status-done-dot)' },
  blocked:  { label: 'Bloqueado',  fg: 'var(--status-blocked-fg)',  bg: 'var(--status-blocked-bg)',  dot: 'var(--status-blocked-dot)' },
  alert:    { label: 'Atrasado',   fg: 'var(--status-alert-fg)',    bg: 'var(--status-alert-bg)',    dot: 'var(--status-alert-dot)' },
};
function StatusBadge({ status, label, dot = true, size = 'md' }) {
  const s = STATUS_LABEL[status] || STATUS_LABEL.planned;
  const padY = size === 'sm' ? 3 : 5;
  const padX = size === 'sm' ? 8 : 10;
  const fs = size === 'sm' ? 11 : 12;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: `${padY}px ${padX}px`, borderRadius: 999,
      background: s.bg, color: s.fg,
      fontSize: fs, fontWeight: 600, letterSpacing: -0.05, whiteSpace: 'nowrap',
    }}>
      {dot && <span style={{ width: 6, height: 6, borderRadius: 999, background: s.dot }} />}
      {label || s.label}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────
// Tag — colored chip for prep/pre/ready/issue families
// ─────────────────────────────────────────────────────────────
const TAG_FAM = {
  prep:  { fg: 'var(--tag-prep-fg)',  bg: 'var(--tag-prep-bg)' },
  pre:   { fg: 'var(--tag-pre-fg)',   bg: 'var(--tag-pre-bg)' },
  ready: { fg: 'var(--tag-ready-fg)', bg: 'var(--tag-ready-bg)' },
  issue: { fg: 'var(--tag-issue-fg)', bg: 'var(--tag-issue-bg)' },
};
function Tag({ family = 'prep', label, onRemove, selected = true, onClick }) {
  const t = TAG_FAM[family];
  return (
    <span onClick={onClick} style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '4px 10px', borderRadius: 999,
      background: selected ? t.bg : 'transparent',
      color: selected ? t.fg : 'var(--color-text-secondary)',
      border: selected ? 'none' : '1px dashed var(--color-border-secondary)',
      fontSize: 12, fontWeight: 600, letterSpacing: -0.05, whiteSpace: 'nowrap',
      cursor: onClick ? 'pointer' : 'default',
    }}>
      {label}
      {onRemove && (
        <button className="bare" onClick={(e) => { e.stopPropagation(); onRemove(); }}
          style={{ display: 'inline-flex', color: 'currentColor', opacity: 0.7 }}>
          <Icon.Close />
        </button>
      )}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────
// ProgressBar
// ─────────────────────────────────────────────────────────────
function ProgressBar({ value = 0, max = 1, color, height = 4 }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  const fill = color || 'var(--color-text-primary)';
  return (
    <div style={{
      height, borderRadius: height, background: 'var(--color-border-tertiary)',
      overflow: 'hidden', width: '100%',
    }}>
      <div style={{
        height: '100%', width: `${pct}%`, background: fill,
        borderRadius: height, transition: 'width 0.4s cubic-bezier(0.2,0.7,0.2,1)',
      }} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// BottomSheet — with backdrop, slide-up animation, drag handle
// ─────────────────────────────────────────────────────────────
function BottomSheet({ open, onClose, title, children, height = 'auto' }) {
  const [mounted, setMounted] = React.useState(open);
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    if (open) {
      setMounted(true);
      requestAnimationFrame(() => setVisible(true));
    } else if (mounted) {
      setVisible(false);
      const t = setTimeout(() => setMounted(false), 280);
      return () => clearTimeout(t);
    }
  }, [open]);
  if (!mounted) return null;
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 100,
      pointerEvents: visible ? 'auto' : 'none',
    }}>
      <div onClick={onClose} style={{
        position: 'absolute', inset: 0,
        background: 'var(--color-background-overlay)',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.28s ease',
      }} />
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        background: 'var(--color-background-primary)',
        borderTopLeftRadius: 24, borderTopRightRadius: 24,
        boxShadow: '0 -8px 32px rgba(0,0,0,0.12)',
        transform: visible ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 0.32s cubic-bezier(0.2,0.8,0.2,1)',
        maxHeight: '88%', display: 'flex', flexDirection: 'column',
        height,
      }}>
        <div style={{ padding: '8px 0 4px', display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: 36, height: 5, borderRadius: 3, background: 'var(--color-border-secondary)' }} />
        </div>
        {title && (
          <div style={{
            padding: '6px 20px 12px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div className="t-title3">{title}</div>
            <button className="bare" onClick={onClose} aria-label="Fechar"
              style={{ width: 32, height: 32, borderRadius: 999, background: 'var(--color-background-secondary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-secondary)' }}>
              <Icon.Close />
            </button>
          </div>
        )}
        <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
          {children}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Card — generic surface
// ─────────────────────────────────────────────────────────────
function Card({ children, onClick, padded = true, style = {}, accent }) {
  return (
    <div onClick={onClick} style={{
      background: 'var(--color-background-elevated)',
      borderRadius: 'var(--radius-lg)',
      border: '0.5px solid var(--color-border-tertiary)',
      padding: padded ? 16 : 0,
      cursor: onClick ? 'pointer' : 'default',
      position: 'relative', overflow: 'hidden',
      ...style,
    }}>
      {accent && (
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: accent }} />
      )}
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SwipeableRow — touch-driven swipe with reveal on both sides
// Right swipe (drag right) → quick action (left side action revealed)
// Left swipe (drag left) → menu of actions (right side actions revealed)
// ─────────────────────────────────────────────────────────────
function SwipeableRow({
  children,
  onSwipeRight,            // (e.g. iniciar preparo) — reveals from LEFT
  onSwipeLeft,             // single action when no actions[]
  rightLabel = "Iniciar",
  rightColor = "var(--status-progress-dot)",
  rightIcon,
  actions = [],            // [{label, icon, color, onPress}]
  height,
}) {
  const [dx, setDx] = React.useState(0);
  const [dragging, setDragging] = React.useState(false);
  const startX = React.useRef(0);
  const startDx = React.useRef(0);
  const ref = React.useRef(null);
  const ACTIONS_W = actions.reduce((acc, a) => acc + 76, 0);
  const RIGHT_THRESHOLD = 80;

  const onPointerDown = (e) => {
    setDragging(true);
    startX.current = e.clientX;
    startDx.current = dx;
    if (ref.current && ref.current.setPointerCapture) {
      try { ref.current.setPointerCapture(e.pointerId); } catch {}
    }
  };
  const onPointerMove = (e) => {
    if (!dragging) return;
    let nd = startDx.current + (e.clientX - startX.current);
    // Constrain
    nd = Math.max(-Math.max(160, ACTIONS_W + 16), Math.min(140, nd));
    setDx(nd);
  };
  const onPointerUp = (e) => {
    if (!dragging) return;
    setDragging(false);
    if (dx > RIGHT_THRESHOLD && onSwipeRight) {
      // animate fully right then reset
      setDx(380);
      setTimeout(() => { onSwipeRight(); setDx(0); }, 240);
      return;
    }
    if (dx < -40 && actions.length > 0) {
      // snap open to actions
      setDx(-ACTIONS_W);
      return;
    }
    if (dx < -RIGHT_THRESHOLD && onSwipeLeft && actions.length === 0) {
      setDx(-380);
      setTimeout(() => { onSwipeLeft(); setDx(0); }, 240);
      return;
    }
    setDx(0);
  };

  return (
    <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 14, height }}>
      {/* LEFT reveal (swipe right action) */}
      {onSwipeRight && dx > 0 && (
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0,
          width: Math.max(dx, 0), background: rightColor,
          display: 'flex', alignItems: 'center', justifyContent: 'flex-start',
          paddingLeft: 18, color: '#fff', gap: 8, fontWeight: 600, fontSize: 14,
        }}>
          {rightIcon}
          {dx > 56 && <span>{rightLabel}</span>}
        </div>
      )}
      {/* RIGHT reveal (actions menu) */}
      {actions.length > 0 && dx < 0 && (
        <div style={{
          position: 'absolute', right: 0, top: 0, bottom: 0,
          display: 'flex', width: Math.min(-dx, ACTIONS_W),
          overflow: 'hidden',
        }}>
          {actions.map((a, i) => (
            <button key={i} className="bare"
              onClick={() => { a.onPress && a.onPress(); setDx(0); }}
              style={{
                width: 76, background: a.color || 'var(--color-text-secondary)',
                color: '#fff', display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: 4,
                fontSize: 11, fontWeight: 600,
              }}>
              {a.icon}
              <span>{a.label}</span>
            </button>
          ))}
        </div>
      )}
      <div
        ref={ref}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        style={{
          transform: `translateX(${dx}px)`,
          transition: dragging ? 'none' : 'transform 0.28s cubic-bezier(0.2,0.7,0.2,1)',
          touchAction: 'pan-y',
          background: 'var(--color-background-elevated)',
          position: 'relative', zIndex: 2,
        }}
      >
        {children}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// QtyEditor — inline tap-to-edit numeric with − / +
// ─────────────────────────────────────────────────────────────
// QtyEditor — display in kg/L when ≥ 1000g/ml; edit base units (g/ml).
// Optional `max` constraint.
function QtyEditor({ value, unit = "g", step = 50, onChange, min = 0, max }) {
  const [editing, setEditing] = React.useState(false);
  const [v, setV] = React.useState(value);
  React.useEffect(() => setV(value), [value]);
  const display = (val) => {
    if (unit === 'g' && val >= 1000) return { v: (val / 1000).toFixed(val % 1000 === 0 ? 0 : 2).replace(/\.?0+$/, '').replace('.', ','), u: 'kg' };
    if (unit === 'ml' && val >= 1000) return { v: (val / 1000).toFixed(val % 1000 === 0 ? 0 : 2).replace(/\.?0+$/, '').replace('.', ','), u: 'L' };
    return { v: val, u: unit };
  };
  const commit = () => {
    let nv = Number(v) || 0;
    if (max !== undefined) nv = Math.min(max, nv);
    nv = Math.max(min, nv);
    onChange && onChange(nv);
    setEditing(false);
  };
  if (!editing) {
    const d = display(value);
    return (
      <button className="bare" onClick={() => setEditing(true)} style={{
        display: 'inline-flex', alignItems: 'baseline', gap: 2,
        color: 'var(--color-text-primary)',
        padding: '4px 10px', borderRadius: 8,
        background: 'var(--color-background-secondary)',
        fontSize: 15, fontWeight: 600,
      }}>
        <span className="t-mono">{d.v}</span>
        <span style={{ fontSize: 12, color: 'var(--color-text-secondary)', fontWeight: 500 }}>{d.u}</span>
      </button>
    );
  }
  const atMax = max !== undefined && Number(v) >= max;
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 2,
      background: 'var(--color-background-elevated)',
      border: '1.5px solid var(--color-text-primary)',
      borderRadius: 10, padding: 2,
    }}>
      <button className="bare" onClick={() => setV(Math.max(min, Number(v) - step))} style={{
        width: 32, height: 32, borderRadius: 7, display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        background: 'var(--color-background-secondary)',
      }}><Icon.Minus /></button>
      <input
        autoFocus type="number" value={v}
        onChange={(e) => {
          let nv = Number(e.target.value);
          if (max !== undefined && nv > max) nv = max;
          setV(nv);
        }}
        onBlur={commit}
        onKeyDown={(e) => { if (e.key === 'Enter') commit(); }}
        style={{
          width: 60, textAlign: 'center', border: 0, background: 'transparent',
          fontSize: 15, fontWeight: 600, padding: 0, outline: 'none',
          color: atMax ? 'var(--status-alert-fg)' : 'inherit',
        }}
        className="t-mono"
      />
      <button className="bare"
        disabled={atMax}
        onClick={() => {
          const next = Number(v) + step;
          setV(max !== undefined ? Math.min(max, next) : next);
        }}
        style={{
        width: 32, height: 32, borderRadius: 7, display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        background: 'var(--color-background-secondary)',
        opacity: atMax ? 0.4 : 1,
      }}><Icon.Plus /></button>
      <button className="bare" onClick={commit} style={{
        height: 32, padding: '0 12px', borderRadius: 7,
        background: 'var(--color-text-primary)', color: 'var(--color-text-inverse)',
        fontSize: 13, fontWeight: 600, marginLeft: 2,
      }}>OK</button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// FloatingCTA — fixed-bottom action bar inside frame
// ─────────────────────────────────────────────────────────────
function FloatingCTA({ children }) {
  return (
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 0,
      padding: '12px 20px 22px',
      background: 'linear-gradient(to top, var(--color-background-primary) 75%, rgba(245,245,244,0))',
      display: 'flex', gap: 10, zIndex: 5,
    }}>{children}</div>
  );
}

function PrimaryButton({ children, onClick, full = true, color = 'var(--color-text-primary)', textColor = 'var(--color-text-inverse)', icon, disabled = false }) {
  return (
    <button className="bare" onClick={disabled ? undefined : onClick} disabled={disabled} style={{
      flex: full ? 1 : undefined,
      height: 52, padding: '0 22px', borderRadius: 14,
      background: color, color: textColor,
      fontSize: 16, fontWeight: 600, letterSpacing: -0.2,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      opacity: disabled ? 0.4 : 1,
      cursor: disabled ? 'not-allowed' : 'pointer',
    }}>
      {icon}
      {children}
    </button>
  );
}
function SecondaryButton({ children, onClick, full = true, icon }) {
  return (
    <button className="bare" onClick={onClick} style={{
      flex: full ? 1 : undefined,
      height: 52, padding: '0 18px', borderRadius: 14,
      background: 'var(--color-background-secondary)', color: 'var(--color-text-primary)',
      fontSize: 16, fontWeight: 600, letterSpacing: -0.2,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    }}>
      {icon}
      {children}
    </button>
  );
}

Object.assign(window, {
  Icon, StatusBar, AppHeader, BackLink, BottomNav,
  StatusBadge, STATUS_LABEL, Tag, TAG_FAM, ProgressBar, BottomSheet, Card,
  SwipeableRow, QtyEditor, FloatingCTA, PrimaryButton, SecondaryButton,
});

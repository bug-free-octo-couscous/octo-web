import { ACC, BD, CM, MU, SURF, TX, mono } from '../theme.js';

export const NAV_ITEMS = [
  { id: 'overview',   label: 'Overview',     glyph: '◈' },
  { id: 'quickstart', label: 'Quick Start',  glyph: '▹' },
  { id: 'syntax',     label: 'Syntax',       glyph: '≋' },
  { id: 'types',      label: 'Type System',  glyph: 'Π' },
  { id: 'paths',      label: 'Path Types',   glyph: '⟨⟩' },
  { id: 'cubical',    label: 'Cubical Ops',  glyph: '□' },
  { id: 'equiv',      label: 'Equivalences', glyph: '≃' },
  { id: 'examples',   label: 'Examples',     glyph: '✓' },
];

export function Sidebar({ active, onSelect }) {
  return (
    <nav style={{
      width: 220, flexShrink: 0, background: SURF,
      borderRight: `1px solid ${BD}`, padding: '28px 0',
      height: '100vh', overflowY: 'auto',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Logo */}
      <div style={{ padding: '0 20px 24px', borderBottom: `1px solid ${BD}` }}>
        <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: 2, color: ACC }}>
          octo
        </div>
        <div style={{ fontSize: 11, color: MU, marginTop: 4, letterSpacing: 1 }}>
          CUBICAL TYPE THEORY
        </div>
      </div>

      {/* Nav items */}
      <ul style={{ listStyle: 'none', margin: '16px 0 0', padding: 0, flex: 1 }}>
        {NAV_ITEMS.map(({ id, label, glyph }) => {
          const isActive = id === active;
          return (
            <li key={id}>
              <button
                onClick={() => onSelect(id)}
                style={{
                  width: '100%', textAlign: 'left', background: isActive ? ACC + '12' : 'none',
                  border: 'none', cursor: 'pointer', padding: '11px 20px',
                  display: 'flex', alignItems: 'center', gap: 10,
                  color: isActive ? ACC : MU,
                  borderLeft: isActive ? `2px solid ${ACC}` : '2px solid transparent',
                  fontSize: 13.5, fontFamily: mono,
                  transition: 'all 0.15s',
                }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = TX; }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = MU; }}
              >
                <span style={{ fontSize: 14, opacity: 0.8, minWidth: 16 }}>{glyph}</span>
                {label}
              </button>
            </li>
          );
        })}
      </ul>

      {/* Footer */}
      <div style={{
        padding: '16px 20px',
        borderTop: `1px solid ${BD}`,
        marginTop: 'auto',
      }}>
        <div style={{ fontSize: 11, color: CM, lineHeight: 1.6 }}>
          <div style={{ color: MU, marginBottom: 2 }}>octo v0.1.0</div>
          <div>GHC2024 · Haskell</div>
        </div>
      </div>
    </nav>
  );
}
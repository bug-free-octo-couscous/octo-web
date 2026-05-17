import { ACC, BD, CM, MU, SURF2, TX, TY, WARN, mono, serif } from '../theme.js';
import { useResponsive } from '../hooks/useResponsive.js';

// ── Typography ──────────────────────────────────────────────────────────────

export function H1({ children }) {
  return (
    <h1 style={{
      fontFamily: serif, fontSize: 'clamp(22px, 4vw, 30px)', fontWeight: 400, color: TX,
      borderBottom: `2px solid ${ACC}`, paddingBottom: 12,
      marginBottom: 28, marginTop: 0, letterSpacing: '-0.3px',
    }}>
      {children}
    </h1>
  );
}

export function H2({ children }) {
  return (
    <h2 style={{
      fontFamily: serif, fontSize: 'clamp(17px, 3vw, 20px)', fontWeight: 400, color: ACC,
      marginTop: 36, marginBottom: 14, letterSpacing: '-0.2px',
    }}>
      {children}
    </h2>
  );
}

export function P({ children }) {
  return (
    <p style={{ color: MU, lineHeight: 1.85, marginBottom: 14, fontSize: 14.5 }}>
      {children}
    </p>
  );
}

// ── Inline elements ─────────────────────────────────────────────────────────

export function IC({ children, color = ACC }) {
  return (
    <code style={{
      background: SURF2, border: `1px solid ${BD}`, borderRadius: 4,
      padding: '1px 6px', fontFamily: mono, fontSize: '0.85em', color,
      wordBreak: 'break-word',
    }}>
      {children}
    </code>
  );
}

export function Pill({ children, color = TY }) {
  return (
    <span style={{
      background: color + '18', border: `1px solid ${color}44`,
      borderRadius: 4, padding: '2px 8px', fontSize: 12, color,
      fontFamily: mono, marginRight: 4,
    }}>
      {children}
    </span>
  );
}

// ── Block elements ──────────────────────────────────────────────────────────

export function Note({ children, kind = 'info' }) {
  const colors = { info: [ACC, '#0c1f2e'], warn: [WARN, '#1f1800'] };
  const [c, bg] = colors[kind] || colors.info;
  return (
    <div style={{
      background: bg, border: `1px solid ${c}33`, borderRadius: 8,
      padding: '12px 16px', margin: '16px 0', fontSize: 13.5, color: c, lineHeight: 1.7,
    }}>
      {children}
    </div>
  );
}

export function Row({ left, right, lc = TX }) {
  const { isMobile } = useResponsive();
  return (
    <div style={{
      display: isMobile ? 'block' : 'grid',
      gridTemplateColumns: isMobile ? undefined : '200px 1fr',
      gap: isMobile ? '2px 0' : '0 20px',
      padding: isMobile ? '10px 0' : '8px 0',
      borderBottom: `1px solid ${BD}`,
    }}>
      <code style={{
        fontFamily: mono, fontSize: 13, color: lc,
        display: 'block',
        marginBottom: isMobile ? 3 : 0,
        wordBreak: 'break-all',
      }}>
        {left}
      </code>
      <span style={{ color: MU, fontSize: 13.5, lineHeight: 1.7 }}>{right}</span>
    </div>
  );
}
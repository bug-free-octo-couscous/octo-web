import { ACC, BD, IV, KW, MU, SURF, TX } from '../theme.js';
import { H1, H2, IC, P, Row } from '../components/UI.jsx';
import { useResponsive } from '../hooks/useResponsive.js';

export function Overview() {
  const { isMobile } = useResponsive();

  const features = [
    ['Π / Σ types',      'Dependent functions and pairs with full η-equality'],
    ['Path types',       'Cubical equality  Path A u v  with endpoints'],
    ['hcomp',            'Homogeneous composition — the computational heart of HITs'],
    ['transport',        'Coercion along a path in a universe'],
    ['Equivalences',     'mkEquiv / Equiv / equivFwd with proof witnesses'],
    ['Univalence',       'ua : Equiv A B → Path U A B  computes on transport'],
    ['Interval algebra', '∧  ∨  ¬  on the interval for face lattice'],
    ['Eta equality',     'η-expansion for Π, Σ, and Path at type checking'],
  ];

  const modules = [
    ['Interval.hs',    'I — interval algebra, DNF representation, meet/join/neg'],
    ['Syntax.hs',      'Term — de Bruijn representation, shift / subst / beta'],
    ['Eval.hs',        'CBV evaluator — reduces to weak head + structural normal form'],
    ['Equality.hs',    'Eta-equality with fuel — handles η for Π, Σ, and Path'],
    ['TypeChecker.hs', 'Bidirectional type checker — infer + check with face lattice'],
    ['Env.hs',         'Global named environment — de Bruijn lifting of globals'],
  ];

  return <>
    <H1>Octo — Cubical Type Theory</H1>
    <P>
      <strong style={{ color: TX }}>Octo</strong> is a small, self-contained implementation
      of <em>Cubical Type Theory</em> in Haskell. It extends Martin-Löf type theory with an
      explicit <em>interval</em> object <IC color={IV}>𝕀</IC> and computable path types,
      giving a computational interpretation of Univalence and function extensionality.
    </P>

    <H2>Core features</H2>
    <div style={{
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
      gap: 12,
      marginBottom: 24,
    }}>
      {features.map(([title, desc]) => (
        <div key={title} style={{
          background: SURF, border: `1px solid ${BD}`, borderRadius: 8, padding: '14px 16px',
        }}>
          <div style={{ fontFamily: 'monospace', fontSize: 13, color: ACC, marginBottom: 6 }}>
            {title}
          </div>
          <div style={{ color: MU, fontSize: 13, lineHeight: 1.65 }}>{desc}</div>
        </div>
      ))}
    </div>

    <H2>Architecture</H2>
    <P>The implementation is split across six modules:</P>
    {modules.map(([mod, desc]) => <Row key={mod} left={mod} right={desc} lc={KW} />)}
    <div style={{ height: 16 }} />
  </>;
}
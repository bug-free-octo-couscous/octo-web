import { IV, KW } from '../theme.js';
import { H1, H2, IC, Note, P, Row } from '../components/UI.jsx';
import { Code } from '../components/Code.jsx';

const TRANSPORT_CASES = [
  ['Constant path', 'transport ({_} A) x  ↦  x  (identity)'],
  ['Pi path',       'transport ({i} PI(a:Ai).Bi) f  ↦  λa. transport (codomain) (f a0)'],
  ['Path path',     'transport ({i} Path (Ai) ui vi) q  ↦  ⟨j⟩ transport A (q@j)'],
  ['Sigma path',    "transport ({i} SIGMA(x:Ai).Bi) (a,b)  ↦  (a', b')"],
  ['ua transport',  'transport (ua e) x  ↦  equivFwd e x'],
];

export function Cubical() {
  return <>
    <H1>Cubical Operations</H1>

    <H2>hcomp — homogeneous composition</H2>
    <P>
      <IC color={KW}>hcomp A [phi] tube base</IC> is the computational primitive for
      filling open boxes. <IC>phi</IC> is a face formula; <IC>tube</IC> is the partial
      boundary (a path); <IC>base</IC> is the base point.
    </P>
    <Note>
      <strong>Well-formedness:</strong> the tube must satisfy{' '}
      <IC>[phi=1] ⊢ tube@0 ≡ base</IC> on every face of <IC>phi</IC>. The type checker
      verifies this for each cube in the DNF of <IC>phi</IC>.
    </Note>
    <Code>{`-- phi = 0 (empty system): no boundary, result = base
check hcomp_bot :
  PI (A : U0) . PI (x : A) . Path A x (hcomp A [0] ({_} x) x) =
    lambda_ A . lambda_ x . {_} x

-- phi = 1 (full system): tube evaluated at i=1
check hcomp_top :
  PI (A : U0) . PI (x : A) . PI (y : A) .
  PI (p : Path A x y) . Path A y (hcomp A [1] p x) =
    lambda_ A . lambda_ x . lambda_ y . lambda_ p . {_} y`}</Code>

    <H2>transport</H2>
    <P>
      <IC color={KW}>transport p x</IC> coerces <IC>x : A</IC> to type <IC>B</IC> along
      a path <IC>p : Path U A B</IC>. Several special cases compute:
    </P>
    <div style={{ margin: '12px 0 20px' }}>
      {TRANSPORT_CASES.map(([k, v]) => <Row key={k} left={k} right={v} lc={IV} />)}
    </div>
    <Code>{`-- transport along a constant path is identity
check transport_const :
  PI (A : U0) . PI (x : A) . Path A x (transport ({_} A) x) =
    lambda_ A . lambda_ x . {_} x

-- ua-transport: the defining computation rule of univalence
check transport_ua :
  PI (A : U0) . PI (B : U0) . PI (e : Equiv A B) . PI (x : A) .
  Path B (equivFwd e x) (transport (ua e) x) =
    lambda_ A . lambda_ B . lambda_ e . lambda_ x . {_} equivFwd e x`}</Code>
  </>;
}
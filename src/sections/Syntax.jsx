import { IV, KW } from '../theme.js';
import { H1, H2, IC, P, Row } from '../components/UI.jsx';
import { Code } from '../components/Code.jsx';

const TERMS = [
  ['lambda_ x . body',   'Lambda abstraction  λx.body'],
  ['function x . body',  'Alias for lambda_'],
  ['f a',                'Function application  (left-associative)'],
  ['PI (x : A) . B',     'Dependent function type  Π(x:A).B'],
  ['SIGMA (x : A) . B',  'Dependent pair type  Σ(x:A).B'],
  ['pair a b',           'Pair constructor  (a,b) — requires Σ type annotation'],
  ['fst p',              'First projection'],
  ['snd p',              'Second projection'],
  ['{i} body',           'Path-lambda  ⟨i⟩body (interval abstraction)'],
  ['p @ r',              'Path application  p applied at interval r'],
  ['Path A u v',         'Path type from u to v over type A'],
  ['U0  U1  U2  …',      'Universe hierarchy'],
  ['0  1',               'Interval endpoints  (𝕀 constants)'],
  ['i0  i1  …',          'Interval variables (in iExpr context)'],
  ['and  or  not_',      'Interval meet ∧, join ∨, negation ¬'],
];

const CUBICAL_OPS = [
  ['hcomp A [phi] tube base', 'Homogeneous composition at type A with partial tube'],
  ['transport p x',           'Transport x along path p : Path U A B'],
  ['Equiv A B',               'Equivalence type  A ≃ B'],
  ['mkEquiv A B f g eta eps', 'Build an equivalence from forward/backward/proofs'],
  ['equivFwd e x',            'Apply forward map of equivalence e to x'],
  ['ua e',                    'Univalence: Equiv A B → Path U A B'],
  ['Glue A [phi] te',         'Glue type (for constructing ua)'],
  ['glue [phi] t a',          'Glue element introduction'],
  ['unglue [phi] te g',       'Glue element elimination'],
];

export function Syntax() {
  return <>
    <H1>Syntax Reference</H1>

    <H2>Terms</H2>
    {TERMS.map(([l, r]) => <Row key={l} left={l} right={r} />)}
    <div style={{ height: 16 }} />

    <H2>Cubical operations</H2>
    {CUBICAL_OPS.map(([l, r]) => <Row key={l} left={l} right={r} />)}
    <div style={{ height: 16 }} />

    <H2>Operator precedence</H2>
    <P>
      Application is left-associative and binds tightest. <IC color={IV}>@</IC> for path
      application has the same precedence as term application. <IC color={KW}>PI</IC>,{' '}
      <IC color={KW}>SIGMA</IC>, <IC color={KW}>lambda_</IC>, and <IC color={IV}>{'{i}'}</IC>{' '}
      extend as far right as possible (lowest precedence).
    </P>
    <Code compact>{`-- (f a) @ r  is  PApp (TApp f a) r
-- lambda_ x . f x  has body  (f x)  not  (f) then  (x)
-- PI (x : A) . PI (y : B) . C  — right-associative binders`}</Code>
  </>;
}
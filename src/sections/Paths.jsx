import { IV, MU } from '../theme.js';
import { H1, H2, IC, P } from '../components/UI.jsx';
import { Code } from '../components/Code.jsx';

export function Paths() {
  return <>
    <H1>Path Types</H1>

    <H2>Path A u v</H2>
    <P>
      The path type <IC>Path A u v</IC> is the cubical analogue of propositional equality.
      It internalises the interval: a path is a function <IC color={IV}>𝕀 → A</IC> whose
      endpoints are definitionally <IC>u</IC> and <IC>v</IC>.
    </P>
    <Code>{`-- Formation: A : Un, u v : A
Path A u v    -- : Un

-- Introduction: path-lambda
{i} body      -- : Path A u v   when body@0 ≡ u, body@1 ≡ v

-- Elimination: path application
p @ r         -- : A   when p : Path A u v, r : 𝕀`}</Code>

    <H2>Reflexivity and congruence</H2>
    <Code>{`-- Refl: constant path
check refl : PI (A : U0) . PI (x : A) . Path A x x =
  lambda_ A . lambda_ x . {_} x

-- Cong / ap
check cong :
  PI (A : U0) . PI (B : U0) .
  PI (f : PI (_ : A) . B) .
  PI (x : A) . PI (y : A) .
  PI (p : Path A x y) . Path B (f x) (f y) =
    lambda_ A . lambda_ B . lambda_ f .
    lambda_ x . lambda_ y . lambda_ p .
    {i} f (p @ i)`}</Code>

    <H2>Function extensionality</H2>
    <P>
      Because paths are functions <IC color={IV}>𝕀 → A</IC>, funext is a theorem, not an
      axiom — the witness is literally <IC color={IV}>{'{i}'}</IC>{' '}
      <IC>lambda_ x . h x @ i</IC>.
    </P>
    <Code>{`check funext :
  PI (A : U0) . PI (B : U0) .
  PI (f : PI (_ : A) . B) .
  PI (g : PI (_ : A) . B) .
  PI (h : PI (x : A) . Path B (f x) (g x)) .
  Path (PI (_ : A) . B) f g =
    lambda_ A . lambda_ B . lambda_ f . lambda_ g . lambda_ h .
    {i} lambda_ x . h x @ i

-- happly (inverse direction)
check happly :
  PI (A : U0) . PI (B : U0) .
  PI (f : PI (_ : A) . B) . PI (g : PI (_ : A) . B) .
  PI (p : Path (PI (_ : A) . B) f g) .
  PI (x : A) . Path B (f x) (g x) =
    lambda_ A . lambda_ B . lambda_ f . lambda_ g .
    lambda_ p . lambda_ x . {i} p @ i x`}</Code>

    <H2>Endpoint reduction</H2>
    <P>
      Path application at <IC color={IV}>0</IC> or <IC color={IV}>1</IC> reduces to the
      corresponding endpoint. The type checker uses <IC>reducePAppByType</IC> for this,
      looking up the <IC>Path A u v</IC> type of <IC>p</IC> and returning <IC>u</IC> or{' '}
      <IC>v</IC>.
    </P>
    <Code>{`-- p : Path A x y
p @ 0    -- reduces to  x
p @ 1    -- reduces to  y

check path_at0 :
  PI (A : U0) . PI (x : A) . PI (y : A) . PI (p : Path A x y) .
  Path A x (p @ 0) =
    lambda_ A . lambda_ x . lambda_ y . lambda_ p . {_} x`}</Code>
  </>;
}
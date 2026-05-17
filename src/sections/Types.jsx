import { IV, KW, MU, TY, WARN } from '../theme.js';
import { H1, H2, IC, P } from '../components/UI.jsx';
import { Code } from '../components/Code.jsx';

export function Types() {
  return <>
    <H1>Type System</H1>

    <H2>Universe hierarchy</H2>
    <P>
      Octo has a predicative hierarchy <IC color={TY}>U0</IC> ⊂ <IC color={TY}>U1</IC> ⊂ …
      Type formation rules take the maximum of indices. <IC color={TY}>U0</IC> itself has
      type <IC color={TY}>U1</IC>.
    </P>
    <Code>{`-- Pi and Sigma take max of domain and codomain levels
PI (A : U0) . U0      -- : U1
SIGMA (x : U0) . U1   -- : U2

-- The interval type lives in U0
TIntervalTy            -- : U0`}</Code>

    <H2>Function types — Π</H2>
    <P>
      Dependent function types. Non-dependent functions use <IC>_</IC> as the binder name.
      Lambda has η-equality: <IC color={MU}>f ≡ λx.fx</IC> for any <IC>f : Π(x:A).B</IC>.
    </P>
    <Code>{`-- Formation
PI (x : A) . B x

-- Introduction
lambda_ x . body

-- Elimination
f a

-- η rule (checked automatically)
check eta : PI (A : U0) . PI (B : U0) . PI (f : PI (_ : A) . B) .
              PI (x : A) . Path B (f x) ((lambda_ y . f y) x) =
  lambda_ A . lambda_ B . lambda_ f . lambda_ x . {_} f x`}</Code>

    <H2>Sigma types — Σ</H2>
    <P>
      Dependent pairs. <IC color={KW}>pair a b</IC> requires a Σ type annotation at the
      check site. <IC color={KW}>fst</IC> / <IC color={KW}>snd</IC> are projections.
      Eta-equality holds: <IC color={MU}>p ≡ (fst p, snd p)</IC>.
    </P>
    <Code>{`-- Formation
SIGMA (x : A) . B x

-- Introduction  (requires type annotation)
check my_pair : SIGMA (x : U0) . U1 =
  pair U0 U1

-- Elimination
fst my_pair   -- : U0
snd my_pair   -- : U1

-- Sigma eta is checked automatically
check sigma_eta :
  PI (A : U0) . PI (B : U0) . PI (p : SIGMA (_ : A) . B) .
  Path (SIGMA (_ : A) . B) p (pair (fst p) (snd p)) =
    lambda_ A . lambda_ B . lambda_ p . {_} pair (fst p) (snd p)`}</Code>

    <H2>The interval — 𝕀</H2>
    <P>
      The interval type <IC color={IV}>TIntervalTy</IC> (written <IC color={IV}>𝕀</IC>)
      has two distinguished endpoints <IC color={IV}>0</IC> and <IC color={IV}>1</IC>.
      Interval expressions support meet <IC color={IV}>and</IC>, join <IC color={IV}>or</IC>,
      and negation <IC color={IV}>not_</IC>. They are normalised to Disjunctive Normal Form
      (DNF) at eval time.
    </P>
    <Code>{`TIntervalTy          -- : U0
0                    -- : 𝕀  (left endpoint)
1                    -- : 𝕀  (right endpoint)

-- In interval expressions (iExpr context):
i0 and i1            -- meet
i0 or (not_ i1)      -- join of negations
`}</Code>

    <H2>Eta-equality and fuel</H2>
    <P>
      The equality checker uses <em>sized eta-expansion</em>: starting fuel is proportional
      to the combined term size (≥ 16). Eta steps consume fuel; structural congruence steps
      do not. If fuel runs out the checker reports{' '}
      <IC color={WARN}>EtaFuelExhausted</IC> rather than a false mismatch.
    </P>
  </>;
}
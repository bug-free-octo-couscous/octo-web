import { ACC, BD, IV, KW, MU, SURF, TX, TY, WARN, mono } from '../theme.js';
import { H1, P, Pill } from '../components/UI.jsx';
import { Code } from '../components/Code.jsx';
import { useResponsive } from '../hooks/useResponsive.js';

const TAG_COLORS = { basic: ACC, paths: IV, sigma: TY, univalence: WARN, equiv: KW };

const EXAMPLES = [
  {
    title: 'Reflexivity',
    tag: 'basic',
    code: `check refl : PI (A : U0) . PI (x : A) . Path A x x =
  lambda_ A . lambda_ x . {_} x`,
    desc: 'The constant path proves propositional reflexivity. The path-lambda {_} ignores the interval variable.',
  },
  {
    title: 'Congruence (ap)',
    tag: 'basic',
    code: `check cong :
  PI (A : U0) . PI (B : U0) . PI (f : PI (_ : A) . B) .
  PI (x : A) . PI (y : A) . PI (p : Path A x y) .
  Path B (f x) (f y) =
    lambda_ A . lambda_ B . lambda_ f .
    lambda_ x . lambda_ y . lambda_ p .
    {i} f (p @ i)`,
    desc: 'Apply f under the path: take the path-lambda of f applied to p@i.',
  },
  {
    title: 'Function extensionality',
    tag: 'paths',
    code: `check funext :
  PI (A : U0) . PI (B : U0) .
  PI (f : PI (_ : A) . B) . PI (g : PI (_ : A) . B) .
  PI (h : PI (x : A) . Path B (f x) (g x)) .
  Path (PI (_ : A) . B) f g =
    lambda_ A . lambda_ B . lambda_ f . lambda_ g . lambda_ h .
    {i} lambda_ x . h x @ i`,
    desc: 'Funext is a theorem: the witness is ⟨i⟩ λx. h x @ i. No axiom needed.',
  },
  {
    title: 'Sigma eta',
    tag: 'sigma',
    code: `check sigma_eta :
  PI (A : U0) . PI (B : U0) .
  PI (p : SIGMA (_ : A) . B) .
  Path (SIGMA (_ : A) . B) p (pair (fst p) (snd p)) =
    lambda_ A . lambda_ B . lambda_ p . {_} pair (fst p) (snd p)`,
    desc: 'Every pair equals its projections re-paired. The type checker verifies this via η-equality on both components.',
  },
  {
    title: 'Swap is an involution',
    tag: 'sigma',
    code: `-- swap p = (snd p, fst p)
-- swap (swap p) = (fst p, snd p) ≡ p
check swap_invol :
  PI (A : U0) . PI (B : U0) .
  PI (p : SIGMA (_ : A) . B) .
  Path (SIGMA (_ : A) . B) p
       (pair (snd (pair (snd p) (fst p)))
             (fst (pair (snd p) (fst p)))) =
    lambda_ A . lambda_ B . lambda_ p . {_} p`,
    desc: 'pair/fst/snd compute definitionally so swap∘swap = id holds by refl.',
  },
  {
    title: 'Transport along ua',
    tag: 'univalence',
    code: `check transport_ua :
  PI (A : U0) . PI (B : U0) .
  PI (e : Equiv A B) . PI (x : A) .
  Path B (equivFwd e x) (transport (ua e) x) =
    lambda_ A . lambda_ B . lambda_ e . lambda_ x .
    {_} equivFwd e x`,
    desc: 'The computation rule of univalence: transporting along ua e is the same as applying the forward map.',
  },
  {
    title: 'Componentwise pair path',
    tag: 'sigma',
    code: `check pair_path :
  PI (A : U0) . PI (B : U0) .
  PI (a0 : A) . PI (a1 : A) .
  PI (b0 : B) . PI (b1 : B) .
  PI (p : Path A a0 a1) . PI (q : Path B b0 b1) .
  Path (SIGMA (_ : A) . B) (pair a0 b0) (pair a1 b1) =
    lambda_ A . lambda_ B . lambda_ a0 . lambda_ a1 .
    lambda_ b0 . lambda_ b1 . lambda_ p . lambda_ q .
    {i} pair (p @ i) (q @ i)`,
    desc: 'Two paths combine into a path of pairs by applying each pointwise.',
  },
  {
    title: 'Identity equivalence',
    tag: 'equiv',
    code: `def id_equiv : PI (A : U0) . Equiv A A =
  lambda_ A .
    mkEquiv A A
      (lambda_ x . x)
      (lambda_ x . x)
      (lambda_ a . {_} a)
      (lambda_ b . {_} b)`,
    desc: 'The identity function witnesses an equivalence with itself. Both homotopies are constant paths.',
  },
];

export function Examples() {
  const { isMobile } = useResponsive();

  return <>
    <H1>Examples</H1>
    <P>
      All examples below are taken from the test suite and pass the type checker.
      Tags indicate the primary feature demonstrated.
    </P>
    <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
      {Object.entries(TAG_COLORS).map(([tag, c]) => (
        <Pill key={tag} color={c}>{tag}</Pill>
      ))}
    </div>
    {EXAMPLES.map(({ title, tag, code, desc }) => (
      <div key={title} style={{
        background: SURF, border: `1px solid ${BD}`,
        borderRadius: 10, padding: isMobile ? '14px 14px' : '16px 20px',
        marginBottom: 20,
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8,
          flexWrap: 'wrap',
        }}>
          <span style={{ fontFamily: mono, fontSize: 15, color: TX }}>{title}</span>
          <Pill color={TAG_COLORS[tag] || ACC}>{tag}</Pill>
        </div>
        <Code compact>{code}</Code>
        <p style={{ color: MU, fontSize: 13.5, margin: '8px 0 0', lineHeight: 1.7 }}>
          {desc}
        </p>
      </div>
    ))}
  </>;
}
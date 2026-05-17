import { KW } from '../theme.js';
import { H1, H2, IC, P } from '../components/UI.jsx';
import { Code } from '../components/Code.jsx';

export function Equiv() {
  return <>
    <H1>Equivalences & Univalence</H1>

    <H2>The Equiv type</H2>
    <P>
      <IC>Equiv A B</IC> is the type of equivalences between <IC>A</IC> and <IC>B</IC>.
      An equivalence carries a forward function, a backward function, and two homotopies
      witnessing that the functions are inverse.
    </P>

    <H2>mkEquiv</H2>
    <P>Build an equivalence explicitly:</P>
    <Code>{`mkEquiv A B f g eta eps

-- f   : A → B          (forward)
-- g   : B → A          (backward)
-- eta : PI (a : A) . Path A a (g (f a))   (retraction)
-- eps : PI (b : B) . Path B (f (g b)) b   (section)

-- Example: identity equivalence
def id_equiv : PI (A : U0) . Equiv A A =
  lambda_ A .
    mkEquiv A A
      (lambda_ x . x)
      (lambda_ x . x)
      (lambda_ a . {_} a)
      (lambda_ b . {_} b)`}</Code>

    <H2>equivFwd</H2>
    <P>
      Apply the forward map of an equivalence. When the equivalence is a{' '}
      <IC color={KW}>mkEquiv</IC> with explicit forward function <IC>f</IC>, this
      reduces to <IC>f x</IC>:
    </P>
    <Code>{`check mkequiv_fwd :
  PI (A : U0) . PI (B : U0) .
  PI (f : PI (_ : A) . B) . PI (g : PI (_ : A) . B) .
  PI (eta : PI (a : A) . Path A a (g (f a))) .
  PI (eps : PI (b : B) . Path B (f (g b)) b) .
  PI (x : A) .
  Path B (f x) (equivFwd (mkEquiv A B f g eta eps) x) =
    lambda_ A . lambda_ B . lambda_ f . lambda_ g .
    lambda_ eta . lambda_ eps . lambda_ x . {_} f x`}</Code>

    <H2>Univalence — ua</H2>
    <P>
      <IC color={KW}>ua e</IC> converts an equivalence <IC>e : Equiv A B</IC> into a
      path <IC>Path U A B</IC> in the universe. Its computation rule is:{' '}
      <IC>transport (ua e) x ↦ equivFwd e x</IC>.
    </P>
    <Code>{`-- Type of ua
ua : Equiv A B → Path U A B

-- Using the identity equivalence to get refl in the universe
check ua_id : PI (A : U0) . Path U0 A A =
  lambda_ A . ua (id_equiv A)

-- The crucial computation rule (univalence axiom made computational)
check transport_ua :
  PI (A : U0) . PI (B : U0) .
  PI (e : Equiv A B) . PI (x : A) .
  Path B (equivFwd e x) (transport (ua e) x) =
    lambda_ A . lambda_ B . lambda_ e . lambda_ x . {_} equivFwd e x`}</Code>

    <H2>Glue types</H2>
    <P>
      <IC color={KW}>Glue A [phi] te</IC> is the underlying cubical primitive used to
      implement <IC color={KW}>ua</IC>. When <IC>phi=1</IC> it collapses to the domain
      of the equivalence; when <IC>phi=0</IC> it is just <IC>A</IC>.
    </P>
    <Code>{`Glue A [phi] te     -- type
glue [phi] t a      -- introduction
unglue [phi] te g   -- elimination`}</Code>
  </>;
}
import { useState } from "react";

const BG    = '#080c12';
const SURF  = '#0e1420';
const SURF2 = '#141d2e';
const SURF3 = '#1a2438';
const BD    = '#1f2e45';
const TX    = '#bfcfe8';
const MU    = '#4d6480';
const ACC   = '#38bdf8';
const KW    = '#fb923c';
const TY    = '#a78bfa';
const IV    = '#34d399';
const CM    = '#2d4a66';
const WARN  = '#fbbf24';

const mono = `'Cascadia Code','Fira Code','JetBrains Mono',monospace`;
const serif = `Georgia,'Times New Roman',serif`;

function tokenize(src) {
  const KWS = new Set(['lambda_','function','def','check','PI','SIGMA','Path',
    'Equiv','Glue','glue','unglue','transport','hcomp','ua','equivFwd',
    'mkEquiv','fst','snd','pair','TIntervalTy','and','or','not_']);
  const res = [];
  let i = 0;
  while (i < src.length) {
    if (src[i]==='-' && src[i+1]==='-') {
      let j = src.indexOf('\n',i); if(j<0) j=src.length;
      res.push({t:src.slice(i,j),c:CM}); i=j; continue;
    }
    if (/\s/.test(src[i])) {
      let j=i; while(j<src.length && /\s/.test(src[j])) j++;
      res.push({t:src.slice(i,j),c:TX}); i=j; continue;
    }
    if (src[i]==='{') {
      let j=src.indexOf('}',i);
      if(j>=0){res.push({t:src.slice(i,j+1),c:IV}); i=j+1; continue;}
    }
    if (src[i]==='@'){res.push({t:'@',c:IV}); i++; continue;}
    if (/[a-zA-Z_]/.test(src[i])) {
      let j=i; while(j<src.length && /[a-zA-Z0-9_']/.test(src[j])) j++;
      const w=src.slice(i,j);
      res.push({t:w, c: KWS.has(w)?KW : /^U\d+$/.test(w)?TY : TX});
      i=j; continue;
    }
    if ((src[i]==='0'||src[i]==='1') && (i+1>=src.length||!/[a-zA-Z0-9_]/.test(src[i+1]))){
      res.push({t:src[i],c:IV}); i++; continue;
    }
    res.push({t:src[i],c:MU}); i++;
  }
  return res;
}

function Code({children,compact=false}) {
  const tokens = tokenize(children);
  return (
    <pre style={{background:SURF2,border:`1px solid ${BD}`,borderRadius:8,
      padding:compact?'10px 14px':'16px 20px',fontFamily:mono,fontSize:13,
      lineHeight:1.75,overflowX:'auto',margin:'12px 0',color:TX,whiteSpace:'pre'}}>
      {tokens.map((tk,i)=><span key={i} style={{color:tk.c}}>{tk.t}</span>)}
    </pre>
  );
}

function IC({children,color=ACC}) {
  return <code style={{background:SURF2,border:`1px solid ${BD}`,borderRadius:4,
    padding:'1px 6px',fontFamily:mono,fontSize:'0.85em',color}}>{children}</code>;
}

function H1({children}) {
  return <h1 style={{fontFamily:serif,fontSize:30,fontWeight:400,color:TX,
    borderBottom:`2px solid ${ACC}`,paddingBottom:12,marginBottom:28,marginTop:0,
    letterSpacing:'-0.3px'}}>{children}</h1>;
}

function H2({children}) {
  return <h2 style={{fontFamily:serif,fontSize:20,fontWeight:400,color:ACC,
    marginTop:36,marginBottom:14,letterSpacing:'-0.2px'}}>{children}</h2>;
}

function P({children}) {
  return <p style={{color:MU,lineHeight:1.85,marginBottom:14,fontSize:14.5}}>{children}</p>;
}

function Pill({children,color=TY}) {
  return <span style={{background:color+'18',border:`1px solid ${color}44`,
    borderRadius:4,padding:'2px 8px',fontSize:12,color,fontFamily:mono,
    marginRight:4}}>{children}</span>;
}

function Note({children,kind='info'}) {
  const colors = {info:[ACC,'#0c1f2e'],warn:[WARN,'#1f1800']};
  const [c,bg] = colors[kind]||colors.info;
  return <div style={{background:bg,border:`1px solid ${c}33`,borderRadius:8,
    padding:'12px 16px',margin:'16px 0',fontSize:13.5,color:c,lineHeight:1.7}}>
    {children}
  </div>;
}

function Row({left,right,lc=TX}) {
  return <div style={{display:'grid',gridTemplateColumns:'200px 1fr',
    gap:'0 20px',padding:'8px 0',borderBottom:`1px solid ${BD}`}}>
    <code style={{fontFamily:mono,fontSize:13,color:lc}}>{left}</code>
    <span style={{color:MU,fontSize:13.5,lineHeight:1.7}}>{right}</span>
  </div>;
}

// ── Sections ──────────────────────────────────────────────────────────────────

function Overview() {
  return <>
    <H1>Octo — Cubical Type Theory</H1>
    <P>
      <strong style={{color:TX}}>Octo</strong> is a small, self-contained implementation of{' '}
      <em>Cubical Type Theory</em> in Haskell. It extends Martin-Löf type theory with an
      explicit <em>interval</em> object <IC color={IV}>𝕀</IC> and computable path types,
      giving a computational interpretation of Univalence and function extensionality.
    </P>

    <H2>Core features</H2>
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:24}}>
      {[
        ['Π / Σ types','Dependent functions and pairs with full η-equality'],
        ['Path types','Cubical equality  Path A u v  with endpoints'],
        ['hcomp','Homogeneous composition — the computational heart of HITs'],
        ['transport','Coercion along a path in a universe'],
        ['Equivalences','mkEquiv / Equiv / equivFwd with proof witnesses'],
        ['Univalence','ua : Equiv A B → Path U A B  computes on transport'],
        ['Interval algebra','∧  ∨  ¬  on the interval for face lattice'],
        ['Eta equality','η-expansion for Π, Σ, and Path at type checking'],
      ].map(([title,desc])=>(
        <div key={title} style={{background:SURF,border:`1px solid ${BD}`,
          borderRadius:8,padding:'14px 16px'}}>
          <div style={{fontFamily:mono,fontSize:13,color:ACC,marginBottom:6}}>{title}</div>
          <div style={{color:MU,fontSize:13,lineHeight:1.65}}>{desc}</div>
        </div>
      ))}
    </div>

    <H2>Architecture</H2>
    <P>The implementation is split across six modules:</P>
    {[
      ['Interval.hs','I — interval algebra, DNF representation, meet/join/neg'],
      ['Syntax.hs','Term — de Bruijn representation, shift / subst / beta'],
      ['Eval.hs','CBV evaluator — reduces to weak head + structural normal form'],
      ['Equality.hs','Eta-equality with fuel — handles η for Π, Σ, and Path'],
      ['TypeChecker.hs','Bidirectional type checker — infer + check with face lattice'],
      ['Env.hs','Global named environment — de Bruijn lifting of globals'],
    ].map(([mod,desc])=><Row key={mod} left={mod} right={desc} lc={KW}/>)}
    <div style={{height:16}}/>
  </>;
}

function QuickStart() {
  return <>
    <H1>Quick Start</H1>
    <H2>Running a file</H2>
    <P>Pass one or more <IC>.ctt</IC> files to the executable:</P>
    <Code>{`$ cabal build && cabal run octo -- test/comprehensive_tests.ctt`}</Code>
    <P>Each file is processed top-to-bottom. Statement types:</P>
    <Row left="def x : T = e"   right="Define x with explicit type T; adds x to the environment"/>
    <Row left="def x = e"       right="Define x with inferred type; adds x to the environment"/>
    <Row left="check label : T = e" right="Type-check e against T without binding (prints ✓ / ✗)"/>
    <Row left="<term>"          right="Infer the type of a bare term and print it"/>
    <div style={{height:12}}/>

    <H2>File format</H2>
    <Note>
      Blank lines separate statements. Lines whose first non-whitespace is{' '}
      <IC>--</IC> are comment-only and are <em>skipped</em> without acting as separators.
      Trailing <IC>--</IC> comments on content lines are stripped.
      A statement can span multiple lines — just don&apos;t leave a blank line in the middle.
    </Note>
    <Code>{`-- This is a comment (skipped entirely)
def id : PI (A : U0) . PI (_ : A) . A =
  lambda_ A . lambda_ x . x

-- Check a property without binding
check refl : PI (A : U0) . PI (x : A) . Path A x x =
  lambda_ A . lambda_ x . {_} x`}</Code>

    <H2>Variables and scoping</H2>
    <P>
      All variables introduced by <IC color={KW}>lambda_</IC>, <IC color={KW}>PI</IC>,{' '}
      <IC color={KW}>SIGMA</IC>, or path-lambda <IC color={IV}>{'{i}'}</IC> are locally
      bound. Globals defined with <IC color={KW}>def</IC> are visible in all subsequent
      statements by name. Internally everything is de Bruijn indices — the parser resolves
      names at parse time.
    </P>
    <Code>{`def A : U1 = U0        -- A is now a global

def test : A = U0      -- A resolves to U0, test : U0 succeeds? no — demo only
`}</Code>
  </>;
}

function Syntax() {
  return <>
    <H1>Syntax Reference</H1>
    <H2>Terms</H2>
    {[
      ['lambda_ x . body','Lambda abstraction  λx.body'],
      ['function x . body','Alias for lambda_'],
      ['f a','Function application  (left-associative)'],
      ['PI (x : A) . B','Dependent function type  Π(x:A).B'],
      ['SIGMA (x : A) . B','Dependent pair type  Σ(x:A).B'],
      ['pair a b','Pair constructor  (a,b) — requires Σ type annotation'],
      ['fst p','First projection'],
      ['snd p','Second projection'],
      ['{i} body','Path-lambda  ⟨i⟩body (interval abstraction)'],
      ['p @ r','Path application  p applied at interval r'],
      ['Path A u v','Path type from u to v over type A'],
      ['U0  U1  U2  …','Universe hierarchy'],
      ['0  1','Interval endpoints  (𝕀 constants)'],
      ['i0  i1  …','Interval variables (in iExpr context)'],
      ['and  or  not_','Interval meet ∧, join ∨, negation ¬'],
    ].map(([l,r])=><Row key={l} left={l} right={r}/>)}
    <div style={{height:16}}/>

    <H2>Cubical operations</H2>
    {[
      ['hcomp A [phi] tube base','Homogeneous composition at type A with partial tube'],
      ['transport p x','Transport x along path p : Path U A B'],
      ['Equiv A B','Equivalence type  A ≃ B'],
      ['mkEquiv A B f g eta eps','Build an equivalence from forward/backward/proofs'],
      ['equivFwd e x','Apply forward map of equivalence e to x'],
      ['ua e','Univalence: Equiv A B → Path U A B'],
      ['Glue A [phi] te','Glue type (for constructing ua)'],
      ['glue [phi] t a','Glue element introduction'],
      ['unglue [phi] te g','Glue element elimination'],
    ].map(([l,r])=><Row key={l} left={l} right={r}/>)}
    <div style={{height:16}}/>

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

function Types() {
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

function Paths() {
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

function Cubical() {
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
    <div style={{margin:'12px 0 20px'}}>
      {[
        ['Constant path','transport ({_} A) x  ↦  x  (identity)'],
        ['Pi path','transport ({i} PI(a:Ai).Bi) f  ↦  λa. transport (codomain) (f a0)'],
        ['Path path','transport ({i} Path (Ai) ui vi) q  ↦  ⟨j⟩ transport A (q@j)'],
        ['Sigma path','transport ({i} SIGMA(x:Ai).Bi) (a,b)  ↦  (a\', b\')'],
        ['ua transport','transport (ua e) x  ↦  equivFwd e x'],
      ].map(([k,v])=><Row key={k} left={k} right={v} lc={IV}/>)}
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

function Equiv() {
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

function Examples() {
  const items = [
    {
      title:'Reflexivity',
      tag:'basic',
      code:`check refl : PI (A : U0) . PI (x : A) . Path A x x =
  lambda_ A . lambda_ x . {_} x`,
      desc:'The constant path proves propositional reflexivity. The path-lambda {_} ignores the interval variable.'
    },
    {
      title:'Congruence (ap)',
      tag:'basic',
      code:`check cong :
  PI (A : U0) . PI (B : U0) . PI (f : PI (_ : A) . B) .
  PI (x : A) . PI (y : A) . PI (p : Path A x y) .
  Path B (f x) (f y) =
    lambda_ A . lambda_ B . lambda_ f .
    lambda_ x . lambda_ y . lambda_ p .
    {i} f (p @ i)`,
      desc:'Apply f under the path: take the path-lambda of f applied to p@i.'
    },
    {
      title:'Function extensionality',
      tag:'paths',
      code:`check funext :
  PI (A : U0) . PI (B : U0) .
  PI (f : PI (_ : A) . B) . PI (g : PI (_ : A) . B) .
  PI (h : PI (x : A) . Path B (f x) (g x)) .
  Path (PI (_ : A) . B) f g =
    lambda_ A . lambda_ B . lambda_ f . lambda_ g . lambda_ h .
    {i} lambda_ x . h x @ i`,
      desc:'Funext is a theorem: the witness is ⟨i⟩ λx. h x @ i. No axiom needed.'
    },
    {
      title:'Sigma eta',
      tag:'sigma',
      code:`check sigma_eta :
  PI (A : U0) . PI (B : U0) .
  PI (p : SIGMA (_ : A) . B) .
  Path (SIGMA (_ : A) . B) p (pair (fst p) (snd p)) =
    lambda_ A . lambda_ B . lambda_ p . {_} pair (fst p) (snd p)`,
      desc:'Every pair equals its projections re-paired. The type checker verifies this via η-equality on both components.'
    },
    {
      title:'Swap is an involution',
      tag:'sigma',
      code:`-- swap p = (snd p, fst p)
-- swap (swap p) = (fst p, snd p) ≡ p
check swap_invol :
  PI (A : U0) . PI (B : U0) .
  PI (p : SIGMA (_ : A) . B) .
  Path (SIGMA (_ : A) . B) p
       (pair (snd (pair (snd p) (fst p)))
             (fst (pair (snd p) (fst p)))) =
    lambda_ A . lambda_ B . lambda_ p . {_} p`,
      desc:'pair/fst/snd compute definitionally so swap∘swap = id holds by refl.'
    },
    {
      title:'Transport along ua',
      tag:'univalence',
      code:`check transport_ua :
  PI (A : U0) . PI (B : U0) .
  PI (e : Equiv A B) . PI (x : A) .
  Path B (equivFwd e x) (transport (ua e) x) =
    lambda_ A . lambda_ B . lambda_ e . lambda_ x .
    {_} equivFwd e x`,
      desc:'The computation rule of univalence: transporting along ua e is the same as applying the forward map.'
    },
    {
      title:'Componentwise pair path',
      tag:'sigma',
      code:`check pair_path :
  PI (A : U0) . PI (B : U0) .
  PI (a0 : A) . PI (a1 : A) .
  PI (b0 : B) . PI (b1 : B) .
  PI (p : Path A a0 a1) . PI (q : Path B b0 b1) .
  Path (SIGMA (_ : A) . B) (pair a0 b0) (pair a1 b1) =
    lambda_ A . lambda_ B . lambda_ a0 . lambda_ a1 .
    lambda_ b0 . lambda_ b1 . lambda_ p . lambda_ q .
    {i} pair (p @ i) (q @ i)`,
      desc:'Two paths combine into a path of pairs by applying each pointwise.'
    },
    {
      title:'Identity equivalence',
      tag:'equiv',
      code:`def id_equiv : PI (A : U0) . Equiv A A =
  lambda_ A .
    mkEquiv A A
      (lambda_ x . x)
      (lambda_ x . x)
      (lambda_ a . {_} a)
      (lambda_ b . {_} b)`,
      desc:'The identity function witnesses an equivalence with itself. Both homotopies are constant paths.'
    },
  ];

  const tagColors = {basic:ACC,paths:IV,sigma:TY,univalence:WARN,equiv:KW};

  return <>
    <H1>Examples</H1>
    <P>
      All examples below are taken from the test suite and pass the type checker.
      Tags indicate the primary feature demonstrated.
    </P>
    <div style={{display:'flex',gap:8,marginBottom:24,flexWrap:'wrap'}}>
      {Object.entries(tagColors).map(([tag,c])=>(
        <Pill key={tag} color={c}>{tag}</Pill>
      ))}
    </div>
    {items.map(({title,tag,code,desc})=>(
      <div key={title} style={{background:SURF,border:`1px solid ${BD}`,
        borderRadius:10,padding:'16px 20px',marginBottom:20}}>
        <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:8}}>
          <span style={{fontFamily:mono,fontSize:15,color:TX}}>{title}</span>
          <Pill color={tagColors[tag]||ACC}>{tag}</Pill>
        </div>
        <Code compact>{code}</Code>
        <p style={{color:MU,fontSize:13.5,margin:'8px 0 0',lineHeight:1.7}}>{desc}</p>
      </div>
    ))}
  </>;
}

// ── Navigation ──────────────────────────────────────────────────────────────

const NAV = [
  {id:'overview',  label:'Overview',       glyph:'◈'},
  {id:'quickstart',label:'Quick Start',    glyph:'▹'},
  {id:'syntax',    label:'Syntax',         glyph:'≋'},
  {id:'types',     label:'Type System',    glyph:'Π'},
  {id:'paths',     label:'Path Types',     glyph:'⟨⟩'},
  {id:'cubical',   label:'Cubical Ops',    glyph:'□'},
  {id:'equiv',     label:'Equivalences',   glyph:'≃'},
  {id:'examples',  label:'Examples',       glyph:'✓'},
];

const CONTENT = {
  overview:   <Overview/>,
  quickstart: <QuickStart/>,
  syntax:     <Syntax/>,
  types:      <Types/>,
  paths:      <Paths/>,
  cubical:    <Cubical/>,
  equiv:      <Equiv/>,
  examples:   <Examples/>,
};

export default function App() {
  const [active, setActive] = useState('overview');

  return (
    <div style={{display:'flex',minHeight:'100vh',background:BG,color:TX,
      fontFamily:mono,fontSize:14}}>

      {/* Sidebar */}
      <nav style={{width:220,flexShrink:0,background:SURF,
        borderRight:`1px solid ${BD}`,padding:'28px 0',
        position:'sticky',top:0,height:'100vh',overflowY:'auto'}}>

        {/* Logo */}
        <div style={{padding:'0 20px 24px',borderBottom:`1px solid ${BD}`}}>
          <div style={{fontSize:22,fontWeight:700,letterSpacing:2,color:ACC}}>
            octo
          </div>
          <div style={{fontSize:11,color:MU,marginTop:4,letterSpacing:1}}>
            CUBICAL TYPE THEORY
          </div>
        </div>

        {/* Nav items */}
        <ul style={{listStyle:'none',margin:'16px 0 0',padding:0}}>
          {NAV.map(({id,label,glyph})=>{
            const isActive = id===active;
            return (
              <li key={id}>
                <button onClick={()=>setActive(id)} style={{
                  width:'100%',textAlign:'left',background:'none',border:'none',
                  cursor:'pointer',padding:'10px 20px',
                  display:'flex',alignItems:'center',gap:10,
                  color: isActive ? ACC : MU,
                  borderLeft: isActive ? `2px solid ${ACC}` : '2px solid transparent',
                  fontSize:13.5,fontFamily:mono,
                  transition:'all 0.15s',
                }}
                  onMouseEnter={e=>{if(!isActive) e.target.style.color=TX;}}
                  onMouseLeave={e=>{if(!isActive) e.target.style.color=MU;}}
                >
                  <span style={{fontSize:14,opacity:0.8}}>{glyph}</span>
                  {label}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Footer */}
        <div style={{position:'absolute',bottom:0,left:0,right:0,
          padding:'16px 20px',borderTop:`1px solid ${BD}`}}>
          <div style={{fontSize:11,color:CM,lineHeight:1.6}}>
            <div style={{color:MU,marginBottom:2}}>octo v0.1.0</div>
            <div>GHC2024 · Haskell</div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main style={{flex:1,padding:'40px 52px',maxWidth:820,
        overflowY:'auto',minHeight:'100vh'}}>
        {CONTENT[active]}
      </main>
    </div>
  );
}
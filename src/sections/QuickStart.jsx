import { IV, KW } from '../theme.js';
import { H1, H2, IC, Note, P, Row } from '../components/UI.jsx';
import { Code } from '../components/Code.jsx';

export function QuickStart() {
  return <>
    <H1>Quick Start</H1>

    <H2>Running a file</H2>
    <P>Pass one or more <IC>.ctt</IC> files to the executable:</P>
    <Code>{`$ cabal build && cabal run octo -- test/comprehensive_tests.ctt`}</Code>
    <P>Each file is processed top-to-bottom. Statement types:</P>
    <Row left="def x : T = e"      right="Define x with explicit type T; adds x to the environment" />
    <Row left="def x = e"          right="Define x with inferred type; adds x to the environment" />
    <Row left="check label : T = e" right="Type-check e against T without binding (prints ✓ / ✗)" />
    <Row left="<term>"             right="Infer the type of a bare term and print it" />
    <div style={{ height: 12 }} />

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
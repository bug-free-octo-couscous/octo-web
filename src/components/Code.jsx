import { BD, CM, IV, KW, MU, SURF2, TX, TY, mono } from '../theme.js';

const KEYWORDS = new Set([
  'lambda_', 'function', 'def', 'check', 'PI', 'SIGMA', 'Path',
  'Equiv', 'Glue', 'glue', 'unglue', 'transport', 'hcomp', 'ua', 'equivFwd',
  'mkEquiv', 'fst', 'snd', 'pair', 'TIntervalTy', 'and', 'or', 'not_',
]);

function tokenize(src) {
  const res = [];
  let i = 0;

  while (i < src.length) {
    // Line comments
    if (src[i] === '-' && src[i + 1] === '-') {
      let j = src.indexOf('\n', i);
      if (j < 0) j = src.length;
      res.push({ t: src.slice(i, j), c: CM });
      i = j;
      continue;
    }

    // Whitespace
    if (/\s/.test(src[i])) {
      let j = i;
      while (j < src.length && /\s/.test(src[j])) j++;
      res.push({ t: src.slice(i, j), c: TX });
      i = j;
      continue;
    }

    // Braces (interval vars)
    if (src[i] === '{') {
      const j = src.indexOf('}', i);
      if (j >= 0) { res.push({ t: src.slice(i, j + 1), c: IV }); i = j + 1; continue; }
    }

    // @ operator
    if (src[i] === '@') { res.push({ t: '@', c: IV }); i++; continue; }

    // Identifiers and keywords
    if (/[a-zA-Z_]/.test(src[i])) {
      let j = i;
      while (j < src.length && /[a-zA-Z0-9_']/.test(src[j])) j++;
      const w = src.slice(i, j);
      res.push({ t: w, c: KEYWORDS.has(w) ? KW : /^U\d+$/.test(w) ? TY : TX });
      i = j;
      continue;
    }

    // Interval endpoints (0 / 1 not followed by alnum)
    if ((src[i] === '0' || src[i] === '1') &&
        (i + 1 >= src.length || !/[a-zA-Z0-9_]/.test(src[i + 1]))) {
      res.push({ t: src[i], c: IV });
      i++;
      continue;
    }

    // Everything else (punctuation / operators)
    res.push({ t: src[i], c: MU });
    i++;
  }

  return res;
}

export function Code({ children, compact = false }) {
  const tokens = tokenize(children);
  return (
    <pre style={{
      background: SURF2, border: `1px solid ${BD}`, borderRadius: 8,
      padding: compact ? '10px 14px' : '16px 20px',
      fontFamily: mono, fontSize: 13, lineHeight: 1.75,
      overflowX: 'auto', margin: '12px 0', color: TX, whiteSpace: 'pre',
    }}>
      {tokens.map((tk, i) => (
        <span key={i} style={{ color: tk.c }}>{tk.t}</span>
      ))}
    </pre>
  );
}
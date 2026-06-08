#!/usr/bin/env bash
# Smoke test for quidax-demo design system.
# Run from the repo root.
# Usage: bash .claude/skills/run-quidax-demo/smoke.sh [--serve]
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../../.." && pwd)"
PORT=8743

# ── 1. Validate CSS syntax ─────────────────────────────────────────────
echo "Validating CSS..."
node -e "
const fs = require('fs');
const files = [
  'src/styles/tokens.css',
  'src/styles/fonts.css',
  'src/styles/typography.css'
];
let ok = true;
files.forEach(f => {
  const content = fs.readFileSync('$ROOT/' + f, 'utf8');
  const open = (content.match(/{/g) || []).length;
  const close = (content.match(/}/g) || []).length;
  if (open !== close) { console.error('FAIL ' + f + ': unbalanced braces'); ok = false; }
  else console.log('OK   ' + f);
});
const tokenCount = fs.readFileSync('$ROOT/src/styles/tokens.css','utf8').match(/^  --/gm)?.length || 0;
console.log('     ' + tokenCount + ' tokens defined');
process.exit(ok ? 0 : 1);
"

# ── 2. Optionally start preview server ────────────────────────────────
if [[ "${1:-}" == "--serve" ]]; then
  echo ""
  echo "Starting preview server on http://127.0.0.1:$PORT"
  echo "Preview: http://127.0.0.1:$PORT/.claude/skills/run-quidax-demo/preview.html"
  echo "Press Ctrl-C to stop."
  cd "$ROOT"
  python3 -m http.server $PORT --bind 127.0.0.1
else
  # Headless: start server, curl-check assets, kill server
  cd "$ROOT"
  python3 -m http.server $PORT --bind 127.0.0.1 &>/tmp/quidax-preview.log &
  SERVER_PID=$!
  sleep 1

  echo ""
  echo "Checking assets..."
  FAIL=0
  for path in \
    ".claude/skills/run-quidax-demo/preview.html" \
    "src/styles/tokens.css" \
    "src/styles/typography.css" \
    "src/styles/fonts.css" \
    "public/fonts/Uncut%20Sans%20Variable.ttf"
  do
    CODE=$(curl -s -o /dev/null -w "%{http_code}" "http://127.0.0.1:$PORT/$path")
    if [[ "$CODE" == "200" ]]; then
      echo "OK   $path"
    else
      echo "FAIL $path ($CODE)"
      FAIL=1
    fi
  done

  kill $SERVER_PID 2>/dev/null || true

  if [[ $FAIL -eq 0 ]]; then
    echo ""
    echo "All checks passed."
  else
    echo ""
    echo "Some checks failed." >&2
    exit 1
  fi
fi

// Replays every report in bugs.json against utils.js and prints got vs expected.
// Run: node verify.mjs   (exit 0 only if EVERY report exposes a wrong result)
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const utils = require('./utils.js');
const bugs = JSON.parse(readFileSync('./bugs.json', 'utf8'));
let bad = 0;
for (const { fn, input, expected, note } of bugs) {
  const got = utils[fn](input);
  const exposes = JSON.stringify(got) !== JSON.stringify(expected);
  console.log(`${exposes ? 'BUG ' : 'OK  '} ${fn}(${JSON.stringify(input)}) => got ${JSON.stringify(got)}, expected ${JSON.stringify(expected)} — ${note}`);
  if (!exposes) bad++;
}
console.log(`\n${bugs.length - bad}/${bugs.length} reports expose a wrong result`);
process.exit(bad ? 1 : 0);

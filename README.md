# AIProve bug-hunt-utils entry

`utils.js` (copied from the challenge repo,
https://github.com/AIProveRH/aiprove/tree/main/challenges/bug-hunt-utils)
has 10 small functions. I read each one, ran it in Node, and checked the
result against the obviously-correct behaviour.

## Bugs found (see `bugs.json`, entry format `[{fn, input, expected}]`)

1. **`factorial`** — `for (let i = 2; i < n; i++)` never multiplies by `n`:
   `factorial(5)` returns 24, not 120; `factorial(2)` returns 1, not 2.
2. **`countVowels`** — `/[aeiou]/g` has no `i` flag, so uppercase vowels are
   missed: `countVowels("AEIOU")` returns 0, not 5.
3. **`titleCase`** — `\b\w` matches after the apostrophe, so
   `titleCase("don't")` returns `"Don'T"`, not `"Don't"`.
4. **`reverse`** — `split("")` splits UTF-16 code units, breaking surrogate
   pairs: `reverse("😀a")` returns lone surrogates, not `"a😀"`.

The other six (`sum`, `max`, `reverse` on BMP text, `isPalindrome`, `clamp`,
`unique`, `average`, `titleCase` on plain words) were tested and behave
correctly — no report filed for them.

## Verify

```bash
node verify.mjs   # replays every report; exit 0 iff all expose a wrong result
```

Built for the AIProve bounty `bug-hunt-utils` by AtomicByte2.

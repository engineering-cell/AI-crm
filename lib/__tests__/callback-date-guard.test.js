import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

// Prevention: callback days must come from lib/location-time.js (location timezone),
// never from slicing an ISO string or the browser's local midnight.
const ROOT = path.resolve(__dirname, '../..')
const SKIP = new Set(['node_modules', '.next', '__tests__', '.git'])

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP.has(e.name)) continue
    const p = path.join(dir, e.name)
    if (e.isDirectory()) walk(p, out)
    else if (/\.(js|jsx)$/.test(e.name)) out.push(p)
  }
  return out
}

const BAD = [
  /callbackDate[^\n]{0,60}\.slice\(\s*0\s*,\s*10\s*\)/,
  /new Date\([^)\n]*callbackDate[^)\n]*\)[^\n]{0,40}(setHours|getTime\(\)\s*<=?|<\s*new Date)/,
]

describe('callbackDate guard', () => {
  it('has no browser-timezone callback day derivations', () => {
    const hits = []
    for (const dir of ['app', 'lib', 'components']) {
      for (const f of walk(path.join(ROOT, dir))) {
        if (f.endsWith('location-time.js')) continue
        fs.readFileSync(f, 'utf8').split('\n').forEach((line, i) => {
          if (BAD.some((re) => re.test(line))) hits.push(`${path.relative(ROOT, f)}:${i + 1}`)
        })
      }
    }
    expect(hits).toEqual([])
  })
})

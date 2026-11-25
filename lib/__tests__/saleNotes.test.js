import { describe, it, expect } from 'vitest'
import { saleNotes } from '@/lib/saleNotes'

describe('saleNotes', () => {
  it('lists package and event notes, naming what was sold', () => {
    const notes = saleNotes(
      [{ _id: 'e1', createdAt: '2026-11-25', package: { packageName: 'Starter 5', notes: 'something' } }],
      [{ _id: 'p1', createdAt: '2026-11-20', name: 'Mini-Match', notes: 'two entries' }],
    )
    expect(notes.map((n) => [n.source, n.text])).toEqual([
      ['Package: Starter 5', 'something'],
      ['Event / product: Mini-Match', 'two entries'],
    ])
  })

  it('skips sales with no note', () => {
    expect(saleNotes([{ _id: 'e1', package: null }, { _id: 'e2', package: { notes: '   ' } }], [{ _id: 'p1', name: 'X' }])).toEqual([])
  })
})

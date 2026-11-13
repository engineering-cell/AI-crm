import { describe, expect, it } from 'vitest'
import { allocateLessonCoverage, bucketForStatus, formatLessonCount } from '../enrollment-coverage'

const lesson = (id, day, status) => ({ id, startDateTime: `2026-11-${String(day).padStart(2, '0')}T20:00:00Z`, status })

describe('allocateLessonCoverage', () => {
  it("Martin Clark: $870 collected covers 5 completed + the first scheduled lesson; 4 unpaid = $580", () => {
    const lessons = [
      lesson('c1', 2, 'completed'), lesson('c2', 3, 'completed'), lesson('c3', 4, 'completed'),
      lesson('c4', 5, 'completed'), lesson('c5', 11, 'completed'),
      lesson('s1', 18, 'scheduled'), lesson('s2', 19, 'scheduled'), lesson('s3', 24, 'scheduled'),
      lesson('s4', 25, 'scheduled'), lesson('s5', 26, 'scheduled'),
    ]
    const r = allocateLessonCoverage({ price: 145, funds: 870, lessons })
    expect(r.completed).toEqual({ unpaid: 0, partial: 0, gap: 0 })
    expect(r.scheduled).toEqual({ unpaid: 4, partial: 0, gap: 580 })
    expect(r.leftover).toBe(0)
    expect(r.rows.find((x) => x.id === 's1').state).toBe('paid')
    expect(r.rows.find((x) => x.id === 's2').state).toBe('unpaid')
  })

  it("Othene: all scheduled paid, $40 (0.28 of a lesson) left over", () => {
    const lessons = [
      lesson('c1', 1, 'completed'), lesson('c2', 2, 'completed'), lesson('c3', 3, 'completed'),
      lesson('s1', 18, 'scheduled'),
    ]
    const r = allocateLessonCoverage({ price: 145, funds: 620, lessons })
    expect(r.scheduled).toEqual({ unpaid: 0, partial: 0, gap: 0 })
    expect(r.leftover).toBe(40)
    expect(formatLessonCount(r.leftover / 145)).toBe('0.28')
  })

  it("Othene with 3 more scheduled lessons: one partially paid, two unpaid", () => {
    const lessons = [
      lesson('c1', 1, 'completed'), lesson('c2', 2, 'completed'), lesson('c3', 3, 'completed'),
      lesson('s1', 18, 'scheduled'), lesson('s2', 19, 'scheduled'), lesson('s3', 20, 'scheduled'), lesson('s4', 21, 'scheduled'),
    ]
    const r = allocateLessonCoverage({ price: 145, funds: 620, lessons })
    expect(r.scheduled.partial).toBe(1)
    expect(r.scheduled.unpaid).toBe(2)
    expect(r.scheduled.gap).toBe(105 + 145 + 145)
    expect(r.leftover).toBe(0)
  })

  it('completed lessons are paid for before scheduled ones, whatever the dates', () => {
    const r = allocateLessonCoverage({
      price: 100,
      funds: 100,
      lessons: [lesson('s', 1, 'scheduled'), lesson('c', 20, 'completed')],
    })
    expect(r.rows.find((x) => x.id === 'c').state).toBe('paid')
    expect(r.rows.find((x) => x.id === 's').state).toBe('unpaid')
  })

  it('flags unpaid completed lessons separately from scheduled ones', () => {
    const r = allocateLessonCoverage({
      price: 145,
      funds: 200,
      lessons: [lesson('c1', 1, 'completed'), lesson('c2', 2, 'completed'), lesson('s1', 9, 'scheduled')],
    })
    expect(r.completed).toEqual({ unpaid: 0, partial: 1, gap: 90 })
    expect(r.scheduled).toEqual({ unpaid: 1, partial: 0, gap: 145 })
  })

  it('a fully paid package covers everything and leaves no leftover to report', () => {
    const r = allocateLessonCoverage({
      price: 145,
      funds: 0,
      fullyPaid: true,
      lessons: [lesson('c1', 1, 'completed'), lesson('s1', 9, 'scheduled')],
    })
    expect(r.rows.every((x) => x.state === 'paid')).toBe(true)
    expect(r.scheduled.gap).toBe(0)
  })

  it('imported sessions with no dated lesson use up funds first', () => {
    const r = allocateLessonCoverage({ price: 100, funds: 300, untracked: 2, lessons: [lesson('s1', 9, 'scheduled'), lesson('s2', 10, 'scheduled')] })
    expect(r.rows.map((x) => x.state)).toEqual(['paid', 'unpaid'])
  })

  it('ignores lessons nobody owes for', () => {
    const r = allocateLessonCoverage({
      price: 145,
      funds: 0,
      lessons: [lesson('x', 1, 'cancelled_no_charge'), lesson('y', 2, 'no_show_no_charge')],
    })
    expect(r.rows).toEqual([])
    expect(bucketForStatus('cancelled_charged')).toBe('completed')
  })
})

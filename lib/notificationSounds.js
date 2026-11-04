/**
 * Incoming-call tones for the human queue. Settings preview uses playIncomingRing;
 * the global alert uses startIncomingRingLoop / stopIncomingRingLoop.
 */

let sharedCtx = null
let loopTimer = null
let unlocked = false

function getAudioContext() {
  if (typeof window === 'undefined') return null
  const Ctx = window.AudioContext || window.webkitAudioContext
  if (!Ctx) return null
  if (!sharedCtx || sharedCtx.state === 'closed') {
    sharedCtx = new Ctx()
  }
  return sharedCtx
}

/** Resume AudioContext after a user gesture so browsers allow sound. */
function ensureAudioUnlocked() {
  if (typeof window === 'undefined' || unlocked) return
  const ctx = getAudioContext()
  if (!ctx) return
  const resume = () => {
    ctx.resume?.().catch(() => {})
    unlocked = true
    window.removeEventListener('pointerdown', resume)
    window.removeEventListener('keydown', resume)
  }
  if (ctx.state === 'running') {
    unlocked = true
    return
  }
  window.addEventListener('pointerdown', resume, { once: true })
  window.addEventListener('keydown', resume, { once: true })
}

if (typeof window !== 'undefined') {
  ensureAudioUnlocked()
}

/**
 * Loud telephone double-ring. Used for settings preview and each loop tick.
 * Two tones at once (440 + 480 Hz) so it cuts through better than a soft beep.
 */
export function playIncomingRing() {
  if (typeof window === 'undefined') return
  try {
    const ctx = getAudioContext()
    if (!ctx) return
    ctx.resume?.().catch(() => {})

    const now = ctx.currentTime
    const playBurst = (startOffset) => {
      const t0 = now + startOffset
      const duration = 0.45
      const master = ctx.createGain()
      master.connect(ctx.destination)
      master.gain.setValueAtTime(0.0001, t0)
      master.gain.exponentialRampToValueAtTime(1, t0 + 0.012)
      master.gain.setValueAtTime(1, t0 + duration - 0.05)
      master.gain.exponentialRampToValueAtTime(0.0001, t0 + duration)

      ;[440, 480].forEach((freq) => {
        const oscillator = ctx.createOscillator()
        const tone = ctx.createGain()
        oscillator.type = 'triangle'
        oscillator.frequency.value = freq
        tone.gain.value = 0.72
        oscillator.connect(tone)
        tone.connect(master)
        oscillator.start(t0)
        oscillator.stop(t0 + duration + 0.02)
      })
    }

    playBurst(0)
    playBurst(0.58)
  } catch {
    // audio not available
  }
}

/** Repeat the incoming ring until stopIncomingRingLoop is called. */
export function startIncomingRingLoop() {
  if (typeof window === 'undefined') return
  ensureAudioUnlocked()
  stopIncomingRingLoop()
  playIncomingRing()
  loopTimer = setInterval(() => {
    playIncomingRing()
  }, 1300)
}

export function stopIncomingRingLoop() {
  if (loopTimer) {
    clearInterval(loopTimer)
    loopTimer = null
  }
}

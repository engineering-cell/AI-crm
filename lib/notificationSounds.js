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
 * Two audible beeps (phone-style). Used for settings preview and each loop tick.
 */
export function playIncomingRing() {
  if (typeof window === 'undefined') return
  try {
    const ctx = getAudioContext()
    if (!ctx) return
    ctx.resume?.().catch(() => {})

    const now = ctx.currentTime
    const playBeep = (startOffset, freq) => {
      const oscillator = ctx.createOscillator()
      const gain = ctx.createGain()
      oscillator.connect(gain)
      gain.connect(ctx.destination)
      oscillator.type = 'sine'
      oscillator.frequency.value = freq
      const t0 = now + startOffset
      gain.gain.setValueAtTime(0.0001, t0)
      gain.gain.exponentialRampToValueAtTime(0.45, t0 + 0.02)
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.28)
      oscillator.start(t0)
      oscillator.stop(t0 + 0.3)
    }

    playBeep(0, 880)
    playBeep(0.35, 988)
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
  }, 1800)
}

export function stopIncomingRingLoop() {
  if (loopTimer) {
    clearInterval(loopTimer)
    loopTimer = null
  }
}

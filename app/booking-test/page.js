'use client'

import { useEffect, useState } from 'react'
import { getApiBaseUrl } from '@/lib/api'

const SCRIPT_ID = 'cadance-booking-widget'

/** The widget's own attributes, from the link the embed dialog builds. */
export function widgetAttrs(search) {
  const params = new URLSearchParams(search)
  const attrs = { 'data-location': params.get('location') || '' }
  ;['tag', 'accent', 'bg', 'text', 'font', 'theme'].forEach((key) => {
    if (params.get(key)) attrs[`data-${key}`] = params.get(key)
  })
  if (params.get('headingFont')) attrs['data-heading-font'] = params.get('headingFont')
  return attrs
}

/**
 * A pretend studio website with the real widget on it, to try the whole flow as a visitor
 * would. It's served from the CRM rather than the API, so like a real studio's site it
 * talks to the API across origins. It is deliberately not a preview: bookings are real.
 */
export default function BookingTestPage() {
  const [attrs, setAttrs] = useState(null)

  useEffect(() => {
    setAttrs(widgetAttrs(window.location.search))
  }, [])

  const hasLocation = Boolean(attrs?.['data-location'])

  useEffect(() => {
    if (!hasLocation) return
    if (window.CadanceBooking) {
      window.CadanceBooking.autoInit()
      return
    }
    if (document.getElementById(SCRIPT_ID)) return
    const script = document.createElement('script')
    script.id = SCRIPT_ID
    // Fresh every load: this page is for trying changes, and widget.js is cached for 5 minutes.
    script.src = `${getApiBaseUrl()}/public/booking/widget.js?v=${Date.now()}`
    script.async = true
    document.body.appendChild(script)
  }, [hasLocation])

  return (
    <div style={{ minHeight: '100vh', background: '#faf8f5', color: '#26211c', fontFamily: 'Georgia, "Times New Roman", serif' }}>
      <p style={{ margin: 0, padding: '10px 16px', background: '#26211c', color: '#faf8f5', fontFamily: 'system-ui, sans-serif', fontSize: 13, textAlign: 'center' }}>
        Test page. The widget below is live: it sends real texts and makes real bookings and payments.
      </p>

      <header style={{ maxWidth: 960, margin: '0 auto', padding: '56px 24px 40px' }}>
        <p style={{ margin: 0, fontSize: 13, letterSpacing: '.14em', textTransform: 'uppercase', color: '#8a7a68' }}>Your studio website</p>
        <h1 style={{ margin: '12px 0 14px', fontSize: 'clamp(34px, 6vw, 54px)', lineHeight: 1.1, fontWeight: 400 }}>Dance is for everybody.</h1>
        <p style={{ margin: 0, maxWidth: 560, fontSize: 18, lineHeight: 1.55, color: '#5d5347' }}>
          Friendly group classes for every level. Pick a class, book it in under a minute, and we&apos;ll see you on the floor.
        </p>
      </header>

      <main style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px 72px' }}>
        <h2 style={{ margin: '0 0 18px', fontSize: 26, fontWeight: 400 }}>Group classes</h2>
        {attrs && !hasLocation && (
          <p style={{ fontFamily: 'system-ui, sans-serif', fontSize: 15, color: '#5d5347' }}>
            No location chosen. Open this page from Group classes → Website embed → Open test page.
          </p>
        )}
        {hasLocation && <div data-cadance-booking="" {...attrs} />}
      </main>
    </div>
  )
}

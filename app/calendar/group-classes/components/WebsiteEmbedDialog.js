'use client'

import { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import api, { getApiBaseUrl } from '@/lib/api'
import { getEffectiveBranch } from '@/lib/auth'
import { toast } from '@/components/ui/toast'

const FORMATS = [
  {
    id: 'script',
    label: 'Website code',
    help: 'Recommended. In WordPress: edit the page, add a "Custom HTML" block and paste this. In Wix, Squarespace or Webflow: add an "Embed" or "Custom code" block.',
  },
  {
    id: 'iframe',
    label: 'iFrame',
    help: "For site builders that remove scripts. Bookings work the same; the frame has a fixed height, so adjust it to fit your page.",
  },
  {
    id: 'link',
    label: 'Direct link',
    help: 'No website needed. Share it from a button, your Instagram bio or an email.',
  },
]

const LIGHT = { bg: '#ffffff', text: '#1f1421' }
const DARK = { bg: '#1c1120', text: '#fbf6ee' }

const SYSTEM_FONTS = ['Arial', 'Georgia', 'Helvetica', 'Times New Roman', 'Verdana']
// Keep in step with WEB_FONTS in the backend's classBookingWidget.js, which loads these.
const WEB_FONTS = ['Fraunces', 'Inter', 'Lato', 'Lora', 'Montserrat', 'Nunito', 'Open Sans', 'Playfair Display', 'Poppins', 'Raleway', 'Roboto']
const CUSTOM_FONT = '__custom'

function luminance(hex) {
  const channel = (i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  }
  return 0.2126 * channel(1) + 0.7152 * channel(3) + 0.0722 * channel(5)
}

/** WCAG contrast of two #rrggbb colours: 4.5 is the usual floor for body text. */
export function contrastRatio(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

const isDark = (bg) => luminance(bg) < 0.2

/**
 * The snippet a studio pastes on its own website. A single location gets a plain schedule;
 * several get a branch picker on the same widget, so one page can serve every studio.
 * The default colours are left out, so an untouched embed stays short and blends in.
 */
export function buildEmbed({ base, format, locationIds, tag, accent, bg = LIGHT.bg, text = LIGHT.text, font = '', headingFont = '' }) {
  if (!locationIds.length) return ''
  const [first] = locationIds
  const dark = isDark(bg)
  const defaults = dark ? DARK : LIGHT
  const customBg = bg !== defaults.bg ? bg : ''
  const customText = text !== defaults.text ? text : ''
  const pageParams = [
    accent ? `accent=${encodeURIComponent(accent)}` : '',
    customBg ? `bg=${encodeURIComponent(customBg)}` : '',
    customText ? `text=${encodeURIComponent(customText)}` : '',
    font ? `font=${encodeURIComponent(font)}` : '',
    headingFont ? `headingFont=${encodeURIComponent(headingFont)}` : '',
    dark ? 'theme=dark' : '',
  ].filter(Boolean).join('&')
  const page = `${base}/page/${first}${pageParams ? `?${pageParams}` : ''}`

  if (format === 'link') return page
  if (format === 'iframe') {
    // allow="payment": Apple Pay and Google Pay won't run inside an iframe without it.
    return `<iframe src="${page}" title="Book a class" allow="payment" style="width:100%;height:640px;border:0" loading="lazy"></iframe>`
  }
  const attrs = [
    `data-location="${locationIds.join(',')}"`,
    tag ? `data-tag="${tag.replace(/"/g, '&quot;')}"` : '',
    accent ? `data-accent="${accent}"` : '',
    customBg ? `data-bg="${customBg}"` : '',
    customText ? `data-text="${customText}"` : '',
    font ? `data-font="${font.replace(/"/g, '&quot;')}"` : '',
    headingFont ? `data-heading-font="${headingFont.replace(/"/g, '&quot;')}"` : '',
    dark ? 'data-theme="dark"' : '',
  ].filter(Boolean).join(' ')
  return `<div data-cadance-booking ${attrs}></div>\n<script src="${base}/widget.js" async></script>`
}

/**
 * A page for the preview frame, built from the same snippet a studio pastes so the two
 * can't drift. data-preview stops the widget at the phone step: no codes, no held seats.
 * The ?preview query dodges a browser-cached widget.js from before it knew that flag.
 */
export function buildPreviewDoc({ base, locationIds, tag, accent, bg, text, font, headingFont }) {
  const snippet = buildEmbed({ base, format: 'script', locationIds, tag, accent, bg, text, font, headingFont })
  if (!snippet) return ''
  const body = snippet
    .replace('<div data-cadance-booking ', '<div data-cadance-booking data-preview ')
    .replace('/widget.js"', '/widget.js?preview=3"')
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{margin:0;padding:16px;background:#f4f4f5;font-family:system-ui,-apple-system,"Segoe UI",sans-serif}</style></head><body>${body}</body></html>`
}

/** Link to the pretend studio site with these same settings, for trying the live flow. */
export function buildTestPageUrl({ locationIds, tag, accent, bg = LIGHT.bg, text = LIGHT.text, font = '', headingFont = '' }) {
  if (!locationIds.length) return ''
  const defaults = isDark(bg) ? DARK : LIGHT
  const params = new URLSearchParams({ location: locationIds.join(',') })
  if (tag) params.set('tag', tag)
  if (accent) params.set('accent', accent)
  if (bg !== defaults.bg) params.set('bg', bg)
  if (text !== defaults.text) params.set('text', text)
  if (font) params.set('font', font)
  if (headingFont) params.set('headingFont', headingFont)
  if (isDark(bg)) params.set('theme', 'dark')
  return `/booking-test?${params}`
}

/**
 * Address of the plain-text instructions an AI assistant needs to write this studio's embed.
 * Public and read-only: it holds the option list and the studio's location id, nothing else.
 */
export function buildAiGuideUrl({ apiBase, locationId }) {
  if (!apiBase) return ''
  return `${apiBase}/public/embed/llms.txt${locationId ? `?location=${encodeURIComponent(locationId)}` : ''}`
}

/**
 * Text to paste into ChatGPT, Claude or any assistant: the instructions, the studio's other
 * locations when there are several, and a line to finish with the owner's own request.
 */
export function buildAiPrompt({ guide, locations = [] }) {
  const extra = locations.length > 1
    ? `\n\nThis studio has several locations (use data-location="id1,id2" to show them together):\n${locations.map((l) => `- ${l.name}: ${l._id}`).join('\n')}`
    : ''
  return `${guide.trim()}${extra}\n\n---\nWhat I want my booking widget to look like: `
}

/**
 * Which locations the embed starts with, so nobody has to tick the one they are already in.
 * The CRM's active location wins; "All Branches" (superadmin, nothing chosen) starts with every
 * location, which the widget shows as a branch menu; an active id that isn't in the list
 * (a closed branch, say) falls back to the first one rather than an empty embed.
 */
export function defaultLocationIds({ locations, activeBranch }) {
  if (!locations.length) return []
  if (!activeBranch) return locations.map((l) => l._id)
  return locations.some((l) => l._id === activeBranch) ? [activeBranch] : [locations[0]._id]
}

/** Copy-paste embed that lets visitors see this studio's classes and book them on its own website. */
export default function WebsiteEmbedDialog({ open, onClose }) {
  const [locations, setLocations] = useState([])
  const [selected, setSelected] = useState([])
  // Once the owner ticks a box themselves, stop re-applying the default for this opening.
  const [picked, setPicked] = useState(false)
  const [tag, setTag] = useState('')
  const [accent, setAccent] = useState('#a8155f')
  const [bg, setBg] = useState(LIGHT.bg)
  const [text, setText] = useState(LIGHT.text)
  const [fontChoice, setFontChoice] = useState('')
  const [customFont, setCustomFont] = useState('')
  const [headingFont, setHeadingFont] = useState('')
  const [format, setFormat] = useState('script')
  const [previewDoc, setPreviewDoc] = useState('')
  const [previewSize, setPreviewSize] = useState('desktop')

  useEffect(() => {
    if (!open || locations.length) return
    api.get('/api/location?limit=200').then((res) => {
      if (!res.success || !Array.isArray(res.data)) return
      // Same rule as the top-bar switcher: closed locations aren't offered.
      setLocations(res.data.filter((l) => l.status?.toLowerCase() !== 'inactive'))
    })
  }, [open, locations.length])

  // Start from the location the user is already working in, each time the dialog opens.
  useEffect(() => {
    if (open) setPicked(false)
  }, [open])
  useEffect(() => {
    if (!open || picked || !locations.length) return
    setSelected(defaultLocationIds({ locations, activeBranch: getEffectiveBranch() }))
  }, [open, picked, locations])

  function toggleLocation(id) {
    setPicked(true)
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  // Keep the studio's list order, whatever order the boxes were ticked in.
  const locationIds = locations.map((l) => l._id).filter((id) => selected.includes(id))
  const font = fontChoice === CUSTOM_FONT ? customFont.trim() : fontChoice
  const hardToRead = contrastRatio(bg, text) < 4.5
  // 3 is the floor for large text: the button colour also colours headings and outline buttons.
  const accentFaint = contrastRatio(bg, accent) < 3
  const snippet = buildEmbed({
    base: `${getApiBaseUrl()}/public/booking`,
    format,
    locationIds: format === 'script' ? locationIds : locationIds.slice(0, 1),
    tag: tag.trim(),
    accent,
    bg,
    text,
    font,
    headingFont,
  })
  const onlyFirstLocation = format !== 'script' && locationIds.length > 1
  const activeFormat = FORMATS.find((f) => f.id === format)

  // Shows what the chosen format actually gives: iframe and link cover one location, no tag.
  const nextPreview = buildPreviewDoc({
    base: `${getApiBaseUrl()}/public/booking`,
    locationIds: format === 'script' ? locationIds : locationIds.slice(0, 1),
    tag: format === 'script' ? tag.trim() : '',
    accent,
    bg,
    text,
    font,
    headingFont,
  })
  const testPageUrl = buildTestPageUrl({
    locationIds: format === 'script' ? locationIds : locationIds.slice(0, 1),
    tag: format === 'script' ? tag.trim() : '',
    accent,
    bg,
    text,
    font,
    headingFont,
  })
  // Each change reloads the frame, so wait for typing and colour dragging to settle.
  useEffect(() => {
    const timer = setTimeout(() => setPreviewDoc(nextPreview), previewDoc ? 400 : 0)
    return () => clearTimeout(timer)
  }, [nextPreview, previewDoc])

  async function copy() {
    try {
      await navigator.clipboard.writeText(snippet)
      toast.success('Embed code copied')
    } catch {
      toast.error('Could not copy — select the code and copy it manually')
    }
  }

  const aiGuideUrl = buildAiGuideUrl({ apiBase: getApiBaseUrl(), locationId: locationIds[0] })
  const chosenLocations = locations.filter((l) => locationIds.includes(l._id))

  // Fetched with a plain request, not the CRM api client, so the CRM login token is never sent.
  // Many assistants can't open links, so the full text is copied rather than just the address.
  async function copyAiInstructions() {
    try {
      const res = await fetch(aiGuideUrl, { credentials: 'omit' })
      if (!res.ok) throw new Error(`status ${res.status}`)
      const prompt = buildAiPrompt({ guide: await res.text(), locations: chosenLocations })
      await navigator.clipboard.writeText(prompt)
      toast.success('AI instructions copied — paste them into ChatGPT or any AI assistant')
    } catch {
      toast.error('Could not copy the instructions. Open the instructions page and copy the text from there.')
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="6xl">
      <DialogContent onClose={onClose}>
        <DialogHeader>
          <DialogTitle>Book classes on your website</DialogTitle>
          <DialogDescription>
            Visitors see your published classes, verify their mobile number, then use a class credit or pay.
            It updates by itself as your schedule changes.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-2 lg:grid-cols-2">
        <div className="min-w-0 space-y-4">
          <div className="space-y-1.5">
            <Label>{locations.length > 1 ? 'Locations' : 'Location'}</Label>
            {locations.length === 1 ? (
              // Nothing to choose: the embed is for the only location.
              <p className="text-sm text-foreground">{locations[0].name}</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {locations.map((l) => (
                  <label
                    key={l._id}
                    className="flex cursor-pointer items-center gap-2 rounded-md border border-input bg-background px-3 py-1.5 text-sm text-foreground"
                  >
                    <input type="checkbox" checked={selected.includes(l._id)} onChange={() => toggleLocation(l._id)} />
                    {l.name}
                  </label>
                ))}
              </div>
            )}
            {locations.length > 1 && !picked && locationIds.length > 0 && (
              <p className="text-[11px] text-muted-foreground">
                {locationIds.length === locations.length
                  ? 'Showing all your locations. Untick any you don’t want.'
                  : 'Set to the location you’re working in. Tick more to add them.'}
              </p>
            )}
            {locationIds.length > 1 && format === 'script' && (
              <p className="text-[11px] text-muted-foreground">Visitors pick their location from a menu on the schedule.</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="we-tag">Only classes tagged <span className="font-normal text-muted-foreground">(optional)</span></Label>
            <Input id="we-tag" value={tag} onChange={(e) => setTag(e.target.value)} placeholder="e.g. Latin" disabled={format !== 'script'} />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between gap-3">
              <Label>Colours</Label>
              <div className="flex gap-1" role="group" aria-label="Colour presets">
                {[['Light', LIGHT], ['Dark', DARK]].map(([label, preset]) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => { setBg(preset.bg); setText(preset.text) }}
                    className="rounded-md px-2.5 py-1 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                ['we-accent', 'Buttons', accent, setAccent],
                ['we-bg', 'Background', bg, setBg],
                ['we-text', 'Text', text, setText],
              ].map(([id, label, value, onChange]) => (
                <div key={id} className="space-y-1">
                  <label htmlFor={id} className="text-xs text-muted-foreground">{label}</label>
                  <input
                    id={id}
                    type="color"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="h-9 w-full cursor-pointer rounded-md border border-input bg-background p-1"
                  />
                </div>
              ))}
            </div>
            {hardToRead && (
              <p className="text-[11px] text-amber-600 dark:text-amber-400">
                This text may be hard to read on this background. Try a lighter or darker colour.
              </p>
            )}
            {accentFaint && (
              <p className="text-[11px] text-amber-600 dark:text-amber-400">
                The button colour also colours headings and the waitlist button, and may be hard to see on this background.
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="we-font">Body font</Label>
            <select
              id="we-font"
              value={fontChoice}
              onChange={(e) => setFontChoice(e.target.value)}
              className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground"
            >
              <option value="">Same as my website</option>
              <optgroup label="Standard fonts">
                {SYSTEM_FONTS.map((f) => <option key={f} value={f}>{f}</option>)}
              </optgroup>
              <optgroup label="Google Fonts">
                {WEB_FONTS.map((f) => <option key={f} value={f}>{f}</option>)}
              </optgroup>
              <option value={CUSTOM_FONT}>Another font on my website…</option>
            </select>
            {fontChoice === CUSTOM_FONT && (
              <Input
                aria-label="Font name"
                value={customFont}
                onChange={(e) => setCustomFont(e.target.value)}
                placeholder="Exact font name, e.g. Avenir Next"
              />
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="we-heading-font">Heading font</Label>
            <select
              id="we-heading-font"
              value={headingFont}
              onChange={(e) => setHeadingFont(e.target.value)}
              className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground"
            >
              <option value="">Same as body font</option>
              <optgroup label="Standard fonts">
                {SYSTEM_FONTS.map((f) => <option key={f} value={f}>{f}</option>)}
              </optgroup>
              <optgroup label="Google Fonts">
                {WEB_FONTS.map((f) => <option key={f} value={f}>{f}</option>)}
              </optgroup>
            </select>
          </div>

          <div className="space-y-2">
            <div className="flex gap-1 border-b border-border" role="tablist" aria-label="Embed format">
              {FORMATS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  role="tab"
                  aria-selected={format === f.id}
                  onClick={() => setFormat(f.id)}
                  className={`-mb-px border-b-2 px-3 py-1.5 text-xs font-medium ${format === f.id ? 'border-brand text-brand' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-muted-foreground">{activeFormat.help}</p>
            <pre
              aria-label="Embed code"
              className="max-h-64 overflow-auto whitespace-pre-wrap break-all rounded-lg border border-border bg-muted/40 p-3 text-[11px] leading-relaxed text-foreground"
            >{snippet || (locations.length ? 'Choose at least one location.' : 'Loading…')}</pre>
            {onlyFirstLocation && (
              <p className="text-[11px] text-amber-600 dark:text-amber-400">
                This format covers one location, so it uses the first one ticked. Use Website code for a location menu, or copy one per page.
              </p>
            )}
          </div>

          <div className="flex justify-end">
            <Button onClick={copy} disabled={!snippet} className="bg-brand text-brand-foreground hover:bg-brand-dark">
              {format === 'link' ? 'Copy link' : 'Copy code'}
            </Button>
          </div>

          <div className="space-y-2 rounded-lg border border-border p-3">
            <Label>Customise with ChatGPT or another AI</Label>
            <p className="text-[11px] text-muted-foreground">
              Copy these instructions into ChatGPT, Claude or any AI assistant, then describe the look you want.
              It will write the code to paste on your website. Only your location ID is included, nothing private.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button type="button" variant="outline" size="sm" onClick={copyAiInstructions} disabled={!aiGuideUrl || !locationIds.length}>
                Copy AI instructions
              </Button>
              {aiGuideUrl && locationIds.length > 0 && (
                <a href={aiGuideUrl} target="_blank" rel="noreferrer" className="text-xs font-medium text-brand underline">
                  Open instructions page
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="min-w-0 space-y-2">
          <div className="flex items-center justify-between gap-3">
            <Label>Preview</Label>
            <div className="flex gap-1" role="group" aria-label="Preview size">
              {['desktop', 'mobile'].map((size) => (
                <button
                  key={size}
                  type="button"
                  aria-pressed={previewSize === size}
                  onClick={() => setPreviewSize(size)}
                  className={`rounded-md px-2.5 py-1 text-xs font-medium capitalize ${previewSize === size ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <div className="flex h-[480px] justify-center overflow-hidden rounded-lg border border-border bg-muted/40">
            {nextPreview ? (
              // No allow-same-origin: the frame can't read the CRM session or its storage.
              // allow-forms because the widget's steps are forms; without it their submit never fires.
              <iframe
                title="Booking widget preview"
                sandbox="allow-scripts allow-forms"
                srcDoc={previewDoc}
                className={`h-full border-0 bg-white ${previewSize === 'mobile' ? 'w-[375px] max-w-full' : 'w-full'}`}
              />
            ) : (
              <p className="self-center text-sm text-muted-foreground">Choose a location to see the preview.</p>
            )}
          </div>
          <p className="text-[11px] text-muted-foreground">
            Live data, but safe to click: it stops at the phone step, so no texts are sent and no seats are held. Only published classes with upcoming dates appear.
          </p>
          {testPageUrl && (
            <p className="text-[11px] text-muted-foreground">
              To try the whole flow,{' '}
              <a href={testPageUrl} target="_blank" rel="noreferrer" className="font-medium text-brand underline">open the test page</a>.
              {' '}It&apos;s a pretend studio website with the live widget, so texts and bookings there are real.
            </p>
          )}
        </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

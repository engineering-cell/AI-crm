import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

vi.mock('@/lib/api', () => ({ default: { get: vi.fn() }, getApiBaseUrl: () => 'https://api.test' }))
vi.mock('@/components/ui/toast', () => ({ toast: { success: vi.fn(), error: vi.fn() } }))
// The location the user is working in, as the top-bar switcher reports it. Midtown unless a test says otherwise.
vi.mock('@/lib/auth', () => ({ getEffectiveBranch: vi.fn(() => 'loc1') }))

const { default: WebsiteEmbedDialog, buildAiGuideUrl, buildAiPrompt, buildEmbed, buildPreviewDoc, buildTestPageUrl, contrastRatio, defaultLocationIds } = await import('../WebsiteEmbedDialog')
const { default: api } = await import('@/lib/api')
const { getEffectiveBranch } = await import('@/lib/auth')
const { toast } = await import('@/components/ui/toast')

const { widgetAttrs } = await import('../../../../booking-test/page')

const base = 'https://api.test/public/booking'

describe('test page link', () => {
  it('needs a location', () => {
    expect(buildTestPageUrl({ locationIds: [] })).toBe('')
  })

  it('carries the settings through to the widget attributes unchanged', () => {
    const url = buildTestPageUrl({ locationIds: ['a', 'b'], tag: 'Latin', accent: '#112233', bg: '#001133', text: '#ffffff', font: 'Open Sans', headingFont: 'Playfair Display' })
    expect(url.startsWith('/booking-test?')).toBe(true)
    expect(widgetAttrs(url.split('?')[1])).toEqual({
      'data-location': 'a,b',
      'data-tag': 'Latin',
      'data-accent': '#112233',
      'data-bg': '#001133',
      'data-text': '#ffffff',
      'data-font': 'Open Sans',
      'data-heading-font': 'Playfair Display',
      'data-theme': 'dark',
    })
  })

  it('leaves out what is still the default', () => {
    expect(widgetAttrs(buildTestPageUrl({ locationIds: ['a'] }).split('?')[1])).toEqual({ 'data-location': 'a' })
  })
})

describe('buildPreviewDoc', () => {
  it('is empty until a location is chosen', () => {
    expect(buildPreviewDoc({ base, locationIds: [] })).toBe('')
  })

  it('uses the pasted snippet in preview mode, with the same options', () => {
    const doc = buildPreviewDoc({ base, locationIds: ['a', 'b'], tag: 'Latin', accent: '#112233', bg: '#1c1120', text: '#fbf6ee', font: 'Poppins' })
    expect(doc).toContain('<div data-cadance-booking data-preview data-location="a,b"')
    expect(doc).toContain('data-tag="Latin"')
    expect(doc).toContain('data-accent="#112233"')
    expect(doc).toContain('data-theme="dark"')
    expect(doc).toContain('data-font="Poppins"')
    expect(doc).toContain(`${base}/widget.js?preview=3`)
  })

  it('never leaks the preview flag into the code studios copy', () => {
    expect(buildEmbed({ base, format: 'script', locationIds: ['a'] })).not.toContain('preview')
  })
})

describe('WebsiteEmbedDialog preview', () => {
  it('renders a sandboxed frame in preview mode, and follows the chosen format', async () => {
    api.get.mockResolvedValue({ success: true, data: [{ _id: 'loc1', name: 'Midtown' }, { _id: 'loc2', name: 'Uptown' }] })
    render(<WebsiteEmbedDialog open onClose={() => {}} />)

    const frame = await screen.findByTitle('Booking widget preview')
    // Never allow-same-origin: that would hand the frame the CRM's session and storage.
    expect(frame.getAttribute('sandbox')).toBe('allow-scripts allow-forms')
    await waitFor(() => expect(frame.getAttribute('srcdoc')).toContain('data-preview data-location="loc1"'))

    fireEvent.click(screen.getByLabelText('Uptown'))
    await waitFor(() => expect(frame.getAttribute('srcdoc')).toContain('data-location="loc1,loc2"'), { timeout: 2000 })

    fireEvent.click(screen.getByRole('tab', { name: 'Direct link' }))
    await waitFor(() => expect(frame.getAttribute('srcdoc')).toContain('data-location="loc1"'), { timeout: 2000 })

    fireEvent.click(screen.getByRole('button', { name: 'mobile' }))
    expect(frame.className).toContain('w-[375px]')

    expect(screen.queryByText(/hard to read/)).toBeNull()
    fireEvent.change(screen.getByLabelText('Text'), { target: { value: '#ffffff' } })
    expect(screen.getByText(/hard to read/)).toBeTruthy()
    fireEvent.click(screen.getByRole('button', { name: 'Dark' }))
    expect(screen.queryByText(/hard to read/)).toBeNull()

    fireEvent.click(screen.getByRole('button', { name: 'Light' }))
    expect(screen.queryByText(/hard to see/)).toBeNull()
    fireEvent.change(screen.getByLabelText('Buttons'), { target: { value: '#ffffee' } })
    expect(screen.getByText(/hard to see/)).toBeTruthy()
    fireEvent.click(screen.getByRole('button', { name: 'Dark' }))

    fireEvent.change(screen.getByLabelText('Body font'), { target: { value: 'Lora' } })
    await waitFor(() => expect(frame.getAttribute('srcdoc')).toContain('data-font="Lora"'), { timeout: 2000 })
    expect(frame.getAttribute('srcdoc')).toContain('data-theme="dark"')
  })
})

describe('buildEmbed', () => {
  it('is empty until a location is chosen', () => {
    expect(buildEmbed({ base, format: 'script', locationIds: [] })).toBe('')
  })

  it('makes a two-line script embed for one location', () => {
    const code = buildEmbed({ base, format: 'script', locationIds: ['loc1'] })
    expect(code).toBe(`<div data-cadance-booking data-location="loc1"></div>\n<script src="${base}/widget.js" async></script>`)
  })

  it('puts every location on one widget, with the branding options', () => {
    const code = buildEmbed({ base, format: 'script', locationIds: ['a', 'b'], tag: 'Latin', accent: '#112233', bg: '#1c1120', text: '#fbf6ee' })
    expect(code).toContain('data-location="a,b"')
    expect(code).toContain('data-tag="Latin"')
    expect(code).toContain('data-accent="#112233"')
    expect(code).toContain('data-theme="dark"')
  })

  it('writes only the colours that differ from the default look', () => {
    const plain = buildEmbed({ base, format: 'script', locationIds: ['a'], bg: '#ffffff', text: '#1f1421' })
    expect(plain).not.toContain('data-bg')
    expect(plain).not.toContain('data-text')
    expect(plain).not.toContain('data-theme')
    const custom = buildEmbed({ base, format: 'script', locationIds: ['a'], bg: '#fffaf0', text: '#222222', font: 'Playfair Display' })
    expect(custom).toContain('data-bg="#fffaf0"')
    expect(custom).toContain('data-text="#222222"')
    expect(custom).toContain('data-font="Playfair Display"')
    expect(buildEmbed({ base, format: 'script', locationIds: ['a'], headingFont: 'Lora' })).toContain('data-heading-font="Lora"')
    expect(buildEmbed({ base, format: 'link', locationIds: ['a'], headingFont: 'Open Sans' })).toContain('headingFont=Open%20Sans')
    expect(custom).not.toContain('data-theme')
  })

  it('switches to the dark status colours on a dark background, whatever its shade', () => {
    const code = buildEmbed({ base, format: 'script', locationIds: ['a'], bg: '#001133', text: '#ffffff' })
    expect(code).toContain('data-theme="dark"')
    expect(code).toContain('data-bg="#001133"')
  })

  it('carries colours and font on the iframe and direct link too', () => {
    const link = buildEmbed({ base, format: 'link', locationIds: ['a'], accent: '#112233', bg: '#fffaf0', text: '#222222', font: 'Open Sans' })
    expect(link).toBe(`${base}/page/a?accent=%23112233&bg=%23fffaf0&text=%23222222&font=Open%20Sans`)
  })

  it('measures contrast the way WCAG does', () => {
    expect(contrastRatio('#000000', '#ffffff')).toBeCloseTo(21)
    expect(contrastRatio('#ffffff', '#ffffff')).toBeCloseTo(1)
  })

  it("can't break out of the attribute with a tag or font", () => {
    expect(buildEmbed({ base, format: 'script', locationIds: ['a'], font: '"><script>' })).not.toContain('"><script>')

    const code = buildEmbed({ base, format: 'script', locationIds: ['a'], tag: '"><script>' })
    expect(code).not.toContain('"><script>')
  })

  it('makes an iframe and a direct link, with the colour encoded', () => {
    expect(buildEmbed({ base, format: 'link', locationIds: ['a'], accent: '#112233' })).toBe(`${base}/page/a?accent=%23112233`)
    const frame = buildEmbed({ base, format: 'iframe', locationIds: ['a'] })
    expect(frame).toContain(`<iframe src="${base}/page/a"`)
  })
})

describe('AI instructions', () => {
  it('points at the public guide with the studio location id', () => {
    expect(buildAiGuideUrl({ apiBase: 'https://api.test', locationId: 'abc123' })).toBe('https://api.test/public/embed/llms.txt?location=abc123')
    expect(buildAiGuideUrl({ apiBase: 'https://api.test' })).toBe('https://api.test/public/embed/llms.txt')
    expect(buildAiGuideUrl({ apiBase: '', locationId: 'abc' })).toBe('')
    expect(buildAiGuideUrl({ apiBase: 'https://api.test', locationId: 'a&b=c' })).toContain('location=a%26b%3Dc')
  })

  it('ends with a line for the owner to describe the look, and lists several locations', () => {
    const one = buildAiPrompt({ guide: '  GUIDE  ', locations: [{ _id: 'a', name: 'Midtown' }] })
    expect(one.startsWith('GUIDE')).toBe(true)
    expect(one).not.toContain('several locations')
    expect(one.endsWith('What I want my booking widget to look like: ')).toBe(true)
    const many = buildAiPrompt({ guide: 'GUIDE', locations: [{ _id: 'a', name: 'Midtown' }, { _id: 'b', name: 'Uptown' }] })
    expect(many).toContain('- Midtown: a')
    expect(many).toContain('- Uptown: b')
  })

  it('copies the fetched guide without sending the CRM login, and reports failure', async () => {
    api.get.mockResolvedValue({ success: true, data: [{ _id: 'loc1', name: 'Midtown' }] })
    const writeText = vi.fn().mockResolvedValue()
    Object.assign(navigator, { clipboard: { writeText } })
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, text: async () => '# Cadance embeds\nGUIDE BODY' })
    vi.stubGlobal('fetch', fetchMock)

    render(<WebsiteEmbedDialog open onClose={() => {}} />)
    const button = await screen.findByRole('button', { name: 'Copy AI instructions' })
    await waitFor(() => expect(button.disabled).toBe(false))
    fireEvent.click(button)

    await waitFor(() => expect(writeText).toHaveBeenCalled())
    expect(fetchMock.mock.calls[0][0]).toBe('https://api.test/public/embed/llms.txt?location=loc1')
    expect(fetchMock.mock.calls[0][1]).toEqual({ credentials: 'omit' })
    expect(writeText.mock.calls[0][0]).toContain('GUIDE BODY')
    expect(writeText.mock.calls[0][0]).toContain('What I want my booking widget to look like:')
    expect(toast.success).toHaveBeenCalled()

    fetchMock.mockResolvedValue({ ok: false, status: 500, text: async () => '' })
    fireEvent.click(button)
    await waitFor(() => expect(toast.error).toHaveBeenCalled())
    vi.unstubAllGlobals()
  })
})

describe('location defaults', () => {
  const two = [{ _id: 'loc1', name: 'Midtown' }, { _id: 'loc2', name: 'Uptown' }]

  it('starts with the location the user is already in', () => {
    expect(defaultLocationIds({ locations: two, activeBranch: 'loc2' })).toEqual(['loc2'])
  })

  it('starts with every location for "All Branches"', () => {
    expect(defaultLocationIds({ locations: two, activeBranch: null })).toEqual(['loc1', 'loc2'])
  })

  it('falls back to the first location when the active one is not offered, and to nothing when there are none', () => {
    expect(defaultLocationIds({ locations: two, activeBranch: 'closed-branch' })).toEqual(['loc1'])
    expect(defaultLocationIds({ locations: [], activeBranch: 'loc1' })).toEqual([])
  })

  it('pre-selects the active location in the dialog without any clicking', async () => {
    getEffectiveBranch.mockReturnValue('loc2')
    api.get.mockResolvedValue({ success: true, data: two })
    render(<WebsiteEmbedDialog open onClose={() => {}} />)
    const frame = await screen.findByTitle('Booking widget preview')
    await waitFor(() => expect(frame.getAttribute('srcdoc')).toContain('data-location="loc2"'))
    expect(screen.getByLabelText('Uptown').checked).toBe(true)
    expect(screen.getByLabelText('Midtown').checked).toBe(false)
    expect(screen.getByText(/Set to the location you’re working in/)).toBeTruthy()
    // A manual tick is respected, not overwritten by the default.
    fireEvent.click(screen.getByLabelText('Midtown'))
    await waitFor(() => expect(frame.getAttribute('srcdoc')).toContain('data-location="loc1,loc2"'), { timeout: 2000 })
    getEffectiveBranch.mockReturnValue('loc1')
  })

  it('selects every location for "All Branches"', async () => {
    getEffectiveBranch.mockReturnValue(null)
    api.get.mockResolvedValue({ success: true, data: two })
    render(<WebsiteEmbedDialog open onClose={() => {}} />)
    const frame = await screen.findByTitle('Booking widget preview')
    await waitFor(() => expect(frame.getAttribute('srcdoc')).toContain('data-location="loc1,loc2"'))
    expect(screen.getByText(/Showing all your locations/)).toBeTruthy()
    getEffectiveBranch.mockReturnValue('loc1')
  })

  it('shows a plain location name, with no boxes, when there is only one, and skips closed ones', async () => {
    api.get.mockResolvedValue({ success: true, data: [{ _id: 'loc1', name: 'Midtown', status: 'active' }, { _id: 'loc9', name: 'Old Branch', status: 'inactive' }] })
    render(<WebsiteEmbedDialog open onClose={() => {}} />)
    const frame = await screen.findByTitle('Booking widget preview')
    await waitFor(() => expect(frame.getAttribute('srcdoc')).toContain('data-location="loc1"'))
    expect(screen.queryByRole('checkbox')).toBeNull()
    expect(screen.queryByText('Old Branch')).toBeNull()
    expect(screen.getByText('Midtown')).toBeTruthy()
  })
})

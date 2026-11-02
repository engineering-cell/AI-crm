import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

vi.mock('@/lib/api', () => ({ default: { get: vi.fn() }, getApiBaseUrl: () => 'https://api.test' }))
vi.mock('@/components/ui/toast', () => ({ toast: { success: vi.fn(), error: vi.fn() } }))

const { default: WebsiteEmbedDialog, buildEmbed, buildPreviewDoc, buildTestPageUrl, contrastRatio } = await import('../WebsiteEmbedDialog')
const { default: api } = await import('@/lib/api')

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

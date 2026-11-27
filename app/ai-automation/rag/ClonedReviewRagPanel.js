'use client'

import { useEffect, useState } from 'react'
import api from '@/lib/api'

function formatDate(value) {
  if (!value) return 'Not indexed'
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? 'Unknown' : date.toLocaleString()
}

function statusText(source) {
  if (source.embeddingStatus === 'ready' && !source.isActive) return 'Ready, inactive'
  return source.embeddingStatus || 'Unknown'
}

function SourceList({ sources, selectedId, onSelect, loading }) {
  if (loading) return <p className="text-sm text-muted-foreground">Loading sources…</p>
  if (!sources.length) return <p className="text-sm text-muted-foreground">No sources in this category.</p>
  return (
    <div className="space-y-2">
      {sources.map((source) => (
        <button key={source.id} type="button" onClick={() => onSelect(source.id)}
          className={`w-full rounded-lg border p-3 text-left transition-colors ${selectedId === source.id ? 'border-primary bg-primary/5' : 'border-border bg-card hover:bg-muted/40'}`}>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="font-medium text-foreground">{source.name}</span>
            <span className="rounded-full bg-muted px-2 py-1 text-xs capitalize text-muted-foreground">{statusText(source)}</span>
          </div>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <span>{source.chunkCount} indexed chunks</span>
            <span>{source.allLocations ? 'All branches' : source.locationIDs?.length ? `${source.locationIDs.length} studio(s)` : 'Organisation-wide'}</span>
            <span>{formatDate(source.embeddedAt)}</span>
          </div>
          {source.embeddingError && <p className="mt-2 text-xs text-destructive">{source.embeddingError}</p>}
        </button>
      ))}
    </div>
  )
}

function ChunkList({ chunks, total, page, onPageChange, loading, selectedSource }) {
  if (!selectedSource) return <p className="text-sm text-muted-foreground">Select a source to inspect its chunks.</p>
  if (loading) return <p className="text-sm text-muted-foreground">Loading chunks…</p>
  if (!chunks.length) return (
    <p className="text-sm text-muted-foreground">
      {selectedSource.type === 'sms_review' ? 'No indexed embedding was found for this approved review.' : 'No source-linked chunks found. Older PDFs may need to be activated again to add source labels to their embeddings.'}
    </p>
  )
  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground">{total} searchable chunk(s) for this source</p>
      {chunks.map((chunk, index) => (
        <article key={chunk.id} className="rounded-lg border border-border bg-muted/20 p-3">
          <div className="mb-2 flex flex-wrap gap-x-3 text-xs text-muted-foreground">
            <span>Chunk {chunk.chunkIndex == null ? index + 1 : chunk.chunkIndex + 1}</span>
            {chunk.page != null && <span>Page {chunk.page}</span>}
            {chunk.embeddingModel && <span>Model: {chunk.embeddingModel}</span>}
          </div>
          <p className="whitespace-pre-wrap break-words text-sm text-foreground">{chunk.text}</p>
        </article>
      ))}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>Page {page} of {Math.max(1, Math.ceil(total / 50))}</span>
        <div className="flex gap-2">
          <button type="button" onClick={() => onPageChange(page - 1)} disabled={page <= 1}
            className="rounded border border-border px-2 py-1 disabled:opacity-40">Previous</button>
          <button type="button" onClick={() => onPageChange(page + 1)} disabled={page * 50 >= total}
            className="rounded border border-border px-2 py-1 disabled:opacity-40">Next</button>
        </div>
      </div>
    </div>
  )
}

function SearchResults({ results, searched }) {
  if (!searched) return null
  if (!results.length) return <p className="text-sm text-muted-foreground">No matching chunks found for this studio.</p>
  return (
    <div className="space-y-3">
      {results.map((result, index) => (
        <article key={`${result.type}-${result.sourceID || index}-${index}`} className="rounded-lg border border-border bg-card p-3">
          <div className="mb-2 flex flex-wrap gap-x-3 text-xs text-muted-foreground">
            <span className="font-semibold uppercase">{result.type.replace('_', ' ')}</span>
            <span>{result.sourceName || 'Older unattributed chunk'}</span>
            {result.page != null && <span>Page {result.page}</span>}
          </div>
          <p className="whitespace-pre-wrap break-words text-sm text-foreground">{result.text}</p>
        </article>
      ))}
    </div>
  )
}

export default function ClonedReviewRagPanel() {
  const [studios, setStudios] = useState([])
  const [loadingStudios, setLoadingStudios] = useState(true)
  const [organisationId, setOrganisationId] = useState('')
  const [studioId, setStudioId] = useState('')
  const [studioError, setStudioError] = useState('')
  const [sources, setSources] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [selectedId, setSelectedId] = useState(null)
  const [chunks, setChunks] = useState([])
  const [chunkTotal, setChunkTotal] = useState(0)
  const [chunkPage, setChunkPage] = useState(1)
  const [loadingSources, setLoadingSources] = useState(false)
  const [loadingChunks, setLoadingChunks] = useState(false)
  const [error, setError] = useState('')
  const [question, setQuestion] = useState('')
  const [results, setResults] = useState([])
  const [searched, setSearched] = useState(false)
  const [searching, setSearching] = useState(false)

  useEffect(() => {
    let active = true
    api.get('/api/sms-reply-reviews/live/studios').then((result) => {
      if (!active) return
      setLoadingStudios(false)
      if (!result.success) {
        setStudioError(result.error || 'Could not load cloned studios.')
        return
      }
      const available = Array.isArray(result.data?.studios) ? result.data.studios : []
      setStudios(available)
      setOrganisationId(available[0]?.sourceOrganisationID || '')
      setStudioId(available[0]?.id || '')
    })
    return () => { active = false }
  }, [])

  useEffect(() => {
    if (!studioId) return
    let active = true
    const load = async () => {
      setLoadingSources(true)
      setError('')
      const scope = `source=cloned_conversation&sourceLocationID=${encodeURIComponent(studioId)}`
      const result = await api.get(`/api/rag/sources?type=sms_review&page=${page}&limit=20&${scope}`)
      if (!active) return
      setLoadingSources(false)
      if (!result.success) {
        setError(result.error || 'Could not load approved cloned examples.')
        setSources([])
        setTotal(0)
        setSelectedId(null)
        return
      }
      const items = result.data?.sources || []
      setSources(items)
      setTotal(result.data?.total || 0)
      setSelectedId((current) => items.some((item) => item.id === current) ? current : items[0]?.id || null)
    }
    load()
    return () => { active = false }
  }, [studioId, page])

  useEffect(() => {
    if (!studioId || !selectedId) {
      setChunks([])
      setChunkTotal(0)
      return
    }
    let active = true
    const load = async () => {
      setLoadingChunks(true)
      const scope = `source=cloned_conversation&sourceLocationID=${encodeURIComponent(studioId)}`
      const result = await api.get(`/api/rag/sources/sms_review/${encodeURIComponent(selectedId)}/chunks?page=${chunkPage}&limit=50&${scope}`)
      if (!active) return
      setLoadingChunks(false)
      if (result.success) {
        setChunks(result.data?.chunks || [])
        setChunkTotal(result.data?.total || 0)
      } else {
        setChunks([])
        setChunkTotal(0)
        setError(result.error || 'Could not load this embedding.')
      }
    }
    load()
    return () => { active = false }
  }, [studioId, selectedId, chunkPage])

  const organisations = [...new Map(studios.map((studio) =>
    [studio.sourceOrganisationID, studio.organisationName || 'Organisation']))]
  const studioOptions = studios.filter((studio) => studio.sourceOrganisationID === organisationId)
  const selectedSource = sources.find((source) => source.id === selectedId)

  const selectStudio = (id) => {
    setStudioId(id)
    setPage(1)
    setSources([])
    setTotal(0)
    setSelectedId(null)
    setChunkPage(1)
    setChunks([])
    setResults([])
    setSearched(false)
  }

  const selectOrganisation = (id) => {
    setOrganisationId(id)
    selectStudio(studios.find((studio) => studio.sourceOrganisationID === id)?.id || '')
  }

  const runSearch = async (event) => {
    event.preventDefault()
    if (!question.trim() || !studioId || searching) return
    setSearching(true)
    setError('')
    const result = await api.post('/api/rag/search', {
      query: question.trim(), source: 'cloned_conversation', sourceLocationID: studioId,
    })
    setSearching(false)
    setSearched(true)
    if (result.success) setResults(result.data?.results || [])
    else {
      setResults([])
      setError(result.error || 'Could not search approved examples.')
    }
  }

  return (
    <div className="space-y-5">
      <section className="space-y-3 rounded-xl border border-border bg-card p-4 sm:p-5">
        <h2 className="text-lg font-semibold">Cloned review RAG</h2>
        <p className="text-sm text-muted-foreground">Inspect staff-approved examples in the staging review index. Search uses the selected cloned studio and sends no SMS.</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="space-y-1 text-sm font-medium">Organisation
            <select value={organisationId} onChange={(event) => selectOrganisation(event.target.value)} className="block w-full rounded-lg border border-input bg-background px-3 py-2">
              {organisations.map(([id, name]) => <option key={id} value={id}>{name}</option>)}
            </select>
          </label>
          <label className="space-y-1 text-sm font-medium">Cloned studio
            <select value={studioId} onChange={(event) => selectStudio(event.target.value)} className="block w-full rounded-lg border border-input bg-background px-3 py-2">
              {studioOptions.map((studio) => <option key={studio.id} value={studio.id}>{studio.name}</option>)}
            </select>
          </label>
        </div>
        {studioError && <p role="alert" className="text-sm text-destructive">{studioError}</p>}
        {!studioError && studios.length === 0 && <p className="text-sm text-muted-foreground">{loadingStudios ? 'Loading studios…' : 'No cloned studios are available.'}</p>}
      </section>
      {studioId && <>
        <section className="rounded-xl border border-border bg-card p-4 sm:p-5">
          <h2 className="text-lg font-semibold">Test staging review retrieval</h2>
          <p className="mt-1 text-sm text-muted-foreground">Find approved SMS examples for this studio using the staging vector index.</p>
          <form onSubmit={runSearch} className="mt-4 flex flex-col gap-2 sm:flex-row">
            <input value={question} onChange={(event) => setQuestion(event.target.value)} maxLength={500}
              placeholder="Enter a customer message" aria-label="Test cloned review question"
              className="min-w-0 flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm" />
            <button type="submit" disabled={searching || !question.trim()} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50">
              {searching ? 'Searching…' : 'Test search'}
            </button>
          </form>
          <div className="mt-4"><SearchResults results={results} searched={searched} /></div>
        </section>
        {error && <p role="alert" className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]">
          <section className="self-start rounded-xl border border-border bg-card p-4">
            <h2 className="mb-3 text-lg font-semibold">Approved SMS examples</h2>
            <SourceList sources={sources} selectedId={selectedId} onSelect={(id) => { setSelectedId(id); setChunkPage(1) }} loading={loadingSources} />
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{total} example(s)</span>
              <div className="flex gap-2">
                <button type="button" onClick={() => setPage((current) => current - 1)} disabled={page <= 1} className="rounded border border-border px-2 py-1 disabled:opacity-40">Previous</button>
                <span className="px-1 py-1">{page}</span>
                <button type="button" onClick={() => setPage((current) => current + 1)} disabled={page * 20 >= total} className="rounded border border-border px-2 py-1 disabled:opacity-40">Next</button>
              </div>
            </div>
          </section>
          <section className="rounded-xl border border-border bg-card p-4">
            <h2 className="mb-3 text-lg font-semibold">{selectedSource ? selectedSource.name : 'Indexed example'}</h2>
            <ChunkList chunks={chunks} total={chunkTotal} page={chunkPage} onPageChange={setChunkPage} loading={loadingChunks} selectedSource={selectedSource} />
          </section>
        </div>
      </>}
    </div>
  )
}

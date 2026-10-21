export default function LoadingState() {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center gap-4 py-16" role="status" aria-live="polite">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-violet-100 border-t-violet-600" />
      <p className="text-sm font-medium text-neutral-600">Loading photos…</p>
    </div>
  )
}

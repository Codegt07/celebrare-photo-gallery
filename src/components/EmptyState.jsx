import { Search } from 'lucide-react'

export default function EmptyState({ query }) {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center py-16 text-center">
      <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100 text-neutral-500"><Search size={24} /></span>
      <h2 className="text-lg font-semibold text-neutral-900">No photos found</h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-500">We couldn’t find any authors matching “{query}”. Try another search.</p>
    </div>
  )
}

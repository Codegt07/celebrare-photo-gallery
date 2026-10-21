import { useCallback, useMemo, useReducer, useState, useEffect } from 'react'
import { Camera, Search } from 'lucide-react'
import PhotoCard from './components/PhotoCard.jsx'
import LoadingState from './components/LoadingState.jsx'
import EmptyState from './components/EmptyState.jsx'
import useFetchPhotos from './hooks/useFetchPhotos.js'
import { favouritesReducer, getInitialFavourites, FAVOURITES_STORAGE_KEY } from './reducers/favouritesReducer.js'

export default function App() {
  const { photos, loading, error } = useFetchPhotos()
  const [searchQuery, setSearchQuery] = useState('')
  const [favourites, dispatch] = useReducer(favouritesReducer, undefined, getInitialFavourites)

  useEffect(() => {
    try {
      localStorage.setItem(FAVOURITES_STORAGE_KEY, JSON.stringify(favourites))
    } catch {
      // The gallery still works if browser storage is unavailable.
    }
  }, [favourites])

  const handleSearch = useCallback((event) => {
    setSearchQuery(event.target.value)
  }, [])

  const filteredPhotos = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase()
    if (!normalizedQuery) return photos
    return photos.filter((photo) => photo.author.toLowerCase().includes(normalizedQuery))
  }, [photos, searchQuery])

  const toggleFavourite = useCallback((photo) => {
    dispatch({ type: 'TOGGLE_FAVOURITE', photo })
  }, [])

  const favouriteIds = useMemo(() => new Set(favourites.map((photo) => photo.id)), [favourites])

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-5 py-5 sm:px-8 lg:px-10">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-600 text-white shadow-sm"><Camera size={23} /></span>
          <div>
            <h1 className="text-xl font-bold tracking-tight sm:text-2xl">Photo Gallery</h1>
            <p className="mt-0.5 text-xs text-neutral-500 sm:text-sm">A Collection of Moments Worth Seeing.</p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
        <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">All photos</h2>
            <p className="mt-1 text-sm text-neutral-500">Search by photographer name and save your favourites.</p>
          </div>
          <label className="relative block w-full sm:max-w-sm">
            <span className="sr-only">Search photos by author</span>
            <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="search"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search photographers…"
              className="w-full rounded-xl border border-neutral-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-neutral-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
            />
          </label>
        </div>

        {loading ? (
          <LoadingState />
        ) : error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-8 text-center" role="alert">
            <h2 className="font-semibold text-red-800">Unable to load photos</h2>
            <p className="mt-2 text-sm text-red-700">{error}</p>
            <p className="mt-1 text-sm text-red-700">Check your internet connection and refresh the page.</p>
          </div>
        ) : filteredPhotos.length === 0 ? (
          <EmptyState query={searchQuery.trim()} />
        ) : (
          <>
            <p className="mb-4 text-xs text-neutral-500" aria-live="polite">Showing {filteredPhotos.length} of {photos.length} photos</p>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {filteredPhotos.map((photo) => (
                <PhotoCard
                  key={photo.id}
                  photo={photo}
                  isFavourite={favouriteIds.has(photo.id)}
                  onToggleFavourite={toggleFavourite}
                />
              ))}
            </div>
          </>
        )}
        <footer className="mt-12 border-t border-neutral-200 pt-5 text-center text-xs text-neutral-500">
          Photos provided by Picsum Photos.
        </footer>
      </main>
    </div>
  )
}

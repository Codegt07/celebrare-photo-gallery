export const FAVOURITES_STORAGE_KEY = 'celebrare-photo-gallery-favourites'

function readSavedFavourites() {
  try {
    const saved = localStorage.getItem(FAVOURITES_STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

export function favouritesReducer(favourites, action) {
  switch (action.type) {
    case 'TOGGLE_FAVOURITE': {
      const alreadyFavourite = favourites.some((photo) => photo.id === action.photo.id)
      return alreadyFavourite
        ? favourites.filter((photo) => photo.id !== action.photo.id)
        : [...favourites, action.photo]
    }
    default:
      return favourites
  }
}

export function getInitialFavourites() {
  return readSavedFavourites()
}

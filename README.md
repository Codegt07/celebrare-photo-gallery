# Photo Gallery — Celebrare Frontend Internship Assignment

A responsive React photo gallery built with Vite and Tailwind CSS. It fetches 30 photos from Picsum Photos, filters them by author in real time, and saves favourite photos between refreshes.

## Requirements
- Node.js 18 or newer
- npm

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

## Production build

```bash
npm run build
npm run preview
```

## Project structure

```text
src/
├── components/
│   ├── EmptyState.jsx
│   ├── LoadingState.jsx
│   └── PhotoCard.jsx
├── hooks/
│   └── useFetchPhotos.js
├── reducers/
│   └── favouritesReducer.js
├── App.jsx
├── index.css
└── main.jsx
```

## Implementation notes
- `useFetchPhotos` owns the API request and returns exactly `photos`, `loading`, and `error`.
- `favouritesReducer` handles the `TOGGLE_FAVOURITE` action. Favourites are initialized from and persisted to `localStorage`.
- `useCallback` memoizes the search input handler. `useMemo` computes the filtered photo list and favourite ID set.
- Tailwind CSS is the only styling system; no component library is used.
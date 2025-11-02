# Battle of Bytes 2.0 — React Frontend (Vite)

This is a React (Vite) port of the provided Flask+HTML frontend. It preserves the Apple/Tesla dark theme, sections, animations, and real-time features via Socket.IO.

## Features
- Home, Auction, Roster, Poll, Feed, Contact pages
- Real-time updates over WebSocket (socket.io-client)
- Same REST API contract as your Flask backend (`/api/...`)
- Environment-driven API base URL

## Quick Start

1) **Install deps**
```bash
npm i
```

2) **Configure API base (optional)**  
Create a `.env` file (or `.env.local`) in the project root:
```
VITE_API_BASE=http://localhost:5000
```
If omitted, the app will call the same origin (useful if you proxy).

3) **Run the app**
```bash
npm run dev
```
Open the URL Vite prints (e.g. http://localhost:5173).

4) **Build for production**
```bash
npm run build
npm run preview
```

## Assets
Place your branding assets in `public/static/`:
- `logo.png`
- `background.png`
- `hero_animation.mp4`

## Notes
- The socket.io client will connect to `VITE_API_BASE` if set; otherwise it uses the frontend origin.
- The UI expects the backend routes and payloads exactly as in your Python script.

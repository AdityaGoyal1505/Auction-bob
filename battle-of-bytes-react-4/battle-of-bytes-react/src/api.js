export const API_BASE = import.meta.env.VITE_API_BASE ?? 'https://battle-of-bytes-api.onrender.com';

// Helper to fetch JSON with basic error handling
export async function getJSON(path) {
  const res = await fetch(API_BASE + path);
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}

export async function postJSON(path, body) {
  const res = await fetch(API_BASE + path, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) {
    const errorMsg = data?.error || data?.message || `Request failed: ${res.status}`;
    throw new Error(errorMsg);
  }
  return data;
}

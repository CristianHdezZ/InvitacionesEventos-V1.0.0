const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;
const PLAYLIST_ID = process.env.SPOTIFY_PLAYLIST_ID;
const SCOPES = 'playlist-modify-public playlist-modify-private';
const configured = Boolean(CLIENT_ID && CLIENT_SECRET && REDIRECT_URI && PLAYLIST_ID);

function basicAuthHeader() {
  return 'Basic ' + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
}

function getAuthorizeUrl(state) {
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: CLIENT_ID,
    scope: SCOPES,
    redirect_uri: REDIRECT_URI,
    state
  });
  return `https://accounts.spotify.com/authorize?${params.toString()}`;
}

async function exchangeCodeForTokens(code) {
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', Authorization: basicAuthHeader() },
    body: new URLSearchParams({ grant_type: 'authorization_code', code, redirect_uri: REDIRECT_URI })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error_description || 'No se pudo autorizar con Spotify.');
  return data;
}

async function refreshAccessToken(refreshToken) {
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', Authorization: basicAuthHeader() },
    body: new URLSearchParams({ grant_type: 'refresh_token', refresh_token: refreshToken })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error_description || 'No se pudo renovar el token de Spotify.');
  return data;
}

async function searchTrack(query, accessToken) {
  const params = new URLSearchParams({ q: query, type: 'track', limit: '1' });
  const res = await fetch(`https://api.spotify.com/v1/search?${params.toString()}`, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error?.message || 'Error buscando la cancion en Spotify.');
  return data.tracks?.items?.[0] || null;
}

async function addTrackToPlaylist(trackUri, accessToken) {
  const res = await fetch(`https://api.spotify.com/v1/playlists/${PLAYLIST_ID}/tracks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
    body: JSON.stringify({ uris: [trackUri] })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error?.message || 'No se pudo agregar la cancion a la playlist.');
  return data;
}

module.exports = {
  configured,
  PLAYLIST_ID,
  getAuthorizeUrl,
  exchangeCodeForTokens,
  refreshAccessToken,
  searchTrack,
  addTrackToPlaylist
};

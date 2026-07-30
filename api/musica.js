const { addSugerenciaMusical, listSugerenciasMusicales, allowMusicaAttempt, hasRedis } = require('../lib/store');
const { requireAdmin } = require('../lib/admin-auth');

function sanitize(value, maxLen) {
  return typeof value === 'string' ? value.trim().slice(0, maxLen) : '';
}

function setCors(res) {
  if (process.env.ALLOWED_ORIGIN) res.setHeader('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGIN);
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function clientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  return (typeof forwarded === 'string' ? forwarded.split(',')[0] : req.socket?.remoteAddress || 'unknown').trim();
}

module.exports = async (req, res) => {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(204).end();

  if (req.method === 'POST') {
    if (!(await allowMusicaAttempt(clientIp(req)))) {
      return res.status(429).json({ ok: false, error: 'Demasiados intentos. Espera un minuto e intentalo de nuevo.' });
    }

    const body = req.body || {};
    if (body._gotcha) return res.status(200).json({ ok: true });

    const cancion = sanitize(body.cancion, 150);
    const artista = sanitize(body.artista, 100);
    if (!cancion) return res.status(400).json({ ok: false, errors: ['Escribe el nombre de la cancion.'] });

    const entry = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
      cancion,
      artista,
      creado: new Date().toISOString()
    };

    try {
      await addSugerenciaMusical(entry);
      return res.status(200).json({ ok: true, id: entry.id });
    } catch (err) {
      console.error('Error guardando sugerencia musical:', err);
      return res.status(500).json({ ok: false, error: 'No se pudo guardar la sugerencia.' });
    }
  }

  if (req.method === 'GET') {
    if (!requireAdmin(req, res)) return;
    const list = await listSugerenciasMusicales();
    return res.status(200).json({
      ok: true,
      sugerencias: list.slice().reverse(),
      storage: hasRedis ? 'upstash' : 'local-tmp (no persiste en produccion, configura Upstash)'
    });
  }

  return res.status(405).json({ ok: false, error: 'Metodo no permitido' });
};

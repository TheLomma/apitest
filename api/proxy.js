export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { targetUrl, method, body } = req.body;
  if (!targetUrl) return res.status(400).json({ error: 'targetUrl fehlt' });

  try {
    const opts = {
      method: method || 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    if (body && method !== 'GET') {
      opts.body = JSON.stringify(body);
    }
    const upstream = await fetch(targetUrl, opts);
    const text = await upstream.text();
    res.status(upstream.status).send(text);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

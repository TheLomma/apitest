export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { targetUrl, method, body } = req.body || {};
  if (!targetUrl) return res.status(400).json({ error: 'targetUrl fehlt' });

  try {
    const response = await fetch(targetUrl, {
      method: method || 'GET',
      headers: { 'Content-Type': 'application/json' },
      body: method !== 'GET' && body ? JSON.stringify(body) : undefined
    });
    const text = await response.text();
    res.status(response.status).send(text);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

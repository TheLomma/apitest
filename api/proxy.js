const https = require('https');
const http = require('http');
const { URL } = require('url');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  let body = '';
  await new Promise((resolve) => {
    req.on('data', chunk => { body += chunk; });
    req.on('end', resolve);
  });

  let parsed;
  try {
    parsed = JSON.parse(body);
  } catch (e) {
    return res.status(400).json({ error: 'Ungültiger JSON-Body' });
  }

  const { targetUrl, method, headers, body: requestBody } = parsed;

  if (!targetUrl) {
    return res.status(400).json({ error: 'targetUrl fehlt' });
  }

  try {
    const url = new URL(targetUrl);
    const isHttps = url.protocol === 'https:';
    const lib = isHttps ? https : http;

    const options = {
      hostname: url.hostname,
      port: url.port || (isHttps ? 443 : 80),
      path: url.pathname + url.search,
      method: method || 'POST',
      headers: headers || {},
    };

    const apiResponse = await new Promise((resolve, reject) => {
      const proxyReq = lib.request(options, (proxyRes) => {
        let data = '';
        proxyRes.on('data', chunk => { data += chunk; });
        proxyRes.on('end', () => resolve({ status: proxyRes.statusCode, statusText: proxyRes.statusMessage, body: data }));
      });
      proxyReq.on('error', reject);
      if (requestBody && method !== 'GET' && method !== 'DELETE') {
        proxyReq.write(requestBody);
      }
      proxyReq.end();
    });

    return res.status(200).json(apiResponse);
  } catch (err) {
    return res.status(500).json({ error: 'Proxy-Fehler', message: err.message });
  }
};

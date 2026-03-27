# Goo API Tool

Web-App für alle 11q.co / Goo API Endpunkte, mit Vercel-Proxy (CORS-frei).

## Endpunkte

| Endpunkt | Methode | Typ |
|---|---|---|
| /api/last/{goo_id} | GET | Standard |
| /api/thump/{goo_id} | POST | Standard |
| /pro-api/{goo_id}/last-deleted | GET | PRO |
| /pro-api/{goo_id}/autofill | GET | PRO |
| /api/live-text/{goo_id} | GET | PRO |
| /pro-api/{goo_id}/last-bd | GET | PRO |
| /pro-api/{goo_id}/last-deleted-bd | GET | PRO |

## Deployment

1. GitHub Repo → alle Dateien hochladen
2. vercel.com → New Project → Repo auswählen → Deploy

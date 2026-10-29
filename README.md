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

## Display (v2.7)

Neuer Tab „Display“: Verbindung per Bluetooth zu Unifi Notifier oder Thumper V2 (Web Bluetooth).
- Ergebnisse aus Goo, Inject, Unifi und Eigene API können über „📺 Display“ gesendet werden, auch im Vollbild.
- Auto-Abruf: fragt Unifi, Goo oder eine eigene URL in einem Intervall ab und sendet bei Änderung.
- Peeksmith 3: nur Diagnose (Dienste und Merkmale auflisten), Protokoll noch nicht hinterlegt.
- Web Bluetooth braucht HTTPS (Vercel liefert das) und Chrome/Edge auf Android bzw. Bluefy auf dem iPhone.
- Die offizielle Unifi-App muss vorher vom Gerät getrennt sein.

## Deployment

1. GitHub Repo → alle Dateien hochladen
2. vercel.com → New Project → Repo auswählen → Deploy

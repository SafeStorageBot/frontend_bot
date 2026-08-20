# TelegramPasswords

Frontend for [password_safe_bot](https://github.com/PxyUp/password_safe_bot) (SafeStorageBot) — a Telegram Mini App for storing AES-encrypted secrets.

Built with Svelte 5 + Vite + TypeScript. No router, no UI framework: the whole
initial payload is ~24 kB gzip. Styling follows the Telegram theme variables
(`--tg-theme-*`), so light/dark mode is automatic.

## Development server

```bash
npm install
npm run dev
```

Serves at `http://localhost:5173/static/`. Requests to `/api/*` are proxied to
the bot backend on `http://localhost:8080` (override with
`API_TARGET=http://host:port npm run dev`).

## Build

```bash
npm run build
```

Output goes to `dist/telegram_passwords`, which is embedded by the Go backend
via `go:embed` (the backend repo includes this repo as the `ui` submodule) and
served under `/static/`. The `dist` directory is committed for that reason —
rebuild and commit it when releasing.

## Type checking

```bash
npm run check
```

## Notes

- Secrets are encrypted client-side with crypto-js AES (OpenSSL EVP format).
  Do not swap the crypto implementation: stored secrets must stay decryptable.
- `telegram-web-app.js` is loaded from telegram.org as required by Telegram;
  all access to `window.Telegram` is guarded so the app still works in a
  plain browser (English, no BackButton/haptics).

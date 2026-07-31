# Admin and VPS deployment

## Local access

- Website: `http://127.0.0.1:3002/`
- Admin: `http://127.0.0.1:3002/admin`
- Development-only fallback password: `admin123`

Create `.env` from `.env.example` and set a strong `ADMIN_PASSWORD` before production use. Production login is disabled when this variable is missing.

## VPS requirements

- Node.js 22.5 or newer (Node.js 22 LTS or newer is recommended)
- A persistent writable project directory
- HTTPS through a reverse proxy such as Nginx or Caddy

Run `pnpm install`, `pnpm build`, then `pnpm start`. Set `ADMIN_PASSWORD` in the service environment. `SITE_DB_PATH` may be set to an absolute persistent path; otherwise the database is stored at `data/site.db`.

## Persistent data and backups

Back up these two locations together:

- SQLite database: `data/site.db` (plus temporary `site.db-wal` and `site.db-shm` files while the app is running)
- Admin uploads: `public/uploads/`

For a consistent manual backup, stop the Node.js service first, copy the database and uploads, then restart it. The source images bundled under `public/new-site/` and `public/hero/` remain part of the Git deployment.

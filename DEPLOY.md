# Deployment — Vercel + PostgreSQL

Two separate Vercel projects from this one repo:

| Project  | Root directory | Framework      |
| -------- | -------------- | -------------- |
| Frontend | `frontend`     | Next.js (auto) |
| Backend  | `backent`      | Other          |

---

## 1. PostgreSQL database

Vercel has an ephemeral filesystem — SQLite cannot be used. Create a managed
Postgres and copy its connection string:

- **Neon** – https://neon.tech (free tier) → `postgres://user:pass@ep-xxx.neon.tech/db?sslmode=require`
- or **Supabase** / **Vercel Postgres** / **Railway**

`?sslmode=require` (or equivalent) must be present. The app also forces SSL
automatically whenever `DEBUG=False`.

---

## 2. Backend project (`backent`)

**Import** the repo in Vercel → set **Root Directory = `backent`**.

Files already in place: `vercel.json`, `build_files.sh`, `requirements.txt`,
`runtime.txt` (Python 3.11).

`build_files.sh` runs on every deploy and does:
`pip install` → `collectstatic` (into `staticfiles_build/static`, served at
`/static/*`) → `migrate` against `DATABASE_URL`.

### Environment variables (Vercel → Settings → Environment Variables)

| Name                   | Example value                                                        |
| ---------------------- | ------------------------------------------------------------------- |
| `SECRET_KEY`           | long random string (`python -c "from django.core.management.utils import get_random_secret_key as g;print(g())"`) |
| `DEBUG`                | `False`                                                             |
| `DATABASE_URL`         | `postgres://user:pass@host/db?sslmode=require`                     |
| `ALLOWED_HOSTS`        | `.vercel.app` (add custom domain if any)                           |
| `CORS_ALLOWED_ORIGINS` | `https://<frontend-project>.vercel.app`                            |
| `CSRF_TRUSTED_ORIGINS` | `https://*.vercel.app` (add custom domain if any)                  |

After the first deploy, create the admin user (run locally, pointed at the prod DB):

```bash
cd backent
# temporarily put the prod DATABASE_URL in backent/.env, then:
../venv/Scripts/python.exe manage.py createsuperuser
```

Check: `https://<backend>.vercel.app/api/projects/` → `[]`, and
`https://<backend>.vercel.app/admin/` loads with styling.

---

## 3. Frontend project (`frontend`)

**Import** the same repo again in Vercel → **Root Directory = `frontend`**.
Next.js is auto-detected (build `next build`, output handled by Vercel).

### Environment variable

| Name                       | Value                                  |
| -------------------------- | -------------------------------------- |
| `NEXT_PUBLIC_API_BASE_URL` | `https://<backend-project>.vercel.app` |

Redeploy after setting it (it is inlined at build time).

---

## 4. Order of operations

1. Create Postgres, get `DATABASE_URL`.
2. Deploy **backend** with all env vars → note its URL.
3. `createsuperuser` against the prod DB.
4. Deploy **frontend** with `NEXT_PUBLIC_API_BASE_URL` = backend URL.
5. Set backend `CORS_ALLOWED_ORIGINS` / `CSRF_TRUSTED_ORIGINS` to the real
   frontend URL and redeploy the backend.

## Local development (unchanged)

```bash
# backend  (SQLite, DEBUG=True — see backent/.env)
cd backent && ../venv/Scripts/python.exe manage.py runserver 8000

# frontend
cd frontend && npm run dev
```

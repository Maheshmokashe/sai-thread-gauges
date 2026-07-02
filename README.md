# SAI Thread Gauges &amp; Tools — Website

A full rebuild of the SAI Thread Gauges &amp; Tools site: **Django REST API + PostgreSQL** backend and a **React** frontend, using the company's real product photos, real gauge data and real business details.

```
sai/
├── sai-backend/     Django + DRF API (products, categories, enquiries)
├── sai-react/       React single-page frontend
└── render.yaml      One-click deploy blueprint (Render.com)
```

Design concept — **"the calibration certificate":** a light drawing-paper interface where every measurement is set in monospace and GO/NOGO green/red are used only as real status markers, grounded in what SAI actually makes.

---

## Run it locally

You need **Python 3.10+** and **Node 18+**. Postgres is optional locally — the backend falls back to SQLite so it runs with zero setup.

### 1. Backend (Django API)

```bash
cd sai-backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt

python manage.py migrate
python manage.py seed           # loads the 9 real gauges + 5 categories
python manage.py createsuperuser   # optional — for the /admin panel
python manage.py runserver      # API at http://127.0.0.1:8000
```

Enquiries submitted in dev are **printed to this terminal** (console email backend) so you can see them without configuring mail.

### 2. Frontend (React)

In a second terminal:

```bash
cd sai-react
npm install
npm start                       # opens http://localhost:3000
```

The frontend talks to the API at `http://127.0.0.1:8000` by default. To point it elsewhere, set `REACT_APP_API_URL` (see `.env.example`).

---

## Using PostgreSQL locally

1. Create a database and user in Postgres.
2. In `sai-backend/`, copy `.env.example` to `.env` and set:
   ```
   DATABASE_URL=postgres://USER:PASSWORD@localhost:5432/DBNAME
   ```
3. Re-run `python manage.py migrate` and `python manage.py seed`.

That's the only change — the app auto-detects `DATABASE_URL` and switches from SQLite to Postgres.

---

## Real enquiry emails

By default new enquiries are saved to the database **and** the form shows an honest
success/error state (it never fakes success). To also email them to the business:

In `sai-backend/.env` (or your host's env vars):

```
EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
EMAIL_HOST_USER=saithreadgauges@gmail.com
EMAIL_HOST_PASSWORD=<a Gmail App Password, not the account password>
ENQUIRY_NOTIFY_EMAIL=saithreadgauges@gmail.com
```

> Gmail requires an **App Password** (Google Account → Security → 2-Step Verification →
> App passwords). The normal account password will not work for SMTP.

If email ever fails, the enquiry is still saved and viewable in `/admin` — mail problems never lose a lead.

---

## The API

Base URL `…/api/`

| Method | Endpoint                     | Purpose                                   |
|--------|------------------------------|-------------------------------------------|
| GET    | `/products/`                 | List products (`?category=snap`, `?featured=1`, `?search=M14`) |
| GET    | `/products/<slug>/`          | One product                               |
| GET    | `/categories/`               | Categories with product counts            |
| POST   | `/enquiries/`                | Submit an enquiry (throttled 10/hour/IP)  |

Product images are bundled with the frontend and keyed by `image_key`, so photos always
show even before any admin uploads. Uploading an image on a product in `/admin` overrides
the bundled one.

---

## Deploy to Render (free tier)

1. Push this folder to a GitHub repo.
2. Render dashboard → **New → Blueprint** → pick the repo. It reads `render.yaml` and
   creates the Postgres database, the API service and the static site.
3. After the first deploy, confirm the service URLs match the env vars in `render.yaml`
   (`sai-api.onrender.com` / `sai-web.onrender.com`); adjust `ALLOWED_HOSTS`,
   `CORS_ALLOWED_ORIGINS` and `REACT_APP_API_URL` if you use custom names or a domain.
4. Add the three `EMAIL_*` variables to the **sai-api** service for live enquiry emails.

> **Free-tier note:** Render spins services down when idle, so the first request after a
> quiet spell can take ~50 seconds while the API wakes. The contact form already handles a
> slow/cold API gracefully and tells the visitor to call or WhatsApp if it times out.

---

## What changed from the previous site

- **Founded 2005** (corrected), real proprietor/founder, real customers — no invented stats.
- **Real product catalogue** with the actual gauges and their etched GO/NOGO numbers.
- **Contact form no longer fakes success** — it reports real success or failure and always
  saves the enquiry, with a call/WhatsApp fallback on error.
- **Enquiry email notification** to the business on every submission.
- **SEO**: descriptive titles/descriptions per page, Open Graph tags and LocalBusiness
  structured data with the real address, founder and phone.
- **WhatsApp** floating button and per-product WhatsApp quote links.
- Distinctive, subject-grounded visual design instead of a generic template.

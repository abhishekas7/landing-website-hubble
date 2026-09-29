# Cavli Hubble — Landing Website

> **IoT Connectivity & Modem Management Platform** — a Next.js landing page with a built-in Playwright web scraper that seeds its own navigation from a live trade-show catalogue and stores structured exhibitor data in PostgreSQL.

**Demo / Video:** [Watch on Google Drive](https://drive.google.com/file/d/1y6geg3x12tErd4Zhm64nhvZhBxBTGBir/view?usp=drive_link)

---

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Project Setup — Local](#project-setup--local)
3. [Project Setup — Docker](#project-setup--docker)
4. [Environment Variables](#environment-variables)
5. [Database Schema](#database-schema)
6. [Triggering the Scraper](#triggering-the-scraper)
7. [Consult / Contact Form API](#consult--contact-form-api)
8. [Project Structure](#project-structure)

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Database | PostgreSQL 16 |
| DB Client | `pg` (node-postgres) |
| Scraping | Playwright (headless Chromium) |
| Fonts | Google Fonts — Arimo, Gelasio, Inter |
| Container | Docker + Docker Compose |

---

## Project Setup — Local

### Prerequisites

- Node.js ≥ 20
- Yarn 1.x (`npm i -g yarn`)
- A running PostgreSQL instance

### Steps

```bash
# 1. Clone the repository
git clone <repo-url>
cd landing-website-hubble

# 2. Install dependencies
yarn install

# 3. Install the Playwright Chromium browser (one-time setup)
npx playwright install chromium

# 4. Set up environment variables
cp .env.example .env
# → Edit .env with your DB credentials (see Environment Variables section)

# 5. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> **Note:** On first run the navbar will be empty. You must [trigger the scraper](#triggering-the-scraper) once to seed the `nav_links` table.

---

## Project Setup — Docker

Docker Compose orchestrates the **Next.js app** and a **PostgreSQL database** together. No external database setup is required.

### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (or Docker Engine + Compose v2 plugin)

### Steps

```bash
# 1. Clone the repository
git clone <repo-url>
cd landing-website-hubble

# 2. Create a .env file — the DB service is created using these values
cp .env.example .env
# → Fill in DB_USER, DB_PASSWORD, DB_NAME at minimum

# 3. Build images and start all services
docker compose up --build

# App is now available at http://localhost:3000
```

Run in detached (background) mode:

```bash
docker compose up --build -d

# View live logs
docker compose logs -f app
```

Stop services:

```bash
docker compose down

# Also destroy the database volume (⚠ deletes all data permanently)
docker compose down -v
```

### Service Architecture

```
 HOST MACHINE
 ┌──────────────────────────────────────────────────────┐
 │  localhost:3000  ──▶  hubble_app (Next.js)           │
 │                            │                         │
 │                    Docker network                    │
 │                            │                         │
 │                            ▼                         │
 │                    hubble_db (PostgreSQL 16)         │
 │                    internal port :5432               │
 └──────────────────────────────────────────────────────┘
```

The app service connects to the DB using `DB_HOST=db`, which Docker resolves to the `hubble_db` container automatically within the shared network.

---

## Environment Variables

Create `.env` at the project root (it is git-ignored by default):

```env
# ── Application ──────────────────────────────────────────
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# ── PostgreSQL ───────────────────────────────────────────
DB_HOST=localhost        # Use "db" when running inside Docker Compose
DB_PORT=5432
DB_NAME=hubble
DB_USER=postgres
DB_PASSWORD=your_secure_password
```

Commit `.env.example` as a safe, secret-free template:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=hubble
DB_USER=postgres
DB_PASSWORD=
```

> **Docker note:** When running via `docker compose`, set `DB_HOST=db` so the app container resolves to the `db` service. The Compose file already does this automatically; you only need the correct `DB_*` credential values.

---

## Database Schema

All tables are created automatically on the first `POST /api/scrape/exhibitors` call via `initDatabase()`. All `INSERT` statements use `ON CONFLICT` upserts, making every scrape run fully **idempotent**.

### Entity Relationship Diagram

```
 countries          companies                       exhibitors
 ─────────          ─────────                       ──────────
 id  (PK)  ◀──┐    id         (PK)    ┌──────────▶ id         (PK)
 name           └── country_id (FK)   │            company_id (FK) ──▶ companies.id
                    name       UNIQUE  │            booth_id   (FK) ──┐
                    image_url          │                              │
                    source_url         │  booths                     │
                                       │  ──────                     │
 events                                │  id      (PK) ◀─────────────┘
 ──────                                │  hall_id (FK) ──┐
 id  (PK) ◀────────────────────────┐  │  booth_no        │
 name      UNIQUE                  │  │                  │
                                   │  │  halls            │
 nav_links                         │  │  ─────            │
 ─────────                         │  │  id      (PK) ◀──┘
 id   (PK)                         │  │  event_id (FK) ──▶ events.id
 text                               └──┘  hall_no
 href UNIQUE

 consultations   (standalone — created by POST /api/consult)
 ─────────────
 id         (PK)
 name
 email
 phone
 company
 message
 created_at
```

---

### Table Descriptions

Third normal form is a key concept of database normalization that removes unwanted dependencies. 3NF builds upon first normal form (1NF) and second normal form (2NF), meaning that it inherits their rules: 1NF requires atomic (indivisible) values in each cell, and 2NF removes partial dependencies on a composite primary key. 3NF takes it further by removing transitive dependencies, a situation where non-key attributes depend indirectly on the primary key.

By focusing on this, 3NF ensures that each non-key column in a table is directly tied to the primary key and nothing else. In more practical terms, 3NF helps minimize redundancy and avoid anomalies when inserting, updating, or deleting data.

#### `countries`

Stores deduplicated country names extracted from exhibitor cards.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | `SERIAL` | `PRIMARY KEY` | Auto-increment surrogate key |
| `name` | `VARCHAR(100)` | `NOT NULL UNIQUE` | Country name (e.g. `"India"`) |

**Normalization rationale:** Extracting country into its own table eliminates repeating the string across thousands of `companies` rows (satisfies 1NF → 3NF). A future update to a country name needs only one row change; FK integrity enforces consistency.

---

#### `events`

Stores the trade-show / event names. The scraper maps the exhibitor's `location` field to the event name.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | `SERIAL` | `PRIMARY KEY` | Auto-increment |
| `name` | `VARCHAR(255)` | `NOT NULL UNIQUE` | Event name (e.g. `"EP BLR 2026"`) |

---

#### `companies`

Core entity — one row per unique exhibiting company.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | `SERIAL` | `PRIMARY KEY` | Auto-increment |
| `name` | `VARCHAR(255)` | `NOT NULL UNIQUE` | Company display name |
| `country_id` | `INTEGER` | `FK → countries.id` | Country the company is from |
| `image_url` | `TEXT` | — | Company logo / image URL |
| `source_url` | `TEXT` | — | Deep-link into the catalogue |

**Normalization rationale:** Decoupling company identity from booth assignment allows one company to participate in multiple events / occupy multiple booths without duplicating its name, logo, or country reference.

---

#### `halls`

A physical hall within an event venue. Unique per `(event, hall_no)` pair.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | `SERIAL` | `PRIMARY KEY` | Auto-increment |
| `event_id` | `INTEGER` | `NOT NULL FK → events.id` | Parent event |
| `hall_no` | `VARCHAR(50)` | — | Hall label (e.g. `"Hall 5"`) |
| — | — | `UNIQUE (event_id, hall_no)` | Prevents duplicate halls per event |

---

#### `booths`

A specific booth slot within a hall.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | `SERIAL` | `PRIMARY KEY` | Auto-increment |
| `hall_id` | `INTEGER` | `NOT NULL FK → halls.id` | Parent hall |
| `booth_no` | `VARCHAR(50)` | — | Booth label (e.g. `"B-24"`) |
| — | — | `UNIQUE (hall_id, booth_no)` | One booth slot per hall |

---

#### `exhibitors`

Many-to-many junction table linking a **company** to a **booth**.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | `SERIAL` | `PRIMARY KEY` | Auto-increment |
| `company_id` | `INTEGER` | `NOT NULL FK → companies.id` | The exhibiting company |
| `booth_id` | `INTEGER` | `NOT NULL FK → booths.id` | The assigned booth |
| — | — | `UNIQUE (company_id, booth_id)` | Prevents duplicate assignments |

**Normalization rationale:** This is a classic BCNF bridge table. Separating the assignment relationship from both entities means: (a) a company can exhibit at many booths across events, and (b) `ON CONFLICT DO NOTHING` makes re-scraping fully safe with zero duplicate rows.

---

#### `nav_links`

Navigation items scraped from the catalogue site's top nav bar. These are read by `layout.tsx` on every server render to populate `<Navbar>` — no scraping at page load time.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | `SERIAL` | `PRIMARY KEY` | Auto-increment, determines display order |
| `text` | `VARCHAR(100)` | `NOT NULL` | Link display label (e.g. `"Exhibitors"`) |
| `href` | `TEXT` | `NOT NULL UNIQUE` | Full URL — uniqueness prevents duplicates |

---

#### `consultations`

Stores contact/consultation requests submitted via the **"Talk to us"** form on the landing page. This table is **not** part of `initDatabase()` — it is created automatically (lazily) on the first `POST /api/consult` call.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | `SERIAL` | `PRIMARY KEY` | Auto-increment surrogate key |
| `name` | `VARCHAR(255)` | `NOT NULL` | Submitter's full name |
| `email` | `VARCHAR(255)` | `NOT NULL` | Contact email address |
| `phone` | `VARCHAR(50)` | — | Optional phone number |
| `company` | `VARCHAR(255)` | — | Optional company / organisation |
| `message` | `TEXT` | `NOT NULL` | The enquiry or message body |
| `created_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | UTC timestamp of submission |

**Validation** (enforced in the API before any DB write):
- `name`, `email`, and `message` are **required** — returns `400` if missing.
- `email` is validated against a basic RFC-style regex — returns `400` on bad format.
- `phone` and `company` are optional and stored as `NULL` when omitted.

---

## Triggering the Scraper

The scraper launches a **headless Chromium browser** via Playwright, navigates to the live MMI Connect catalogue, waits for Angular to hydrate, then extracts exhibitor cards and nav links. It runs **on demand** only — never on page load.

### Trigger via HTTP (recommended)

```bash
# Scrape page 1 with default limit of 20
curl -X POST http://localhost:3000/api/scrape/exhibitors

# Custom pagination
curl -X POST "http://localhost:3000/api/scrape/exhibitors?page=1&limit=50"

# Or via JSON body
curl -X POST http://localhost:3000/api/scrape/exhibitors \
  -H "Content-Type: application/json" \
  -d '{ "page": 1, "limit": 50 }'
```

### What happens on POST

```
POST /api/scrape/exhibitors
    │
    ├─ 1. initDatabase()
    │      CREATE TABLE IF NOT EXISTS for all 7 scraper tables
    │      (countries, events, companies, halls, booths, exhibitors, nav_links)
    │
    ├─ 2. extractExhibitors(page, limit)
    │      → Playwright launches headless Chromium
    │      → Navigates to mmiconnect.in/app/catalogue/exhibitors/ep-blr-2026
    │      → Waits for Angular container + <a> cards to be visible
    │      → Evaluates DOM: extracts companyName, country, hallNo,
    │        boothNo, location, imageUrl, href for each card
    │      → Also extracts nav bar <a> items (text + href)
    │      → Paginates the exhibitor list before returning
    │
    ├─ 3. saveExhibitors(exhibitors)
    │      Upsert chain (inside a single transaction):
    │        country → event → company → hall → booth → exhibitor
    │
    └─ 4. Response JSON
           {
             "success": true,
             "page": 1,
             "limit": 50,
             "total": 312,
             "scraped": 50,
             "saved": 50,
             "exhibitors": [...],
             "navLinks": [{ "text": "Exhibitors", "href": "..." }, ...]
           }
```

### Reading nav links (GET — no scraping)

`layout.tsx` uses this endpoint on every server render. It only queries the database — Playwright is never launched.

```bash
curl http://localhost:3000/api/scrape/exhibitors
```

```json
{
  "success": true,
  "navLinks": [
    { "text": "Exhibitors", "href": "https://mmiconnect.in/..." },
    { "text": "Floor Plan",  "href": "https://mmiconnect.in/..." }
  ]
}
```

### Re-running safely

All inserts use `ON CONFLICT ... DO UPDATE` (upsert) or `DO NOTHING`. Running the scraper multiple times is **safe** — no duplicate rows will be created.

---

## Consult / Contact Form API

The `POST /api/consult` endpoint handles form submissions from the **ConsultSection** component. It lazily creates the `consultations` table on first use.

### Request

```bash
curl -X POST http://localhost:3000/api/consult \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "email": "jane@example.com",
    "phone": "+91 98765 43210",
    "company": "Acme IoT",
    "message": "We are interested in Hubble connectivity solutions."
  }'
```

| Field | Required | Notes |
|-------|----------|-------|
| `name` | yes | Trimmed; `400` if blank |
| `email` | yes | Validated with regex; `400` if invalid |
| `message` | yes | Trimmed; `400` if blank |
| `phone` | No | Stored as `NULL` if omitted |
| `company` | No | Stored as `NULL` if omitted |

### Success Response (`201`)

```json
{
  "success": true,
  "message": "Consultation submitted successfully",
  "data": {
    "id": 1,
    "name": "Jane Doe",
    "email": "jane@example.com",
    "phone": "+91 98765 43210",
    "company": "Acme IoT",
    "message": "We are interested in Hubble connectivity solutions.",
    "created_at": "2026-09-29T04:30:00.000Z"
  }
}
```

### Error Responses

| Status | Condition |
|--------|-----------|
| `400` | Missing required field (`name`, `email`, or `message`) |
| `400` | Malformed email address |
| `500` | Database / server error |

---

## Project Structure

```
landing-website-hubble/
│
├── app/
│   ├── api/
│   │   ├── consult/                   # Contact/consult form API
│   │   └── scrape/
│   │       └── exhibitors/
│   │           └── route.ts           # GET (read DB) / POST (scrape + save)
│   │
│   ├── components/
│   │   ├── Banner.tsx                 # Hero banner
│   │   ├── ConsultSection.tsx         # "Talk to us" CTA section
│   │   ├── Header.tsx                 # Top announcement bar
│   │   ├── Navbar.tsx                 # Nav populated from DB via layout.tsx
│   │   └── ProductSection.tsx         # Product card grid
│   │
│   ├── constants/                     # Shared constants
│   ├── data/                          # Static data (products, etc.)
│   │
│   ├── lib/
│   │   ├── db.ts                      # pg.Pool singleton (shared DB client)
│   │   └── scraper/
│   │       ├── exhibitors.ts          # Playwright scrape logic
│   │       └── db/
│   │           ├── initDb.ts          # CREATE TABLE IF NOT EXISTS (all tables)
│   │           ├── exhibitors.ts      # saveExhibitors() upsert transaction
│   │           ├── navLinks.ts        # saveNavLinks() upsert
│   │           └── startup.ts         # init + scrape + save helper (manual use)
│   │
│   ├── services/
│   │   └── apiService.ts             # Typed fetch() wrapper (.get / .post)
│   │
│   ├── types/
│   │   └── navbar.ts                 # NavItem { label: string; href: string }
│   │
│   ├── layout.tsx                    # Root layout — fetches navLinks server-side
│   └── page.tsx                      # Home page
│
├── public/
│   └── images/                       # Static assets (logos, illustrations)
│
├── Dockerfile                        # Multi-stage production build
├── docker-compose.yml                # App + DB orchestration
├── next.config.ts                    # output: "standalone" enabled
├── package.json
├── tsconfig.json
├── .env                              # ← never commit (git-ignored)
└── .env.example                      # ← safe template to commit
```

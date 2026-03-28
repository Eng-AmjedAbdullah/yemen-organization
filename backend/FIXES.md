# Yemen Heritage for Peace — Fix Report & Deployment Guide

## Summary

35 bugs and missing features were found and fixed across the backend.  
The fixes span **schema**, **middleware**, **every route file**, **seed.js**, and **server.js**.

---

## Files Changed

| File | Status |
|---|---|
| `schema.sql` | ✅ Fixed (v2) |
| `migrate.sql` | 🆕 New — safe migration for existing databases |
| `seed.js` | ✅ Fixed |
| `server.js` | ✅ Fixed |
| `middleware/auth.js` | ✅ Fixed |
| `routes/auth.js` | ✅ Fixed |
| `routes/admins.js` | ✅ Fixed |
| `routes/profile.js` | ✅ Fixed |
| `routes/news.js` | ✅ Fixed |
| `routes/events.js` | ✅ Fixed |
| `routes/heritage.js` | ✅ Fixed |
| `routes/contact.js` | ✅ Fixed |
| `routes/hero.js` | ✅ Fixed |
| `routes/partners.js` | ✅ Fixed |
| `routes/settings.js` | ✅ Fixed |

---

## Bug Index

### 🔴 Critical (data loss / security)

#### FIX 1 — `admins` table: missing `role` column
**File:** `schema.sql`, `admins.js`, `auth.js`, `seed.js`  
Every admin had identical power. A newly created admin could delete the original super admin, deactivate all other admins, or cause a total lockout.  
**Fix:** Added `role ENUM('super_admin','admin')`. Only `super_admin` may manage other admins. The last super_admin cannot be deleted or demoted.

#### FIX 7 — Auth middleware: deactivated admins kept full access
**File:** `middleware/auth.js`  
The original middleware only verified the JWT signature but never checked `is_active` in the database. A deactivated admin retained full API access for up to 7 days (the token TTL).  
**Fix:** Added a lightweight DB lookup on every protected request. Returns 401 if admin is missing or inactive.

#### FIX 9 — Profile: `current_password` was optional
**File:** `routes/profile.js`  
An admin with a stolen session token could change the account password without knowing the old password, locking out the real owner permanently.  
**Fix:** `current_password` is now mandatory. The endpoint always verifies the old password before accepting the new one.

#### FIX 23 — Partners: public endpoint leaked inactive records
**File:** `routes/partners.js`  
The public `GET /api/partners` accepted `?include_inactive=1` from any browser. Inactive (hidden) partners were exposed to the public.  
**Fix:** The public endpoint now always returns active partners only. The `?include_inactive` param is silently ignored.

#### FIX 26 — News: drafts were visible to the public
**File:** `routes/news.js`  
`GET /api/news/:id` returned articles regardless of `published` status. Any user who guessed an ID could read unpublished drafts.  
**Fix:** Public endpoint now enforces `AND published = 1`.

---

### 🟠 High (broken functionality)

#### FIX 2 & 3 — Events & Heritage: `updated_at` column missing
**Files:** `schema.sql`, `routes/events.js`, `routes/heritage.js`  
Both PUT routes were sending `updated_at=NOW()` in the SQL UPDATE statement but the column did not exist in the table definition. MySQL silently swallowed the error, meaning **every edit to events and heritage items was silently failing to update the timestamp** (and in strict mode servers, the entire update would fail).  
**Fix:** Added `updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP` to both tables. `migrate.sql` back-fills existing rows.

#### FIX 11 & 14 — Events & Heritage: no single-item GET endpoint
**Files:** `routes/events.js`, `routes/heritage.js`  
There was no `GET /api/events/:id` or `GET /api/heritage/:id`. Admin edit forms had no way to fetch a single record — they would have to load the entire `GET /all` list and filter client-side, which is fragile and slow.  
**Fix:** Added individual GET endpoints for both.

#### FIX 20 — Hero slides: CTA link fields not in schema or routes
**Files:** `schema.sql`, `routes/hero.js`  
The hero section on the home page can only display an image and a caption. There was no way for the admin to attach a "call to action" button to any slide.  
**Fix:** Added `link_url`, `link_text_ar`, `link_text_en` columns to `hero_slides` table and wired them through INSERT/UPDATE/GET.

#### FIX 21 & 24 — Hero & Partners: no single-item GET (admin)
**Files:** `routes/hero.js`, `routes/partners.js`  
Admin edit panels had no way to fetch one hero slide or one partner by ID.  
**Fix:** Added `GET /api/hero/:id` (auth-protected) and `GET /api/partners/:id` (auth-protected).

#### FIX 25 — Settings: admin could not manage site identity or About page
**Files:** `schema.sql`, `routes/settings.js`  
`site_name_ar`, `site_name_en`, `logo_url`, `favicon_url`, `about_desc_ar/en`, `vision_ar/en`, `mission_ar/en` were all missing from both the schema and the settings route. The About page content was hardcoded in the frontend with no admin control.  
**Fix:** All fields added to schema and settings GET/PUT route.

#### FIX 28 & 29 — JWT: `role` not included in token or `/me`
**File:** `routes/auth.js`  
The frontend had no way to know whether the logged-in user was a `super_admin` or a regular `admin` without making an extra request. Without this, the admin panel cannot conditionally show/hide super-admin-only controls (like the "Manage Admins" section).  
**Fix:** `role` is now included in the JWT payload and in the `/me` response.

---

### 🟡 Medium (missing admin features)

#### FIX 4 — Contact: missing `phone` field and admin reply tracking
**File:** `schema.sql`, `routes/contact.js`  
Contact form had no phone field. Admin had no way to track whether a message had been replied to.  
**Fix:** Added `phone VARCHAR(50)` and `replied_at DATETIME` columns.

#### FIX 15 — Contact: public form accepted missing/invalid email
**File:** `routes/contact.js`  
No email format validation. Any string (or empty value) passed the `!email` check.  
**Fix:** Added `isValidEmail()` regex check.

#### FIX 16, 17, 18 — Contact: missing admin management endpoints
**File:** `routes/contact.js`  
- No way to mark a message as *unread* after reading it.  
- No bulk "mark all as read" action.  
- No unread badge count endpoint for the admin sidebar.  
**Fix:** Added `PATCH /:id/unread`, `POST /mark-all-read`, and `GET /unread-count`.

#### FIX 27 — News: missing admin single-article GET
**File:** `routes/news.js`  
Admin edit panel could not fetch a single unpublished article by ID.  
**Fix:** Added `GET /api/news/admin/:id` (auth-protected).

#### FIX 33 — Server: no brute-force protection on login
**File:** `server.js`  
The login endpoint had no rate limiting. An attacker could try unlimited password combinations.  
**Fix:** Applied `express-rate-limit` (20 attempts per 15 min per IP) on `POST /api/auth/login`.

#### FIX 34 — Server: no global error handler
**File:** `server.js`  
Without a global Express error handler, any unhandled `next(err)` call caused a raw stack trace to be sent to the client, leaking internal implementation details.  
**Fix:** Added `app.use((err, req, res, next) => {...})` catch-all.

#### FIX 35 — Server: `/api/health` didn't check DB
**File:** `server.js`  
The health endpoint always returned `{ status: 'ok' }` even when the database was unreachable.  
**Fix:** Health endpoint now probes the DB and returns `503` if unreachable.

---

### 🟢 Low (quality / correctness)

#### FIX 8 — Admins: password minimum length was 6, should be 8
**File:** `routes/admins.js`  
**Fix:** Raised minimum to 8 characters on both create and reset-password endpoints.

#### FIX 10 — Events PUT: missing title validation
**File:** `routes/events.js`  
The original PUT had no `if (!title)` guard.  
**Fix:** Added required-field check.

#### FIX 19 — Contact: `phone` field now accepted in public POST
**File:** `routes/contact.js`  
Now that the column exists, the public POST route reads and stores it.

#### FIX 22 — Hero: NaN guard on public `?limit` param
**File:** `routes/hero.js`  
`parseInt(undefined)` returns `NaN`. Passing `NaN` to MySQL causes an error.  
**Fix:** Added `!isNaN(limit)` guard.

#### FIX 30 — Seed: first admin not seeded as `super_admin`
**File:** `seed.js`  
The seed inserted the default admin with no role column (which defaulted to `'admin'`). This meant there was never a super_admin in freshly seeded databases.  
**Fix:** Seed now explicitly sets `role = 'super_admin'`.

#### FIX 31 & 32 — Seed: new columns not included in ensureTables()
**File:** `seed.js`  
`ensureTables()` was out of sync with the real schema — missing `updated_at`, `phone`, `link_url`, and all identity/about fields.  
**Fix:** `ensureTables()` now matches the fixed schema exactly.

---

## Deployment Instructions

### Fresh install (new database)

```bash
# 1. Apply the new schema
mysql -u root -p < backend/schema.sql

# 2. Install dependencies (add rate-limit package)
cd backend
npm install
npm install express-rate-limit   # new dependency

# 3. Seed the database
node seed.js
```

### Existing database (upgrade without data loss)

```bash
# Run the migration script ONCE
mysql -u root -p yemen_heritage < backend/migrate.sql

# Then re-run seed to fill new setting defaults
cd backend && node seed.js
```

### Environment variables — no changes required
All existing `.env` values continue to work. No new required variables.

---

## Frontend — what needs updating

These backend changes add new data fields. The frontend should be updated to use them:

| New field | Where to use |
|---|---|
| `hero_slides.link_url / link_text_ar / link_text_en` | Home hero section — render CTA button on each slide |
| `site_settings.site_name_ar/en` | `<title>` tag, header logo fallback text |
| `site_settings.logo_url / favicon_url` | `<img>` for logo, `<link rel="icon">` |
| `site_settings.about_desc_ar/en` | About page description paragraph |
| `site_settings.vision_ar/en` | About page vision card |
| `site_settings.mission_ar/en` | About page mission card |
| `contact_messages.phone` | Contact form input + admin message view |
| `admins.role` | Admin panel sidebar — hide admin-management menu for regular admins |
| `GET /api/contact/unread-count` | Admin sidebar unread badge |
| `GET /api/news/admin/:id` | Admin news edit form |
| `GET /api/events/:id` | Admin events edit form |
| `GET /api/heritage/:id` | Admin heritage edit form |
| `GET /api/hero/:id` | Admin hero edit form |
| `GET /api/partners/:id` | Admin partners edit form |

# Digital QR Menu

A mobile-first restaurant menu: customers scan a QR code and see a live, always-up-to-date
menu in their browser (no app, no login). The owner edits everything — prices, descriptions,
sold-out status, images — from a password-protected `/admin` page, and changes appear on
every customer's phone within seconds.

**Stack:** React + Vite + Tailwind CSS (static frontend) + Supabase (Postgres database, Auth,
Realtime, optional image Storage). Total hosting cost: **$0**, on the free tiers of Vercel/Netlify
and Supabase.

## How it works

```
Customer's phone  ──scans QR──▶  yoursite.vercel.app  (static React app)
                                        │
                                        ▼
                                 Supabase (free tier)
                                 ├── Postgres: categories, menu_items
                                 ├── Auth: owner login
                                 └── Realtime: pushes live updates

Owner's phone/laptop ──▶ yoursite.vercel.app/admin ──▶ writes to same Postgres tables
```

Because everything reads/writes the same cloud database, there's no "sync" step and no
local storage involved — the customer view and the admin dashboard are just two different
views of one live table.

## File structure

```
qr-menu-app/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── .env.example
├── supabase/
│   └── schema.sql          ← run this in Supabase to create your tables
└── src/
    ├── main.jsx
    ├── App.jsx              ← routes: "/" menu, "/admin/login", "/admin"
    ├── index.css
    ├── supabaseClient.js
    ├── hooks/
    │   ├── useAuth.js       ← tracks owner login session
    │   └── useMenuData.js   ← loads + live-syncs categories/items
    ├── components/
    │   ├── RequireAuth.jsx  ← redirects to login if not signed in
    │   ├── CategoryNav.jsx  ← sticky tab bar (customer view)
    │   ├── MenuItemRow.jsx  ← one dish, printed-menu style
    │   ├── CategoryManager.jsx
    │   └── ItemEditModal.jsx
    └── pages/
        ├── MenuPage.jsx      ← what customers see
        ├── AdminLogin.jsx
        └── AdminDashboard.jsx
```

---

## Step-by-step setup (all free)

### 1. Create your Supabase project

1. Go to [supabase.com](https://supabase.com) → sign up free → **New project**.
2. Pick any name/region and a database password (save it somewhere safe).
3. Once the project is ready, open **SQL Editor** → **New query**, paste the entire contents
   of `supabase/schema.sql`, and click **Run**. This creates the `categories` and
   `menu_items` tables, sets up security rules, and adds a few sample rows.
4. Go to **Project Settings → API**. You'll need two values from this page in step 3 below:
   - **Project URL**
   - **anon public** key

### 2. Create your owner login

1. In Supabase, go to **Authentication → Users → Add user**.
2. Enter the restaurant owner's email and a password. Set **Auto Confirm User** to on.
3. That's it — this is the account used to sign in at `/admin`. Row Level Security
   (already configured by `schema.sql`) means only a signed-in user can edit the menu;
   everyone else can only read it.
4. Optional but recommended: turn off **Authentication → Providers → Email → Enable email
   signups** so strangers can't self-register an account. The owner's account was already
   created manually in step 2, so this doesn't lock anyone out.

### 3. Run the app locally (optional, to test before deploying)

```bash
cd qr-menu-app
npm install
cp .env.example .env
# open .env and paste your Project URL and anon key from Supabase
npm run dev
```

Visit `http://localhost:5173` for the menu and `http://localhost:5173/admin/login` to sign in.

### 4. Add your real menu

Sign in at `/admin/login`, then:
- Use **Categories** to add sections (Starters, Mains, Desserts, Drinks, etc.).
- Click **+ Add item** to add dishes: name, description, price, category, and an optional
  image URL.
- Toggle **Sold out** any time — it reflects on the customer menu instantly.

### 5. Handling images (no server upload needed)

Pick whichever is easiest for the owner:
- **Imgur / Postimages** — upload a photo on their free site, copy the "direct image link"
  (ends in `.jpg`/`.png`), paste it into the item's **Image URL** field.
- **Supabase Storage (also free)** — in Supabase, go to **Storage → Create bucket**, name it
  `menu-images`, and set it **Public**. Upload photos there, then copy each file's public
  URL (Supabase shows a **Get URL** button per file) into the item's Image URL field.

### 6. Deploy for free

**Option A — Vercel**
1. Push this folder to a GitHub repository.
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import the repo.
3. Framework preset: **Vite**. Before deploying, add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Click **Deploy**. You'll get a free `your-project.vercel.app` URL.

**Option B — Netlify**
1. Push to GitHub, then [netlify.com](https://netlify.com) → **Add new site → Import an
   existing project**.
2. Build command: `npm run build`. Publish directory: `dist`.
3. Under **Site settings → Environment variables**, add the same two `VITE_SUPABASE_*` keys.
4. Deploy — you'll get a free `your-project.netlify.app` URL.

*(GitHub Pages also works but needs a small extra config for client-side routing; Vercel or
Netlify are simpler for this app and equally free.)*

### 7. Generate the QR code

Once deployed, take your live URL (e.g. `https://your-menu.vercel.app`) and paste it into
any free QR generator (e.g. `qrcode-monkey.com` or `qr-code-generator.com`), then print it
for your tables. No further setup needed — the QR code never has to change again, even
when the menu content changes.

---

## Costs at scale

- **Vercel/Netlify free tier:** generous bandwidth for a static site; a restaurant menu
  easily stays within it.
- **Supabase free tier:** 500MB database and 1GB file storage, which is far more than a
  menu needs. If the project is inactive for 7 days the free database pauses automatically —
  just open the Supabase dashboard to unpause it (a 1-click action).

## Security notes

- Customers never see a login — they hit `/`, which only ever *reads* data.
- The `/admin` route is protected client-side (`RequireAuth.jsx`) **and** server-side: even
  if someone bypassed the frontend, Supabase's Row Level Security policies (in `schema.sql`)
  reject any write that isn't from a signed-in user.
- Never commit your `.env` file — `.gitignore` already excludes it. The anon key is safe to
  expose in the deployed frontend (it's designed to be public); it only grants the read/write
  permissions defined by your RLS policies.

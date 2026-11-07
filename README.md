# GRANTLY — Scholarship Discovery & Management (React/Vite)

Updated hackathon-ready front-end prototype based on the original GRANTLY React/Vite project.

## What's upgraded

- Responsive desktop, tablet and mobile layouts with a keyboard-accessible mobile sidebar toggle.
- Scholarship search and category/study-level filters using `Array.prototype.filter()` and `useMemo`.
- Six Indian scholarship programme records with eligibility summaries, benefit amounts, status/deadline notes, document checklists and official source links.
- Scholarship details and demo Apply Now modal.
- Simulated document picker for income certificate, marksheet and admission proof.
- Local persistence for shortlist, profile fields and application tracker using `localStorage`.
- Separate profile editor and application tracker views.
- Vercel and Netlify SPA routing configuration.

## Run locally

Requires Node.js 18+.

```bash
npm install
npm run dev
```

Open the URL printed by Vite (normally `http://localhost:5173`).

## Production build check

```bash
npm run build
npm run preview
```

The production output is created in `dist/`. There is no ESLint script in this starter; add ESLint separately if your hackathon checklist requires linting. A successful build does not replace browser/device testing.

## Deploy to Vercel

1. Push the `grantly` folder to a GitHub repository.
2. Import the repository in Vercel.
3. Set **Framework Preset** to Vite (or let Vercel detect it).
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Deploy. `vercel.json` includes an SPA rewrite for client-side routes.

## Deploy to Netlify

1. Push the `grantly` folder to a Git repository.
2. In Netlify, choose **Add new site → Import an existing project**.
3. Build command: `npm run build`.
4. Publish directory: `dist`.
5. Deploy. `netlify.toml` includes the SPA fallback redirect.

## File structure

```text
grantly/
├── index.html
├── package.json
├── vite.config.js
├── vercel.json
├── netlify.toml
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── data.js
    └── styles.css
```

## Scholarship data accuracy notes

The sample catalogue uses official government/provider references wherever possible. Current-cycle information reflected in the sample includes:

- PM YASASVI Top Class School: NSP lists fresh applications through 15 Nov 2026; the portal announcement notes temporary state exceptions. Benefit ceilings are up to ₹75,000/year for Classes 9–10 and ₹1,25,000/year for Classes 11–12.
- PM YASASVI Top Class College: up to ₹2 lakh/year tuition ceiling for private institutions, ₹3,000/month living expenses, ₹5,000/year books and one-time laptop assistance up to ₹45,000, subject to rules and eligible institution slots. NSP currently lists student applications through 30 Nov 2026.
- PM-USP CSSS: ₹12,000/year for the first three graduation years and ₹20,000/year for eligible later years/postgraduate study. The currently listed AY 2026–27 date is for renewal; fresh dates must be checked separately.
- Post-Matric ST: ₹230–₹1,200/month maintenance allowance plus eligible compulsory fees, with state-specific implementation and deadlines.
- Reliance Foundation UG: up to ₹2 lakh total; 2026–27 applications are closed. Eligibility shown is Indian resident, first-year regular full-time UG, at least 60% in Class 12, household income below ₹15 lakh and mandatory aptitude test.
- Post-Matric OBC/EBC/DNT: academic allowance varies by course (₹5,000–₹20,000) and implementation/deadline is state-specific.

**Important:** Scholarship amounts, eligibility, required documents and deadlines can change. The document list is a preparation checklist, not a guarantee of the exact documents required. Always open the linked official source and check the live form for your State/UT and academic year before applying.

## Demo vs production

This project is a front-end demo. It does **not** have a backend, user authentication, a live scholarship API, official eligibility matching, or direct submission to scholarship providers. Applications created here are demo records stored in the current browser only.

### Privacy and document upload behavior

- Profile, saved scholarship IDs, application details and selected **file names** are saved in `localStorage` on this device/browser.
- The file picker is simulated. File contents are not uploaded, transmitted or persisted.
- Do not choose actual Aadhaar, bank, income or other sensitive documents in this demo. Never collect or store Aadhaar numbers in a client-only prototype.
- `localStorage` is not secure storage and can be cleared by the browser. Do not use it for sensitive personal data or production authentication.

For production, add a secure backend, database, authenticated access, server-side validation, consent, encrypted private object storage and a documented data-retention policy. Use official provider application links rather than claiming GRANTLY itself submits applications unless a verified integration exists.

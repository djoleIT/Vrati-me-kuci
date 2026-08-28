# Vrati Me Kući — uputstvo

## NOVO — statistika skeniranja u adminu
1. Pokreni ponovo ceo `supabase_schema.sql` u Supabase SQL Editoru (dodaje `scan_events` tabelu — bezbedno za ponovno pokretanje)
2. Admin panel sad ima kolonu "Skeniranja" — broj i vreme poslednjeg skeniranja po narudžbini
3. (Nalog za vlasnike da sami vide/menjaju svoj profil je uklonjen po dogovoru — može se dodati kasnije ako zatreba)

## NOVO — pravi domen
Sad kad imaš `vratimekuci.com`:
1. U Vercel → Settings → Domains, poveži `vratimekuci.com`
2. U Vercel → Environment Variables, dodaj `NEXT_PUBLIC_SITE_URL=https://vratimekuci.com`
   (koristi se za QR linkove, sitemap i meta tagove — bez ovoga i dalje radi, samo koristi rezervni domen kao fallback)

## HITNO — ako dobiješ grešku "Could not find the page_mode column"
Pokreni `fix-schema-cache.sql` u Supabase SQL Editoru (dodaje kolone i osvežava keš sheme).

## 1. Šta prvo da promeniš
Otvori `lib/config.js`:
- pravi email (`CONTACT_EMAIL`), SMS broj (`SMS_CONTACT`)
- cene (`REGULAR_PRICE`, `PROMO_PRICE`, `ENGRAVED_PRICE`)

## 2. GitHub (upload kroz browser)
1. Otvori repo na github.com → **Add file → Upload files**
2. Otpakuj zip, uđi UNUTAR foldera `vrati-me-kuci`, selektuj SVE i prevuci u upload
3. Commit changes

## 3. Supabase
1. **SQL Editor → New query** — nalepi ceo `supabase_schema.sql`, **Run** (bezbedno za ponovno pokretanje)
2. **Authentication → Users → Add user** — tvoj login za `/admin`
3. **Project Settings → API** — zapamti Project URL, anon key, service_role key

## 4. Vercel — Environment Variables
`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_EMAILS`

## 5. Kad dobiješ prave slike
Ubaci u `public/images/gallery/` kao `1.jpg`, `2.jpg`, `3.jpg` — automatski zamenjuju placeholder.

## Struktura sajta (sad sa pravim tabovima)
```
app/
  layout.js                → root layout (samo LanguageProvider)
  (site)/                  → sve marketinške stranice, dele Nav + Footer
    layout.js                → ubacuje <Nav/> i <Footer/>
    page.js                   → Početna
    naruci/page.js             → forma za narudžbinu (glavni CTA)
    kako-radi/page.js          → How it works + primeri skeniranja
    cene/page.js                → cenovnik (standardni/gravirani)
    galerija/page.js            → slike
    faq/page.js                  → pitanja
    kontakt/page.js              → email + SMS
    privacy/page.js, terms/page.js → puni pravni tekstovi
  admin/                    → panel (odvojen, sopstveni header, van (site) grupe)
  p/[slug]/                 → javna stranica za skeniranje (odvojena, van (site) grupe)
  api/                      → create-order, qr export, status update
components/
  Nav.js, Footer.js          → deljeni header/footer za (site) stranice
  ScanPreview.js              → mockup telefona — kako izgleda skeniranje (kontakt / slobodan režim)
  Gallery.js, Faq.js
lib/
  config.js                  → cene, email, SMS — MENJAJ OVDE
  i18n.js                     → prevodi, uključujući nove tabove i "nije izgubljen" tekstove
  validators.js, slug.js, countries.js
  supabase-browser.js, supabase-server.js, supabase-admin.js
middleware.js               → štiti samo /admin
supabase_schema.sql         → uključuje i page_mode kolonu (kontakt / slobodan)
```

## Nova funkcija: "Nije izgubljen" režim
Prilikom pravljenja profila, vlasnik bira:
- **Kontakt uključen** (podrazumevano) — nalazač odmah vidi dugme za poziv
- **Ljubimac samo slobodno šeta** — javna stranica prikazuje samo umirujuću poruku,
  bez isticanja tvog broja (mala opcija "ipak pozovi" ostaje ako si ostavio telefon vidljiv)

Admin panel prikazuje koji je režim izabran za svaku narudžbinu.

## Šta NIJE uključeno
- Login za vlasnike da sami menjaju podatke bez menjanja QR koda
- Automatska integracija sa kurirskom službom
- Plaćanje karticom (samo pouzeće)
- Lažni brojevi "zadovoljnih korisnika" — namerno izostavljeno dok ne postoje pravi podaci (vidi napomenu u chatu)

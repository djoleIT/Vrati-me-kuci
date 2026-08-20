# Vrati Me Kući — uputstvo

## 1. Šta prvo da promeniš (pre uploada)
Otvori `lib/config.js` u bilo kom tekst editoru i upiši:
- pravi email na koji kupci mogu da pišu (`CONTACT_EMAIL`)
- cene, ako se menjaju (`REGULAR_PRICE`, `PROMO_PRICE`, `ENGRAVED_PRICE`)
- SMS broj za kontakt (`SMS_CONTACT`) — trenutno je 064 442 4982, promeni ako treba

Sve ostalo u projektu automatski čita ove vrednosti sa jednog mesta.

## 2. GitHub (upload kroz browser, bez terminala)
1. Otvori svoj repository na github.com
2. Klikni **Add file → Upload files**
3. Otpakuj ovaj zip na računaru, uđi UNUTAR foldera `vrati-me-kuci` (da vidiš `app`, `lib`, `package.json`...),
   selektuj sve i prevuci u polje za upload
4. Dole upiši poruku komita (npr. "finalna verzija") i klikni **Commit changes**
5. Ako neki folder sa uglastim zagradama (npr. `p/[slug]`) ne ode kako treba, javi mi tačno šta
   nedostaje u repou pa rešavamo zajedno

## 3. Supabase
1. **SQL Editor → New query** — nalepi ceo sadržaj `supabase_schema.sql`, klikni **Run**
   (bezbedno je pokrenuti više puta, neće pući na "already exists")
2. Proveri u **Table Editor** da postoje: `pets`, `owner_addresses`, `orders`
3. **Authentication → Users → Add user** — tvoj email + lozinka = login za `/admin`
4. **Project Settings → API** — zapamti:
   - Project URL
   - anon public ključ
   - service_role ključ (tajni, nikad ga ne deli)

## 4. Vercel
**Settings → Environment Variables**, dodaj (za Production, Preview i Development):

| Name | Value |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Project URL iz Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | anon public ključ |
| `SUPABASE_SERVICE_ROLE_KEY` | service_role ključ |
| `ADMIN_EMAILS` | tvoj email (isti kao gore) |

Sačuvaj → **Deployments** → **Redeploy** (ili sačekaj automatski build posle uploada na GitHub).

## 5. Testiranje
- Otvori `tvoj-projekat.vercel.app`, popuni formu, poruči test profil
- Skeniraj QR kod telefonom — treba da otvori `/p/xxxxxx` sa pravim podacima
- Idi na `/admin`, uloguj se, proveri da vidiš narudžbinu, probaj "Preuzmi SVG" i "Kopiraj podatke"

## 6. Kad dobiješ prave slike pasa sa privezkom
Ubaci ih u `public/images/gallery/` pod imenima `1.jpg`, `2.jpg`, `3.jpg` (pregazi placeholder).
Sajt će ih automatski prikazati na početnoj strani — ne treba dirati kod.

## Struktura projekta
```
app/
  page.js                      → početna strana (hero, forma, cena, galerija, FAQ, footer)
  layout.js, globals.css
  robots.js                    → sakriva /admin od pretraživača
  p/[slug]/page.js              → javna stranica koju vidi neko ko skenira QR
  terms/page.js, privacy/page.js → uslovi korišćenja / politika privatnosti (predlošci — dopuni tekst)
  admin/
    page.js                    → admin panel: svi kupci, kontakt, adresa, status, izvoz
    CopyButton.js               → kopira sve podatke narudžbine u clipboard
    StatusSelect.js             → menja status narudžbine
    login/page.js, logout/route.js
  api/
    create-order/route.js       → prima formu, upisuje u bazu
    qr/[slug]/route.js           → generiše SVG (QR + ime ljubimca) za 3D štampu — samo za admina
    orders/[id]/status/route.js  → menja status narudžbine
components/
  Gallery.js   → slike (placeholder dok ne ubaciš prave, vidi tačku 6)
  Faq.js       → često postavljana pitanja
lib/
  config.js            → cene i kontakt email — MENJAJ OVDE
  validators.js         → filteri za polja (samo slova / samo cifre)
  slug.js               → generisanje jedinstvenog ID-ja za QR
  supabase-browser.js, supabase-server.js, supabase-admin.js → tri odvojena klijenta (ne spajati u jedan!)
  i18n.js               → prevodi (SR/EN/RU/ZH/DE)
  countries.js          → pozivni brojevi
middleware.js           → štiti /admin rute (samo email iz ADMIN_EMAILS)
supabase_schema.sql     → SQL za tabele i pravila pristupa
```

## Kako radi QR kod (bitno da razumeš)
Kad korisnik otvori formu, sajt ODMAH generiše jedinstveni kod (slug) i prikazuje pravi QR koji
već vodi na `/p/taj-kod`. Isti taj kod se šalje kad korisnik potvrdi narudžbinu — znači QR koji
vidiš u pregledu je bukvalno isti onaj koji ide na privezak. Nema šanse da se QR i baza raziđu.

## Šta NIJE uključeno (mogući sledeći koraci)
- Login za vlasnike ljubimaca da sami menjaju svoje podatke bez menjanja QR koda
- Automatska integracija sa kurirskom službom (adresa se ručno prepisuje iz admin panela)
- Plaćanje karticom (trenutno samo pouzeće)

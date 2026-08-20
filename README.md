# Vrati Me Kući — uputstvo za postavljanje

## 1. GitHub
1. Otpakuj ceo ovaj folder (`vrati-me-kuci`) na računaru
2. Kopiraj SVE fajlove i foldere iz njega u svoj postojeći GitHub repo folder (na svom računaru),
   pregazi (overwrite) sve što se poklapa po imenu
3. U terminalu, unutar tog repo foldera:
   ```
   git add .
   git commit -m "Prava verzija sa bazom i admin panelom"
   git push
   ```

## 2. Supabase
1. Otvori svoj Supabase projekat → **SQL Editor** → **New query**
2. Otvori fajl `supabase_schema.sql` iz ovog paketa u bilo kom tekstualnom editoru, kopiraj SAV sadržaj,
   nalepi u SQL Editor i klikni **Run**. (Fajl je bezbedan za pokretanje više puta, neće pući na
   "already exists".)
3. Proveri u **Table Editor** da li sada postoje tabele: `pets`, `owner_addresses`, `orders`
4. Idi na **Authentication → Users → Add user**. Unesi svoj email i lozinku — ovo je tvoj login za `/admin`
5. Idi na **Project Settings → API** i zapamti/kopiraj:
   - **Project URL**
   - **anon public** ključ
   - **service_role** ključ (tajni — nikad ga ne šalji nikom niti stavljaj direktno u kod)

## 3. Vercel
1. Otvori svoj Vercel projekat → **Settings → Environment Variables**
2. Dodaj tačno ove 4 promenljive (Name / Value), za **Production, Preview i Development**:

   | Name | Value |
   |---|---|
   | `NEXT_PUBLIC_SUPABASE_URL` | Project URL iz Supabase |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | anon public ključ |
   | `SUPABASE_SERVICE_ROLE_KEY` | service_role ključ |
   | `ADMIN_EMAILS` | tvoj email (isti kao u koraku 2.4) |

3. Sačuvaj, pa idi na **Deployments** tab i klikni **Redeploy** na poslednjem deploy-u
   (ili samo sačekaj — svaki `git push` iz koraka 1 automatski pokreće novi build)

## 4. Testiranje
- Otvori link koji ti Vercel daje (`tvoj-projekat.vercel.app`)
- Popuni formu, poruči test profil
- Skeniraj dobijeni QR kod telefonom — treba da te odvede na `/p/xxxxxx` stranicu sa pravim podacima
- Idi na `tvoj-projekat.vercel.app/admin`, uloguj se email/lozinkom iz koraka 2.4,
  proveri da li vidiš narudžbinu, i probaj dugme za SVG export

## Struktura projekta
```
app/
  page.js              → početna strana (forma za profil)
  layout.js, globals.css
  robots.js            → sakriva /admin od pretraživača
  p/[slug]/page.js      → javna stranica koju vidi neko ko skenira QR
  admin/
    page.js            → admin panel (zaštićen)
    login/page.js
    logout/route.js
    StatusSelect.js
  api/
    create-order/route.js     → prima formu, upisuje u bazu
    qr/[slug]/route.js         → generiše SVG (QR + ime ljubimca) za 3D štampu
    orders/[id]/status/route.js → menja status narudžbine
lib/
  supabase-browser.js  → klijent za client komponente
  supabase-server.js   → klijent za server komponente (auth sesija)
  supabase-admin.js    → servisni klijent (pun pristup bazi) + provera admin email-a
  i18n.js              → prevodi (SR/EN/RU/ZH/DE)
  countries.js         → pozivni brojevi
middleware.js          → štiti /admin rute
supabase_schema.sql    → SQL za tabele i pravila pristupa
```

## Šta NIJE uključeno (mogući sledeći koraci)
- Login za vlasnike ljubimaca da sami menjaju svoje podatke bez menjanja QR koda
- Automatska integracija sa kurirskom službom (adresa se ručno prepisuje iz admin panela)
- Plaćanje karticom (trenutno samo pouzeće)

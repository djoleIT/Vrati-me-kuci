"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

export const LANGS = [
  { code: "sr", label: "Srpski" },
  { code: "en", label: "English" },
  { code: "ru", label: "Русский" },
  { code: "zh", label: "中文" },
  { code: "de", label: "Deutsch" },
];

const dict = {
  sr: {
    tagline: "Ako se izgubi, QR kod ga vraća kući.",
    heroSub:
      "Unesi podatke svog ljubimca, mi napravimo jedinstveni QR kod, 3D odštampamo privezak i pošaljemo ti ga na adresu.",
    heroPoints: [
      { title: "Unesi podatke", text: "Popuni kratak profil svog ljubimca sa tvojim kontakt informacijama." },
      { title: "Mi pravimo privezak", text: "Generišemo jedinstven QR kod i 3D štampamo izdržljiv privezak koji ti stiže direktno na kućnu adresu." },
      { title: "Brz povratak kući", text: "Ako tvoj ljubimac odluta, nalazač skenira QR kod telefonom i odmah vidi tvoj broj kako bi te pozvao." },
    ],
    galleryTitle: "Kako izgleda u stvarnosti",
    faqTitle: "Česta pitanja",
    trustBadges: ["Plaćanje pouzećem", "Podaci se ne dele bez dozvole", "Izdržljiva 3D štampa"],
    trustFacts: [
      { title: "Bez mesečne pretplate", text: "Platiš privezak jednom, sajt i QR kod ostaju besplatni zauvek." },
      { title: "Ne treba posebna aplikacija", text: "Svaki telefon sa kamerom skenira QR kod — Android, iPhone, bilo koji." },
      { title: "100% sigurno plaćanje", text: "Plaćaš isključivo pouzećem kuriru — nikad ne ostavljaš podatke kartice na sajtu." },
      { title: "Udoban za ljubimca", text: "Privezak stoji u visini ogrlice, dizajniran tako da ga pas ne može zvakati." },
    ],
    tagStandard: "Standardni privezak",
    tagStandardDesc: "QR kod odštampan na izdržljivom 3D privezku.",
    tagEngraved: "Gravirani privezak",
    tagEngravedDesc: "QR kod lasersko gravirán na privezku — premium izgled i trajnost.",
    smsLabel: "ili SMS na",
    navHome: "Početna",
    navHowItWorks: "Kako radi",
    navPricing: "Cenovnik",
    navOrder: "Poruči",
    navFaq: "Pitanja",
    navGallery: "Slike",
    navContact: "Kontakt",
    navMyProfile: "Moj profil",
    eyebrow: "Besplatan profil · fizički privezak pouzećem",
    scanCta: "Skeniraj",
    viewFullProcess: "Vidi ceo proces →",
    orderStandardCta: "Poruči standardni →",
    orderEngravedCta: "Poruči gravirani →",
    footerPrivacy: "Politika privatnosti",
    footerTerms: "Uslovi korišćenja",
    scanFoundLabel: "Ovaj ljubimac je pronađen",
    scanAllergyNote: "⚠ Alergična na pčele",
    scanRoamingLabel: "Sve je u redu",
    scanRoamingText: "{name} je slobodan i nije izgubljen. Ovo je normalno — nema potrebe za brigom.",
    scanCallPrefix: "📞 Pozovi",
    scanCaptionContact: "Ovako izgleda stranica kad neko skenira privezak i pas je izgubljen.",
    scanCaptionRoaming: "Ovako izgleda stranica kad je izabrana opcija „nije izgubljen”.",
    privacy: {
    "updated": "Poslednja izmena",
    "sections": [
        {
            "title": "Koje podatke prikupljamo",
            "body": "Kada napraviš profil ljubimca, od tebe tražimo: ime ljubimca, tvoje ime, jedan ili dva telefonska broja, adresu za dostavu (ulica, grad, opština, poštanski broj, država) i, ako želiš, napomene o zdravlju ili alergijama ljubimca. Sve što uneseš ostaje isključivo u svrhe navedene ispod — ne prikupljamo ništa drugo, ne pratimo te po sajtu, i ne koristimo kolačiće za reklame."
        },
        {
            "title": "Zašto prikupljamo ove podatke",
            "list": [
                "Da napravimo tvoj jedinstveni QR profil i fizički privezak",
                "Da pošaljemo privezak na tvoju adresu putem kurirske službe",
                "Da te kontaktiramo u vezi sa narudžbinom (email ili SMS)",
                "Da prikažemo, na javnoj stranici koju vidi neko ko skenira QR kod, samo ono što ti sam izabereš da bude vidljivo"
            ]
        },
        {
            "title": "Šta je javno vidljivo",
            "body": "Prilikom kreiranja profila, ti biraš tačno koji podaci se prikazuju posle skeniranja. Kućna adresa se NIKAD ne prikazuje javno, osim ako to eksplicitno ne uključiš. Ako izabereš opciju „ljubimac nije izgubljen, samo slobodno šeta”, javna stranica uopšte ne prikazuje tvoj broj telefona — samo umirujuću poruku."
        },
        {
            "title": "Ko ima pristup podacima",
            "body": "Tvojim punim podacima (adresa, oba telefona, email) pristup ima isključivo administrator sajta, radi obrade i slanja narudžbine. Adresu i telefon za dostavu prosleđujemo kurirskoj službi isključivo radi isporuke priveska. Podatke ne prodajemo i ne delimo ni sa kim drugim."
        },
        {
            "title": "Kolačići i lokalno čuvanje",
            "body": "Sajt čuva samo tvoju izabranu jezičku postavku u lokalnoj memoriji browsera (localStorage), radi udobnosti. Ne koristimo kolačiće za praćenje, analitiku trećih strana niti oglašavanje."
        },
        {
            "title": "Koliko dugo čuvamo podatke",
            "body": "Podatke čuvamo dok god profil postoji i privezak je u upotrebi. Ako želiš da obrišemo tvoj profil i sve povezane podatke, javi nam se na kontakt ispod — brišemo ih u razumnom roku."
        },
        {
            "title": "Tvoja prava",
            "body": "U svakom trenutku možeš da zatražiš uvid u podatke koje čuvamo o tebi, njihovu izmenu ili potpuno brisanje. Piši nam na kontakt ispod."
        }
    ],
    "contactTitle": "Kontakt",
    "contactBody": "Za sva pitanja u vezi sa privatnošću, piši nam:"
},
    terms: {
    "updated": "Poslednja izmena",
    "sections": [
        {
            "title": "Šta nudimo",
            "body": "Kreiranje digitalnog profila ljubimca i generisanje jedinstvenog QR koda je potpuno besplatno i ostaje besplatno zauvek — nema mesečne pretplate niti skrivenih troškova. Fizički privezak (standardni ili gravirani) se naručuje i plaća posebno."
        },
        {
            "title": "Cena i plaćanje",
            "body": "Standardni privezak trenutno košta {PROMO_PRICE} din (redovna cena {REGULAR_PRICE} din), a gravirani privezak {ENGRAVED_PRICE} din. Cene mogu biti izmenjene u budućnosti — cena koja važi je uvek ona prikazana na sajtu u trenutku narudžbine. Plaćanje je isključivo pouzećem: naplatu vrši kurirska služba prilikom uručenja pošiljke. Ne tražimo niti čuvamo podatke platnih kartica na sajtu."
        },
        {
            "title": "Personalizacija i pravo na odustanak",
            "body": "Svaki privezak se izrađuje pojedinačno, sa jedinstvenim QR kodom i imenom ljubimca koje si sam uneo. U skladu sa Zakonom o zaštiti potrošača, ovakva roba izrađena po posebnom zahtevu potrošača po pravilu je izuzeta od standardnog 14-dnevnog prava na odustanak koje važi za standardnu robu. Ako je proizvod stigao oštećen ili pogrešan, rešavamo to besplatnom zamenom ili popravkom."
        },
        {
            "title": "Isporuka",
            "body": "Privezak šaljemo na adresu koju uneseš prilikom narudžbine, putem kurirske službe. Rok isporuke zavisi od kurira i obično traje nekoliko radnih dana od trenutka slanja u štampu. Zadržavamo pravo da odbijemo ili odložimo narudžbinu ako su podaci za dostavu netačni ili nepotpuni."
        },
        {
            "title": "Odgovornost",
            "body": "Trudimo se da QR kod i javna stranica rade besprekorno, ali ne možemo garantovati neprekidnu dostupnost interneta ili hostinga. Nismo odgovorni za netačne podatke koje si sam uneo prilikom kreiranja profila."
        },
        {
            "title": "Izmena uslova",
            "body": "Ovi uslovi mogu biti povremeno ažurirani. Nastavak korišćenja sajta posle izmene smatra se prihvatanjem novih uslova."
        }
    ],
    "contactTitle": "Kontakt",
    "contactBody": "Za sva pitanja, piši nam:",
    "legalNote": "Napomena: ovaj tekst je solidna polazna osnova, ali nije zamena za pravni savet — preporučujemo da ga pre punog komercijalnog lansiranja pregleda advokat, naročito deo o pravu na odustanak."
},
    addressSectionTitle: "Adresa za dostavu (za kurira)",
    tagTypeSectionTitle: "Vrsta priveska",
    orderReceived: "Narudžbina primljena ✓",
    qrWorksNote: "Ovaj QR kod već radi — skeniraj ga telefonom, otvoriće se prava stranica. Privezak ide u 3D štampu i stiže ti pouzećem.",
    openPublicPage: "Otvori javnu stranicu →",
    tagcardNote: "Ovo je pravi, radni QR kod — isti ide na tvoj privezak.",
    scanSectionTitle: "Šta vidi neko ko skenira privezak",
    scanSectionNote: "Ti biraš koji od ova dva režima važi za tvog ljubimca prilikom pravljenja profila — bilo da želiš da te odmah pozovu, ili samo želiš da nalazač zna da je sve u redu.",
    priceIncludesNote: "Cena uključuje izradu, 3D štampu i dostavu. Plaćanje isključivo pouzećem — nema ostavljanja podataka kartice na sajtu.",
    contactIntro: "Imaš pitanje o narudžbini, dostavi, ili želiš da promeniš podatke na svom profilu? Javi nam se — odgovaramo brzo.",
    promoLabel: "promo cena",
    statusTitle: "Da li želiš da te kontaktiraju ako neko skenira?",
    statusLostTitle: "Da, javite mi se",
    statusLostDesc: "Standardno. Ako se ljubimac izgubi, nalazač odmah vidi tvoj broj i može te pozvati.",
    statusRoamingTitle: "Ne — moj ljubimac samo slobodno šeta",
    statusRoamingDesc: "Za pse koji se puštaju da lutaju po dvorištu, selu ili imanju. Umesto poziva, stranica samo javi da nije izgubljen — bez tvog broja.",
    roamingPhoneTitle: "Broj telefona (opciono)",
    roamingPhoneToggle: "Ipak dodaj broj za hitne slučajeve",
    roamingPhoneHint: "Podrazumevano se broj ne prikazuje — stranica samo umiruje nalazača. Ako uključiš ovo, dodaje se mala dugmad „Pozovi” za slučaj da nešto ipak nije u redu.",
    scannedRoamingTitle: "Sve je u redu 🐾",
    scannedRoamingText: "je slobodan i nije izgubljen. Ovo je normalno — nema potrebe za brigom niti pozivom.",
    noSubBanner: "Nema mesečne pretplate, nema skrivenih troškova — platiš privezak jednom, sajt i QR kod ostaju besplatni zauvek.",
    warrantyTitle: "🛡 Garancija besplatne zamene",
    warrantyText: "Ako QR kod ikad prestane da radi, šaljemo ti zamenu potpuno besplatno.",
    riskFreeNote: "Bez rizika — ne plaćaš dok ti privezak ne stigne na vrata.",
    madeInSerbia: "Dizajnirano i 3D štampano u Srbiji",
    priceHookTitle: "990 dinara. Jednom. Ne mesečno.",
    priceHookText: "Manje od cene jedne posete frizeru — a tvoj ljubimac doživotno ima način da se vrati kući.",
    chipHookTitle: "Tvoj pas ima čip? Odlično. Ali da li ga iko na ulici može očitati?",
    chipHookText: "Čip vidi samo veterinar sa skenerom. QR kod vidi svako sa telefonom, odmah, na licu mesta.",
    chipHookCta: "Pogledaj razliku →",
    navCompare: "QR ili čip?",
    compareTitle: "QR privezak ili čip — šta je stvarno korisnije?",
    compareIntro: "Kratak i pošten odgovor: oboje. Čip je i dalje najbolja trajna identifikacija tvog ljubimca. Ali u stvarnoj situaciji — kad se pas izgubi — čip ima jednu veliku manu koju QR privezak rešava.",
    compareSections: [
      { title: "Ko može da očita identifikaciju", chip: "Čip zahteva poseban skener. Ima ga veterinar, sklonište, ponekad komunalna služba — običan prolaznik na ulici NEMA skener i ne može ništa da uradi sa njim.", qr: "QR kod čita SVAKI telefon sa kamerom, potpuno besplatno, bez ikakve posebne aplikacije ili opreme." },
      { title: "Brzina reakcije", chip: "Neko prvo mora da uhvati ili odnese životinju do veterinara ili skloništa da bi se čip očitao — to može potrajati satima, ponekad danima.", qr: "QR na ogrlici se vidi i skenira NA LICU MESTA, u sekundi, dok je ljubimac još u dvorištu komšije ili pored puta." },
      { title: "Ko te zove", chip: "Čip vodi do baze podataka koju čita samo ovlašćena institucija — ona onda mora posredno da te kontaktira, ako uopšte ima ažurne podatke.", qr: "QR odmah prikazuje tvoj broj telefona. Nalazač te zove DIREKTNO, bez ijednog posrednika." },
      { title: "Vidljivost", chip: "Čip je nevidljiv — niko sa strane ne zna da pas uopšte ima identifikaciju, pa ga ni ne pokušava skenirati.", qr: "QR privezak se vidi na ogrlici — svako ko ga primeti odmah zna da postoji način da kontaktira vlasnika." },
    ],
    compareConclusionTitle: "Zaključak: koristi oboje",
    compareConclusionText: "Čip ostaje najbolja trajna, zvanična identifikacija ako se ljubimac izgubi zauvek i završi kod veterinara ili skloništa. QR privezak je brz, vidljiv kontakt za SVAKOGA ko naiđe na tvog ljubimca u prvih par sati — kada je šansa za brz povratak kući najveća. Zajedno pokrivaju obe situacije.",
    priceRegular: "Redovna cena",
    pricePromo: "Promo cena",
    orderNote: "Uskoro ćemo vas kontaktirati radi potvrde narudžbine. Pitanja u međuvremenu šaljite na",
    createProfile: "Napravi profil ljubimca",
    petName: "Ime ljubimca",
    ownerName: "Tvoje ime",
    phone1: "Primarni telefon",
    phone2: "Sekundarni telefon (opciono)",
    notes: "Napomene (alergije, zdravlje)",
    street: "Ulica i broj",
    city: "Grad",
    municipality: "Opština",
    postal: "Poštanski broj",
    country: "Država",
    deliveryPhone: "Telefon za kurira",
    deliveryEmail: "Email (opciono)",
    privacyTitle: "Šta je vidljivo posle skeniranja",
    showPhone1: "Primarni telefon",
    showPhone2: "Sekundarni telefon",
    showAddress: "Kućna adresa",
    showNotes: "Napomene",
    generate: "Generiši QR kod",
    order: "Poruči privezak — plaćanje pouzećem",
    scannedBy: "Ovaj ljubimac je pronađen",
    call: "Pozovi",
    hiddenAddress: "Adresa je skrivena",
  },
  en: {
    tagline: "If lost, the QR code brings them home.",
    heroSub:
      "Enter your pet's info, we generate a unique QR code, 3D-print the tag and ship it to you.",
    heroPoints: [
      { title: "Enter the details", text: "Fill in a short profile for your pet with your contact information." },
      { title: "We make the tag", text: "We generate a unique QR code and 3D-print a durable tag, shipped straight to your address." },
      { title: "A fast way home", text: "If your pet wanders off, whoever finds them scans the QR code and instantly sees your number." },
    ],
    galleryTitle: "What it looks like in real life",
    faqTitle: "Frequently asked questions",
    trustBadges: ["Cash on delivery", "Data never shared without consent", "Durable 3D print"],
    trustFacts: [
      { title: "No monthly subscription", text: "Pay once for the tag — the site and QR code stay free forever." },
      { title: "No special app needed", text: "Any phone with a camera scans the QR code — Android, iPhone, any." },
      { title: "100% safe payment", text: "You pay the courier cash on delivery only — never enter card details on the site." },
      { title: "Comfortable for your pet", text: "The tag sits at collar height, designed so your dog can't chew on it." },
    ],
    tagStandard: "Standard tag",
    tagStandardDesc: "QR code printed on a durable 3D-printed tag.",
    tagEngraved: "Engraved tag",
    tagEngravedDesc: "Laser-engraved QR code on the tag — premium look and durability.",
    smsLabel: "or SMS to",
    navHome: "Home",
    navHowItWorks: "How it works",
    navPricing: "Pricing",
    navOrder: "Order",
    navFaq: "FAQ",
    navGallery: "Photos",
    navContact: "Contact",
    navMyProfile: "My profile",
    eyebrow: "Free profile · physical tag paid on delivery",
    scanCta: "Scan",
    viewFullProcess: "See the full process →",
    orderStandardCta: "Order standard →",
    orderEngravedCta: "Order engraved →",
    footerPrivacy: "Privacy policy",
    footerTerms: "Terms of use",
    scanFoundLabel: "This pet has been found",
    scanAllergyNote: "⚠ Allergic to bee stings",
    scanRoamingLabel: "Everything's fine",
    scanRoamingText: "{name} is free and not lost. This is normal — no need to worry.",
    scanCallPrefix: "📞 Call",
    scanCaptionContact: "This is what the page looks like when someone scans the tag and the dog is lost.",
    scanCaptionRoaming: "This is what the page looks like when “not lost” mode is selected.",
    privacy: {
    "updated": "Last updated",
    "sections": [
        {
            "title": "What data we collect",
            "body": "When you create a pet profile, we ask for: your pet's name, your name, one or two phone numbers, a delivery address (street, city, municipality, postal code, country) and, if you wish, notes about your pet's health or allergies. Everything you enter is used only for the purposes listed below — we don't collect anything else, don't track you across the site, and don't use advertising cookies."
        },
        {
            "title": "Why we collect this data",
            "list": [
                "To create your unique QR profile and physical tag",
                "To ship the tag to your address via courier",
                "To contact you about your order (email or SMS)",
                "To show, on the public page seen by whoever scans the QR code, only what you choose to make visible"
            ]
        },
        {
            "title": "What's publicly visible",
            "body": "When creating a profile, you choose exactly which details show up after scanning. Your home address is NEVER shown publicly unless you explicitly turn that on. If you choose the “pet is not lost, just roaming” option, the public page doesn't show your phone number at all — just a reassuring message."
        },
        {
            "title": "Who has access to the data",
            "body": "Your full data (address, both phone numbers, email) is accessible only to the site administrator, to process and ship your order. We pass the delivery address and phone number to the courier solely to deliver the tag. We don't sell or share your data with anyone else."
        },
        {
            "title": "Cookies and local storage",
            "body": "The site only stores your chosen language setting in your browser's local storage (localStorage), for convenience. We don't use tracking cookies, third-party analytics, or advertising."
        },
        {
            "title": "How long we keep data",
            "body": "We keep your data as long as your profile exists and the tag is in use. If you'd like us to delete your profile and all related data, contact us below — we'll remove it within a reasonable time."
        },
        {
            "title": "Your rights",
            "body": "At any time you can request to see the data we hold about you, have it corrected, or have it fully deleted. Write to the contact below."
        }
    ],
    "contactTitle": "Contact",
    "contactBody": "For any privacy questions, write to us:"
},
    terms: {
    "updated": "Last updated",
    "sections": [
        {
            "title": "What we offer",
            "body": "Creating a digital pet profile and generating a unique QR code is completely free and stays free forever — no monthly subscription, no hidden costs. The physical tag (standard or engraved) is ordered and paid for separately."
        },
        {
            "title": "Price and payment",
            "body": "The standard tag currently costs {PROMO_PRICE} RSD (regular price {REGULAR_PRICE} RSD), and the engraved tag costs {ENGRAVED_PRICE} RSD. Prices may change in the future — the price that applies is always the one shown on the site at the moment of ordering. Payment is cash on delivery only: the courier collects payment when handing over the parcel. We never ask for or store card details on the site."
        },
        {
            "title": "Personalization and right of withdrawal",
            "body": "Each tag is individually made, with a unique QR code and the pet name you provided. Under consumer protection law, goods made to a consumer's specification are generally exempt from the standard 14-day right of withdrawal that applies to standard goods. If a product arrives damaged or incorrect, we resolve it with a free replacement or repair."
        },
        {
            "title": "Delivery",
            "body": "We ship the tag to the address you provide when ordering, via courier. Delivery time depends on the courier and usually takes a few business days from when the tag goes to print. We reserve the right to refuse or delay an order if delivery details are incorrect or incomplete."
        },
        {
            "title": "Liability",
            "body": "We work hard to keep the QR code and public page running smoothly, but can't guarantee uninterrupted internet or hosting availability. We're not responsible for incorrect data you entered yourself when creating your profile."
        },
        {
            "title": "Changes to these terms",
            "body": "These terms may be updated from time to time. Continuing to use the site after a change means you accept the new terms."
        }
    ],
    "contactTitle": "Contact",
    "contactBody": "For any questions, write to us:",
    "legalNote": "Note: this text is a solid starting point, but it's not a substitute for legal advice — we recommend having a lawyer review it before a full commercial launch, especially the withdrawal-right section."
},
    addressSectionTitle: "Delivery address (for the courier)",
    tagTypeSectionTitle: "Tag type",
    orderReceived: "Order received ✓",
    qrWorksNote: "This QR code already works — scan it with your phone and the real page opens. The tag goes into 3D printing and ships cash-on-delivery.",
    openPublicPage: "Open the public page →",
    tagcardNote: "This is a real, working QR code — the same kind that goes on your tag.",
    scanSectionTitle: "What someone sees when they scan the tag",
    scanSectionNote: "You choose which of these two modes applies to your pet when creating the profile — whether you want to be called right away, or just want the finder to know everything's fine.",
    priceIncludesNote: "The price includes production, 3D printing, and delivery. Payment is cash on delivery only — no card details are ever entered on the site.",
    contactIntro: "Have a question about your order, delivery, or want to update your pet's profile? Reach out — we reply quickly.",
    promoLabel: "promo price",
    statusTitle: "Do you want to be contacted if someone scans this?",
    statusLostTitle: "Yes, contact me",
    statusLostDesc: "Standard. If the pet is lost, the finder instantly sees your number and can call.",
    statusRoamingTitle: "No — my pet just roams freely",
    statusRoamingDesc: "For pets allowed to wander a yard, village, or farm. Instead of a call prompt, the page just reassures the finder — no number shown.",
    roamingPhoneTitle: "Phone number (optional)",
    roamingPhoneToggle: "Still add a number for emergencies",
    roamingPhoneHint: "By default no number is shown — the page just reassures the finder. Turning this on adds a small \"Call\" button in case something is genuinely wrong.",
    scannedRoamingTitle: "Everything's fine 🐾",
    scannedRoamingText: "is free-roaming and not lost. This is normal — no need to worry or call anyone.",
    noSubBanner: "No monthly subscription, no hidden fees — pay once for the tag, the site and QR code stay free forever.",
    warrantyTitle: "🛡 Free replacement guarantee",
    warrantyText: "If the QR code ever stops working, we send you a replacement completely free.",
    riskFreeNote: "No risk — you don't pay until the tag is at your door.",
    madeInSerbia: "Designed and 3D printed in Serbia",
    priceHookTitle: "990 dinars. Once. Not monthly.",
    priceHookText: "Less than the price of one haircut — and your pet has a way home for life.",
    chipHookTitle: "Your dog has a microchip? Great. But can anyone on the street actually read it?",
    chipHookText: "A chip can only be read by a vet with a scanner. A QR code can be read by anyone with a phone, instantly, on the spot.",
    chipHookCta: "See the difference →",
    navCompare: "QR vs. microchip",
    compareTitle: "QR tag or microchip — which one actually helps?",
    compareIntro: "Short, honest answer: both. A microchip is still the best permanent ID for your pet. But in a real lost-pet situation, a chip has one big gap that a QR tag fills.",
    compareSections: [
      { title: "Who can actually read the ID", chip: "A chip needs a special scanner. Only vets, shelters, and sometimes animal control have one — an ordinary person on the street has no scanner and can't do anything with it.", qr: "A QR code is read by any phone with a camera, completely free, with no special app or equipment." },
      { title: "How fast it works", chip: "Someone first has to catch or bring the animal to a vet or shelter to have the chip read — that can take hours, sometimes days.", qr: "A QR tag on the collar is seen and scanned ON THE SPOT, in seconds, while the pet is still in a neighbor's yard or by the road." },
      { title: "Who calls you", chip: "A chip leads to a database that only an authorized institution can access — they then have to contact you indirectly, if the data is even up to date.", qr: "A QR code shows your phone number immediately. The finder calls you DIRECTLY, no middleman." },
      { title: "Visibility", chip: "A chip is invisible — nobody nearby even knows the pet has an ID, so they don't try to scan it.", qr: "A QR tag is visible on the collar — anyone who notices it immediately knows there's a way to reach the owner." },
    ],
    compareConclusionTitle: "Bottom line: use both",
    compareConclusionText: "A microchip remains the best permanent, official ID if a pet is lost for good and ends up at a vet or shelter. A QR tag is the fast, visible contact point for anyone who finds your pet in the first few hours — when the chance of a quick return home is highest. Together they cover both situations.",
    priceRegular: "Regular price",
    pricePromo: "Promo price",
    orderNote: "We'll contact you shortly to confirm the order. Questions in the meantime go to",
    createProfile: "Create a pet profile",
    petName: "Pet name",
    ownerName: "Your name",
    phone1: "Primary phone",
    phone2: "Secondary phone (optional)",
    notes: "Notes (allergies, health)",
    street: "Street and number",
    city: "City",
    municipality: "Municipality",
    postal: "Postal code",
    country: "Country",
    deliveryPhone: "Phone for courier",
    deliveryEmail: "Email (optional)",
    privacyTitle: "Visible after scanning",
    showPhone1: "Primary phone",
    showPhone2: "Secondary phone",
    showAddress: "Home address",
    showNotes: "Notes",
    generate: "Generate QR code",
    order: "Order tag — cash on delivery",
    scannedBy: "This pet has been found",
    call: "Call",
    hiddenAddress: "Address is hidden",
  },
  ru: {
    tagline: "Если потеряется, QR-код приведёт домой.",
    heroSub:
      "Введите данные питомца, мы создадим уникальный QR-код, распечатаем брелок на 3D-принтере и отправим вам.",
    heroPoints: [
      { title: "Введите данные", text: "Заполните краткий профиль питомца со своими контактными данными." },
      { title: "Мы делаем брелок", text: "Создаём уникальный QR-код и печатаем прочный брелок на 3D-принтере, который приходит прямо к вам домой." },
      { title: "Быстрый путь домой", text: "Если питомец потеряется, нашедший отсканирует QR-код и сразу увидит ваш номер." },
    ],
    galleryTitle: "Как это выглядит",
    faqTitle: "Частые вопросы",
    trustBadges: ["Наложенный платёж", "Данные не передаются без согласия", "Прочная 3D-печать"],
    trustFacts: [
      { title: "Без ежемесячной подписки", text: "Платите один раз за брелок — сайт и QR-код остаются бесплатными навсегда." },
      { title: "Не нужно специальное приложение", text: "Любой телефон с камерой сканирует QR-код — Android, iPhone, любой." },
      { title: "100% безопасная оплата", text: "Платите курьеру наличными при получении — данные карты никогда не вводятся на сайте." },
      { title: "Удобно для питомца", text: "Брелок расположен на уровне ошейника, питомец не может его жевать." },
    ],
    tagStandard: "Стандартный брелок",
    tagStandardDesc: "QR-код напечатан на прочном 3D-брелоке.",
    tagEngraved: "Гравированный брелок",
    tagEngravedDesc: "QR-код лазерной гравировки — премиальный вид и долговечность.",
    smsLabel: "или SMS на",
    navHome: "Главная",
    navHowItWorks: "Как это работает",
    navPricing: "Цены",
    navOrder: "Заказать",
    navFaq: "Вопросы",
    navGallery: "Фото",
    navContact: "Контакты",
    navMyProfile: "Мой профиль",
    eyebrow: "Бесплатный профиль · физический брелок оплачивается при получении",
    scanCta: "Сканировать",
    viewFullProcess: "Смотреть весь процесс →",
    orderStandardCta: "Заказать стандартный →",
    orderEngravedCta: "Заказать гравированный →",
    footerPrivacy: "Политика конфиденциальности",
    footerTerms: "Условия использования",
    scanFoundLabel: "Этот питомец найден",
    scanAllergyNote: "⚠ Аллергия на пчёл",
    scanRoamingLabel: "Всё в порядке",
    scanRoamingText: "{name} свободен и не потерян. Это нормально — не о чем беспокоиться.",
    scanCallPrefix: "📞 Позвонить",
    scanCaptionContact: "Так выглядит страница, когда кто-то сканирует брелок, а собака потерялась.",
    scanCaptionRoaming: "Так выглядит страница, когда выбран режим «не потерян».",
    privacy: {
    "updated": "Последнее обновление",
    "sections": [
        {
            "title": "Какие данные мы собираем",
            "body": "При создании профиля питомца мы просим: кличку питомца, ваше имя, один или два номера телефона, адрес доставки (улица, город, район, почтовый индекс, страна) и, по желанию, заметки о здоровье или аллергиях питомца. Всё, что вы вводите, используется исключительно для целей, указанных ниже — мы не собираем ничего лишнего, не отслеживаем вас на сайте и не используем рекламные файлы cookie."
        },
        {
            "title": "Зачем мы собираем эти данные",
            "list": [
                "Чтобы создать ваш уникальный QR-профиль и физический брелок",
                "Чтобы отправить брелок на ваш адрес через курьерскую службу",
                "Чтобы связаться с вами по поводу заказа (email или SMS)",
                "Чтобы показывать на публичной странице, которую видит нашедший, только то, что вы сами разрешили показывать"
            ]
        },
        {
            "title": "Что видно публично",
            "body": "При создании профиля вы сами выбираете, какие данные показываются после сканирования. Домашний адрес НИКОГДА не отображается публично, если вы явно это не включите. Если вы выберете опцию «питомец не потерян, просто гуляет», публичная страница вообще не покажет ваш номер телефона — только успокаивающее сообщение."
        },
        {
            "title": "Кто имеет доступ к данным",
            "body": "Полный доступ к вашим данным (адрес, оба телефона, email) имеет только администратор сайта — для обработки и отправки заказа. Адрес доставки и телефон мы передаём курьерской службе исключительно для доставки брелока. Мы не продаём и не передаём данные никому другому."
        },
        {
            "title": "Файлы cookie и локальное хранилище",
            "body": "Сайт хранит только выбранный вами язык в локальном хранилище браузера (localStorage), для удобства. Мы не используем отслеживающие cookie, аналитику третьих сторон или рекламу."
        },
        {
            "title": "Как долго мы храним данные",
            "body": "Мы храним данные, пока существует профиль и брелок используется. Если хотите, чтобы мы удалили ваш профиль и все связанные данные, свяжитесь с нами ниже — мы удалим их в разумный срок."
        },
        {
            "title": "Ваши права",
            "body": "В любой момент вы можете запросить просмотр хранимых о вас данных, их исправление или полное удаление. Напишите нам по контакту ниже."
        }
    ],
    "contactTitle": "Контакты",
    "contactBody": "По всем вопросам о конфиденциальности пишите нам:"
},
    terms: {
    "updated": "Последнее обновление",
    "sections": [
        {
            "title": "Что мы предлагаем",
            "body": "Создание цифрового профиля питомца и генерация уникального QR-кода полностью бесплатны и остаются бесплатными навсегда — без ежемесячной подписки и скрытых платежей. Физический брелок (стандартный или гравированный) заказывается и оплачивается отдельно."
        },
        {
            "title": "Цена и оплата",
            "body": "Стандартный брелок в настоящее время стоит {PROMO_PRICE} дин. (обычная цена {REGULAR_PRICE} дин.), а гравированный брелок — {ENGRAVED_PRICE} дин. Цены могут изменяться в будущем — действующей всегда считается цена, указанная на сайте на момент заказа. Оплата производится только наложенным платежом: курьер принимает оплату при вручении посылки. Мы никогда не запрашиваем и не храним данные карт на сайте."
        },
        {
            "title": "Персонализация и право на отказ",
            "body": "Каждый брелок изготавливается индивидуально, с уникальным QR-кодом и кличкой питомца, которую вы указали. Согласно законодательству о защите прав потребителей, товары, изготовленные по индивидуальному заказу потребителя, как правило, не подпадают под стандартное право на отказ от договора в течение 14 дней. Если товар пришёл повреждённым или неверным, мы решаем это бесплатной заменой или ремонтом."
        },
        {
            "title": "Доставка",
            "body": "Мы отправляем брелок по адресу, указанному вами при заказе, через курьерскую службу. Срок доставки зависит от курьера и обычно занимает несколько рабочих дней с момента отправки в печать. Мы оставляем за собой право отклонить или отложить заказ, если данные доставки неверны или неполны."
        },
        {
            "title": "Ответственность",
            "body": "Мы стараемся обеспечить бесперебойную работу QR-кода и публичной страницы, но не можем гарантировать непрерывную доступность интернета или хостинга. Мы не несём ответственности за неверные данные, которые вы сами ввели при создании профиля."
        },
        {
            "title": "Изменение условий",
            "body": "Эти условия могут периодически обновляться. Продолжение использования сайта после изменений означает согласие с новыми условиями."
        }
    ],
    "contactTitle": "Контакты",
    "contactBody": "По всем вопросам пишите нам:",
    "legalNote": "Примечание: этот текст — хорошая отправная точка, но не замена юридической консультации — рекомендуем показать его юристу перед полным коммерческим запуском, особенно раздел о праве на отказ."
},
    addressSectionTitle: "Адрес доставки (для курьера)",
    tagTypeSectionTitle: "Тип брелока",
    orderReceived: "Заказ получен ✓",
    qrWorksNote: "Этот QR-код уже работает — отсканируйте его телефоном, откроется настоящая страница. Брелок отправляется в 3D-печать и доставляется наложенным платежом.",
    openPublicPage: "Открыть публичную страницу →",
    tagcardNote: "Это настоящий, рабочий QR-код — такой же будет на вашем брелоке.",
    scanSectionTitle: "Что видит нашедший при сканировании брелока",
    scanSectionNote: "Вы выбираете, какой из этих двух режимов подходит вашему питомцу при создании профиля — хотите ли вы, чтобы вам сразу позвонили, или просто хотите, чтобы нашедший знал, что всё в порядке.",
    priceIncludesNote: "Цена включает изготовление, 3D-печать и доставку. Оплата только наложенным платежом — данные карты никогда не вводятся на сайте.",
    contactIntro: "Есть вопрос о заказе, доставке или хотите изменить данные профиля? Напишите нам — отвечаем быстро.",
    promoLabel: "промо-цена",
    statusTitle: "Хотите, чтобы с вами связывались при сканировании?",
    statusLostTitle: "Да, свяжитесь со мной",
    statusLostDesc: "Стандартно. Если питомец потеряется, нашедший сразу увидит ваш номер и позвонит.",
    statusRoamingTitle: "Нет — мой питомец просто гуляет свободно",
    statusRoamingDesc: "Для животных, которых отпускают гулять по двору, селу или ферме. Вместо звонка страница просто успокоит нашедшего — номер не показывается.",
    roamingPhoneTitle: "Номер телефона (необязательно)",
    roamingPhoneToggle: "Всё же добавить номер на всякий случай",
    roamingPhoneHint: "По умолчанию номер не показывается — страница просто успокаивает нашедшего. Если включить это, появится небольшая кнопка «Позвонить» на случай, если что-то действительно не так.",
    scannedRoamingTitle: "Всё в порядке 🐾",
    scannedRoamingText: "гуляет свободно и не потерялся. Это нормально — не нужно волноваться или звонить.",
    noSubBanner: "Без ежемесячной подписки, без скрытых платежей — платите один раз за брелок, сайт и QR-код остаются бесплатными навсегда.",
    warrantyTitle: "🛡 Гарантия бесплатной замены",
    warrantyText: "Если QR-код когда-либо перестанет работать, мы бесплатно вышлем замену.",
    riskFreeNote: "Без риска — вы не платите, пока брелок не окажется у вашей двери.",
    madeInSerbia: "Разработано и напечатано на 3D-принтере в Сербии",
    priceHookTitle: "990 динаров. Один раз. Не ежемесячно.",
    priceHookText: "Дешевле одной стрижки — а у вашего питомца на всю жизнь есть способ вернуться домой.",
    chipHookTitle: "У вашей собаки есть чип? Отлично. Но может ли его прочитать кто-то на улице?",
    chipHookText: "Чип может прочитать только ветеринар со сканером. QR-код может прочитать любой с телефоном, мгновенно, на месте.",
    chipHookCta: "Посмотреть разницу →",
    navCompare: "QR или чип?",
    compareTitle: "QR-брелок или чип — что действительно полезнее?",
    compareIntro: "Короткий честный ответ: и то, и другое. Чип остаётся лучшей постоянной идентификацией питомца. Но в реальной ситуации потери питомца у чипа есть один большой пробел, который закрывает QR-брелок.",
    compareSections: [
      { title: "Кто может прочитать идентификацию", chip: "Чипу нужен специальный сканер. Он есть у ветеринаров, приютов, иногда у службы отлова — у обычного прохожего на улице сканера нет, и он ничего не может с этим сделать.", qr: "QR-код читает ЛЮБОЙ телефон с камерой, совершенно бесплатно, без специального приложения или оборудования." },
      { title: "Скорость реакции", chip: "Сначала кто-то должен поймать животное или отвезти его к ветеринару или в приют, чтобы прочитать чип — это может занять часы, иногда дни.", qr: "QR-код на ошейнике виден и сканируется НА МЕСТЕ, за секунды, пока питомец ещё во дворе соседа или у дороги." },
      { title: "Кто вам звонит", chip: "Чип ведёт к базе данных, доступ к которой есть только у уполномоченной организации — она должна связаться с вами опосредованно, если данные вообще актуальны.", qr: "QR-код сразу показывает ваш номер телефона. Нашедший звонит вам НАПРЯМУЮ, без посредников." },
      { title: "Видимость", chip: "Чип невидим — никто рядом даже не знает, что у питомца есть идентификация, поэтому и не пытается её считать.", qr: "QR-брелок виден на ошейнике — любой, кто его заметит, сразу понимает, что есть способ связаться с владельцем." },
    ],
    compareConclusionTitle: "Вывод: используйте оба варианта",
    compareConclusionText: "Чип остаётся лучшей постоянной, официальной идентификацией, если питомец потерян окончательно и попадает к ветеринару или в приют. QR-брелок — это быстрый, видимый контакт для любого, кто найдёт вашего питомца в первые несколько часов — когда шанс на быстрое возвращение домой наибольший. Вместе они покрывают обе ситуации.",
    priceRegular: "Обычная цена",
    pricePromo: "Промо-цена",
    orderNote: "Мы скоро свяжемся с вами для подтверждения заказа. Вопросы можно направить на",
    createProfile: "Создать профиль питомца",
    petName: "Кличка питомца",
    ownerName: "Ваше имя",
    phone1: "Основной телефон",
    phone2: "Доп. телефон (необязательно)",
    notes: "Заметки (аллергии, здоровье)",
    street: "Улица и номер дома",
    city: "Город",
    municipality: "Район",
    postal: "Почтовый индекс",
    country: "Страна",
    deliveryPhone: "Телефон для курьера",
    deliveryEmail: "Email (необязательно)",
    privacyTitle: "Видно после сканирования",
    showPhone1: "Основной телефон",
    showPhone2: "Доп. телефон",
    showAddress: "Домашний адрес",
    showNotes: "Заметки",
    generate: "Создать QR-код",
    order: "Заказать брелок — наложенным платежом",
    scannedBy: "Этот питомец найден",
    call: "Позвонить",
    hiddenAddress: "Адрес скрыт",
  },
  zh: {
    tagline: "如果走失,二维码带它回家。",
    heroSub: "填写宠物信息,我们生成专属二维码,3D打印挂牌并寄给您。",
    heroPoints: [
      { title: "填写信息", text: "填写宠物的简短档案和您的联系方式。" },
      { title: "我们制作挂牌", text: "生成专属二维码并3D打印耐用挂牌,直接寄送到您家。" },
      { title: "快速回家", text: "如果宠物走失,拾到者扫描二维码即可立即看到您的电话。" },
    ],
    galleryTitle: "实物效果",
    faqTitle: "常见问题",
    trustBadges: ["货到付款", "未经同意不分享数据", "耐用3D打印"],
    trustFacts: [
      { title: "无月度订阅", text: "挂牌只需付款一次,网站和二维码永久免费。" },
      { title: "无需专用App", text: "任何带摄像头的手机都能扫描二维码——安卓、苹果均可。" },
      { title: "100%安全支付", text: "仅需货到付款给快递员——从不在网站上输入银行卡信息。" },
      { title: "宠物佩戴舒适", text: "挂牌贴合项圈高度佩戴,设计上狗狗无法啃咬。" },
    ],
    tagStandard: "标准挂牌",
    tagStandardDesc: "二维码打印在耐用的3D打印挂牌上。",
    tagEngraved: "雕刻挂牌",
    tagEngravedDesc: "激光雕刻二维码——高级外观与耐用性。",
    smsLabel: "或发短信至",
    navHome: "首页",
    navHowItWorks: "使用方法",
    navPricing: "价格",
    navOrder: "立即订购",
    navFaq: "常见问题",
    navGallery: "照片",
    navContact: "联系我们",
    navMyProfile: "我的档案",
    eyebrow: "免费档案 · 实体挂牌货到付款",
    scanCta: "扫描",
    viewFullProcess: "查看完整流程 →",
    orderStandardCta: "订购标准款 →",
    orderEngravedCta: "订购雕刻款 →",
    footerPrivacy: "隐私政策",
    footerTerms: "使用条款",
    scanFoundLabel: "这只宠物已被找到",
    scanAllergyNote: "⚠ 对蜜蜂过敏",
    scanRoamingLabel: "一切正常",
    scanRoamingText: "{name}很自由,并没有走失。这是正常的——无需担心。",
    scanCallPrefix: "📞 拨打",
    scanCaptionContact: "当有人扫描挂牌且宠物走失时,页面显示如下。",
    scanCaptionRoaming: "当选择「未走失」模式时,页面显示如下。",
    privacy: {
    "updated": "最后更新",
    "sections": [
        {
            "title": "我们收集哪些数据",
            "body": "创建宠物档案时,我们会询问:宠物名字、您的姓名、一到两个电话号码、送货地址(街道、城市、区、邮编、国家),如果您愿意,还可以填写宠物的健康或过敏备注。您输入的所有信息仅用于下述目的——我们不收集其他信息,不在网站上追踪您,也不使用广告类Cookie。"
        },
        {
            "title": "我们为何收集这些数据",
            "list": [
                "用于创建您独特的二维码档案和实体挂牌",
                "通过快递将挂牌寄送到您的地址",
                "就订单事宜联系您(邮件或短信)",
                "在扫描者看到的公开页面上,仅显示您选择公开的信息"
            ]
        },
        {
            "title": "哪些信息公开可见",
            "body": "创建档案时,您可以准确选择扫描后显示哪些信息。除非您明确开启,否则家庭住址永远不会公开显示。如果您选择「宠物未走失,只是自由活动」选项,公开页面将完全不显示您的电话号码——只显示一条安心提示。"
        },
        {
            "title": "谁可以访问数据",
            "body": "只有网站管理员可以访问您的完整数据(地址、两个电话号码、邮箱),用于处理和寄送订单。我们仅为寄送挂牌之目的,将收货地址和电话提供给快递公司。我们不会出售或与任何其他人共享您的数据。"
        },
        {
            "title": "Cookie与本地存储",
            "body": "为方便起见,网站仅在浏览器本地存储(localStorage)中保存您选择的语言设置。我们不使用追踪Cookie、第三方分析或广告。"
        },
        {
            "title": "数据保留多久",
            "body": "只要档案存在且挂牌仍在使用,我们就会保留您的数据。如果您希望我们删除您的档案及所有相关数据,请通过下方联系方式告知我们——我们会在合理时间内删除。"
        },
        {
            "title": "您的权利",
            "body": "您可以随时要求查看我们保存的关于您的数据、更正数据或完全删除数据。请通过下方联系方式与我们联系。"
        }
    ],
    "contactTitle": "联系我们",
    "contactBody": "如有任何隐私相关问题,请联系我们:"
},
    terms: {
    "updated": "最后更新",
    "sections": [
        {
            "title": "我们提供什么",
            "body": "创建宠物数字档案和生成专属二维码完全免费,并永久免费——无月度订阅,无隐藏费用。实体挂牌(标准款或雕刻款)需单独订购和付款。"
        },
        {
            "title": "价格与付款",
            "body": "标准挂牌目前售价{PROMO_PRICE}第纳尔(原价{REGULAR_PRICE}第纳尔),雕刻挂牌售价{ENGRAVED_PRICE}第纳尔。价格未来可能变动——以下单时网站显示的价格为准。仅支持货到付款:快递员在交付包裹时收取款项。我们绝不在网站上索取或存储银行卡信息。"
        },
        {
            "title": "个性化定制与撤销权",
            "body": "每个挂牌均为个性化制作,配有独一无二的二维码和您提供的宠物名字。根据消费者保护法,按消费者specification定制的商品通常不适用于标准商品的14天撤销权。如商品到货时损坏或有误,我们将免费更换或维修解决。"
        },
        {
            "title": "配送",
            "body": "我们通过快递将挂牌寄送至您下单时提供的地址。配送时间取决于快递公司,通常从进入打印起需数个工作日。如配送信息不正确或不完整,我们保留拒绝或推迟订单的权利。"
        },
        {
            "title": "责任",
            "body": "我们努力确保二维码和公开页面顺畅运行,但无法保证网络或托管服务不间断可用。对于您在创建档案时自行填写错误的信息,我们不承担责任。"
        },
        {
            "title": "条款变更",
            "body": "本条款可能会不时更新。变更后继续使用本网站即表示您接受新条款。"
        }
    ],
    "contactTitle": "联系我们",
    "contactBody": "如有任何问题,请联系我们:",
    "legalNote": "备注:此文本是一个良好的起点,但不能替代法律咨询——我们建议在正式商业上线前请律师审阅,尤其是撤销权部分。"
},
    addressSectionTitle: "收货地址(快递员使用)",
    tagTypeSectionTitle: "挂牌类型",
    orderReceived: "订单已收到 ✓",
    qrWorksNote: "这个二维码已经可以使用——用手机扫描即可打开真实页面。挂牌将进入3D打印并以货到付款方式寄出。",
    openPublicPage: "打开公开页面 →",
    tagcardNote: "这是真实可用的二维码——与您挂牌上的相同。",
    scanSectionTitle: "有人扫描挂牌时会看到什么",
    scanSectionNote: "创建档案时,您可以选择这两种模式中的哪一种适用于您的宠物——是希望立即被联系,还是只想让拾到者知道一切正常。",
    priceIncludesNote: "价格包含制作、3D打印和配送。仅支持货到付款——网站上从不输入银行卡信息。",
    contactIntro: "对订单、配送有疑问,或想更新宠物档案信息?请联系我们——我们会尽快回复。",
    promoLabel: "促销价",
    statusTitle: "有人扫描时,您希望被联系吗?",
    statusLostTitle: "是的,请联系我",
    statusLostDesc: "标准模式。如果宠物走失,拾到者会立即看到您的电话并可以拨打。",
    statusRoamingTitle: "不 — 我的宠物只是自由活动",
    statusRoamingDesc: "适用于允许在院子、村庄或农场自由活动的宠物。页面只会告知拾到者宠物没有走失,不显示您的电话。",
    roamingPhoneTitle: "电话号码(可选)",
    roamingPhoneToggle: "仍然添加紧急联系电话",
    roamingPhoneHint: "默认不显示电话号码——页面只会让拾到者安心。开启此项后,会添加一个小的「拨打电话」按钮,以备真正出现问题时使用。",
    scannedRoamingTitle: "一切正常 🐾",
    scannedRoamingText: "只是自由活动,并没有走失。这是正常的——无需担心或拨打电话。",
    noSubBanner: "没有月费,没有隐藏费用——挂牌只需付款一次,网站和二维码永久免费。",
    warrantyTitle: "🛡 免费更换保修",
    warrantyText: "如果二维码失效,我们将完全免费为您更换。",
    riskFreeNote: "零风险——挂牌送达前无需付款。",
    madeInSerbia: "在塞尔维亚设计并3D打印",
    priceHookTitle: "990第纳尔。一次性。非月付。",
    priceHookText: "比理一次发还便宜——却能让您的宠物终身拥有回家的方式。",
    chipHookTitle: "您的狗植入了芯片?很好。但街上的人真的能读取它吗?",
    chipHookText: "芯片只能由持扫描仪的兽医读取。二维码任何人用手机即可立即当场读取。",
    chipHookCta: "查看区别 →",
    navCompare: "二维码 vs 芯片",
    compareTitle: "二维码挂牌还是芯片——哪个真正更有用?",
    compareIntro: "简短诚实的答案:两者都需要。芯片仍是宠物最好的永久身份识别方式。但在宠物真正走失的情况下,芯片有一个二维码挂牌可以弥补的重大缺口。",
    compareSections: [
      { title: "谁能真正读取身份信息", chip: "芯片需要专用扫描仪。只有兽医、收容所、有时动物管理部门才有——普通路人没有扫描仪,拿到芯片信息也无能为力。", qr: "任何带摄像头的手机都能读取二维码,完全免费,无需专用App或设备。" },
      { title: "反应速度", chip: "必须先有人抓住或将动物带到兽医或收容所才能读取芯片——这可能需要数小时,甚至数天。", qr: "项圈上的二维码可以当场被看到并扫描,只需几秒钟,此时宠物可能还在邻居院子里或路边。" },
      { title: "谁会打电话给您", chip: "芯片指向只有授权机构才能访问的数据库——即使数据是最新的,他们也只能间接联系您。", qr: "二维码立即显示您的电话号码。拾到者可以直接打电话给您,无需中间人。" },
      { title: "可见性", chip: "芯片是不可见的——附近的人根本不知道宠物有身份识别,因此也不会尝试扫描。", qr: "二维码挂牌在项圈上清晰可见——任何注意到它的人立即知道有办法联系主人。" },
    ],
    compareConclusionTitle: "结论:两者都用",
    compareConclusionText: "如果宠物永久走失并最终被送到兽医或收容所,芯片仍是最好的永久官方身份识别方式。而二维码挂牌则是在最初几个小时内——宠物快速回家几率最高的时候——任何发现您宠物的人都能使用的快速、可见的联系方式。两者结合可覆盖所有情况。",
    priceRegular: "原价",
    pricePromo: "促销价",
    orderNote: "我们会尽快联系您确认订单。如有疑问请发送邮件至",
    createProfile: "创建宠物档案",
    petName: "宠物名字",
    ownerName: "您的姓名",
    phone1: "主要电话",
    phone2: "备用电话(可选)",
    notes: "备注(过敏、健康状况)",
    street: "街道和门牌号",
    city: "城市",
    municipality: "区/镇",
    postal: "邮政编码",
    country: "国家",
    deliveryPhone: "快递联系电话",
    deliveryEmail: "邮箱(可选)",
    privacyTitle: "扫描后可见的信息",
    showPhone1: "主要电话",
    showPhone2: "备用电话",
    showAddress: "家庭住址",
    showNotes: "备注",
    generate: "生成二维码",
    order: "订购挂牌 — 货到付款",
    scannedBy: "这只宠物已被找到",
    call: "拨打电话",
    hiddenAddress: "地址已隐藏",
  },
  de: {
    tagline: "Falls verloren, bringt der QR-Code ihn nach Hause.",
    heroSub:
      "Gib die Daten deines Haustiers ein, wir erstellen einen eindeutigen QR-Code, drucken die Marke in 3D und schicken sie dir.",
    heroPoints: [
      { title: "Daten eingeben", text: "Fülle ein kurzes Profil deines Haustiers mit deinen Kontaktdaten aus." },
      { title: "Wir machen die Marke", text: "Wir erstellen einen eindeutigen QR-Code und drucken eine langlebige Marke in 3D, die direkt zu dir nach Hause geschickt wird." },
      { title: "Schnell nach Hause", text: "Läuft dein Haustier weg, scannt der Finder den QR-Code und sieht sofort deine Nummer." },
    ],
    galleryTitle: "So sieht es in echt aus",
    faqTitle: "Häufige Fragen",
    trustBadges: ["Nachnahme", "Daten werden nie ohne Zustimmung geteilt", "Langlebiger 3D-Druck"],
    trustFacts: [
      { title: "Kein Monatsabo", text: "Du zahlst einmal für die Marke — Website und QR-Code bleiben für immer kostenlos." },
      { title: "Keine spezielle App nötig", text: "Jedes Handy mit Kamera kann den QR-Code scannen — Android, iPhone, egal welches." },
      { title: "100% sichere Zahlung", text: "Du zahlst nur per Nachnahme an den Kurier — nie Kartendaten auf der Website." },
      { title: "Angenehm für dein Haustier", text: "Die Marke sitzt auf Halsbandhöhe, so konzipiert, dass dein Hund nicht daran kauen kann." },
    ],
    tagStandard: "Standard-Marke",
    tagStandardDesc: "QR-Code gedruckt auf einer langlebigen 3D-Marke.",
    tagEngraved: "Gravierte Marke",
    tagEngravedDesc: "Lasergravierter QR-Code — Premium-Optik und Langlebigkeit.",
    smsLabel: "oder SMS an",
    navHome: "Start",
    navHowItWorks: "So funktioniert's",
    navPricing: "Preise",
    navOrder: "Bestellen",
    navFaq: "FAQ",
    navGallery: "Fotos",
    navContact: "Kontakt",
    navMyProfile: "Mein Profil",
    eyebrow: "Kostenloses Profil · physische Marke per Nachnahme",
    scanCta: "Scannen",
    viewFullProcess: "Ganzen Ablauf ansehen →",
    orderStandardCta: "Standard bestellen →",
    orderEngravedCta: "Gravierte bestellen →",
    footerPrivacy: "Datenschutzrichtlinie",
    footerTerms: "Nutzungsbedingungen",
    scanFoundLabel: "Dieses Haustier wurde gefunden",
    scanAllergyNote: "⚠ Allergisch gegen Bienenstiche",
    scanRoamingLabel: "Alles ist in Ordnung",
    scanRoamingText: "{name} ist frei unterwegs und nicht verloren. Das ist normal — kein Grund zur Sorge.",
    scanCallPrefix: "📞 Anrufen",
    scanCaptionContact: "So sieht die Seite aus, wenn jemand die Marke scannt und der Hund verloren ist.",
    scanCaptionRoaming: "So sieht die Seite aus, wenn der Modus „nicht verloren” gewählt wurde.",
    privacy: {
    "updated": "Zuletzt aktualisiert",
    "sections": [
        {
            "title": "Welche Daten wir erfassen",
            "body": "Beim Erstellen eines Haustierprofils fragen wir nach: dem Namen deines Haustiers, deinem Namen, ein oder zwei Telefonnummern, einer Lieferadresse (Straße, Stadt, Gemeinde, Postleitzahl, Land) und, falls gewünscht, Notizen zu Gesundheit oder Allergien deines Haustiers. Alles, was du eingibst, wird ausschließlich für die unten genannten Zwecke verwendet — wir erfassen nichts weiter, verfolgen dich nicht auf der Website und verwenden keine Werbe-Cookies."
        },
        {
            "title": "Warum wir diese Daten erfassen",
            "list": [
                "Um dein einzigartiges QR-Profil und die physische Marke zu erstellen",
                "Um die Marke per Kurier an deine Adresse zu senden",
                "Um dich bezüglich deiner Bestellung zu kontaktieren (E-Mail oder SMS)",
                "Um auf der öffentlichen Seite, die der Finder sieht, nur das zu zeigen, was du selbst sichtbar gemacht hast"
            ]
        },
        {
            "title": "Was öffentlich sichtbar ist",
            "body": "Beim Erstellen des Profils wählst du genau, welche Angaben nach dem Scannen angezeigt werden. Deine Heimatadresse wird NIEMALS öffentlich angezeigt, außer du aktivierst dies ausdrücklich. Wählst du die Option „Haustier ist nicht verloren, streift nur frei umher”, zeigt die öffentliche Seite deine Telefonnummer überhaupt nicht — nur eine beruhigende Nachricht."
        },
        {
            "title": "Wer Zugriff auf die Daten hat",
            "body": "Auf deine vollständigen Daten (Adresse, beide Telefonnummern, E-Mail) hat ausschließlich der Website-Administrator Zugriff, um deine Bestellung zu bearbeiten und zu versenden. Lieferadresse und Telefonnummer geben wir ausschließlich zur Zustellung der Marke an den Kurierdienst weiter. Wir verkaufen oder teilen deine Daten mit niemandem sonst."
        },
        {
            "title": "Cookies und lokale Speicherung",
            "body": "Die Website speichert der Bequemlichkeit halber nur deine gewählte Spracheinstellung im lokalen Speicher deines Browsers (localStorage). Wir verwenden keine Tracking-Cookies, keine Analyse-Tools Dritter und keine Werbung."
        },
        {
            "title": "Wie lange wir Daten aufbewahren",
            "body": "Wir bewahren deine Daten auf, solange dein Profil existiert und die Marke in Gebrauch ist. Möchtest du, dass wir dein Profil und alle zugehörigen Daten löschen, kontaktiere uns unten — wir löschen sie innerhalb einer angemessenen Frist."
        },
        {
            "title": "Deine Rechte",
            "body": "Du kannst jederzeit Einsicht in die über dich gespeicherten Daten, deren Berichtigung oder vollständige Löschung verlangen. Schreibe uns über den Kontakt unten."
        }
    ],
    "contactTitle": "Kontakt",
    "contactBody": "Bei Fragen zum Datenschutz schreibe uns:"
},
    terms: {
    "updated": "Zuletzt aktualisiert",
    "sections": [
        {
            "title": "Was wir anbieten",
            "body": "Das Erstellen eines digitalen Haustierprofils und die Generierung eines einzigartigen QR-Codes sind komplett kostenlos und bleiben es für immer — kein Monatsabo, keine versteckten Kosten. Die physische Marke (Standard oder graviert) wird separat bestellt und bezahlt."
        },
        {
            "title": "Preis und Zahlung",
            "body": "Die Standardmarke kostet derzeit {PROMO_PRICE} Din. (regulärer Preis {REGULAR_PRICE} Din.), die gravierte Marke {ENGRAVED_PRICE} Din. Preise können sich in Zukunft ändern — es gilt immer der auf der Website zum Zeitpunkt der Bestellung angezeigte Preis. Die Zahlung erfolgt ausschließlich per Nachnahme: Der Kurier kassiert bei Übergabe der Sendung. Wir fragen niemals Kartendaten ab und speichern sie nicht auf der Website."
        },
        {
            "title": "Personalisierung und Widerrufsrecht",
            "body": "Jede Marke wird individuell mit einem einzigartigen QR-Code und dem von dir angegebenen Haustiernamen gefertigt. Nach dem Verbraucherschutzrecht sind nach Kundenspezifikation gefertigte Waren in der Regel vom standardmäßigen 14-tägigen Widerrufsrecht für Standardwaren ausgenommen. Kommt ein Produkt beschädigt oder fehlerhaft an, lösen wir dies durch kostenlosen Ersatz oder Reparatur."
        },
        {
            "title": "Lieferung",
            "body": "Wir versenden die Marke an die bei der Bestellung angegebene Adresse per Kurier. Die Lieferzeit hängt vom Kurier ab und beträgt in der Regel einige Werktage ab Druckbeginn. Wir behalten uns vor, eine Bestellung abzulehnen oder zu verzögern, wenn die Lieferdaten falsch oder unvollständig sind."
        },
        {
            "title": "Haftung",
            "body": "Wir bemühen uns, dass QR-Code und öffentliche Seite reibungslos funktionieren, können aber keine unterbrechungsfreie Verfügbarkeit von Internet oder Hosting garantieren. Wir haften nicht für falsche Angaben, die du selbst beim Erstellen deines Profils gemacht hast."
        },
        {
            "title": "Änderung dieser Bedingungen",
            "body": "Diese Bedingungen können gelegentlich aktualisiert werden. Die weitere Nutzung der Website nach einer Änderung gilt als Zustimmung zu den neuen Bedingungen."
        }
    ],
    "contactTitle": "Kontakt",
    "contactBody": "Bei Fragen schreibe uns:",
    "legalNote": "Hinweis: Dieser Text ist eine solide Ausgangsbasis, aber kein Ersatz für Rechtsberatung — wir empfehlen, ihn vor einem vollständigen kommerziellen Start von einem Anwalt prüfen zu lassen, insbesondere den Abschnitt zum Widerrufsrecht."
},
    addressSectionTitle: "Lieferadresse (für den Kurier)",
    tagTypeSectionTitle: "Art der Marke",
    orderReceived: "Bestellung erhalten ✓",
    qrWorksNote: "Dieser QR-Code funktioniert bereits — scanne ihn mit deinem Handy, die echte Seite öffnet sich. Die Marke geht in den 3D-Druck und wird per Nachnahme verschickt.",
    openPublicPage: "Öffentliche Seite öffnen →",
    tagcardNote: "Das ist ein echter, funktionierender QR-Code — derselbe Typ, der auf deine Marke kommt.",
    scanSectionTitle: "Was jemand sieht, der die Marke scannt",
    scanSectionNote: "Du wählst beim Erstellen des Profils, welcher dieser beiden Modi für dein Haustier gilt — ob du sofort angerufen werden möchtest, oder der Finder nur wissen soll, dass alles in Ordnung ist.",
    priceIncludesNote: "Der Preis umfasst Herstellung, 3D-Druck und Versand. Zahlung ausschließlich per Nachnahme — es werden nie Kartendaten auf der Website eingegeben.",
    contactIntro: "Frage zu deiner Bestellung, Lieferung oder möchtest du dein Profil aktualisieren? Melde dich — wir antworten schnell.",
    promoLabel: "Aktionspreis",
    statusTitle: "Möchtest du kontaktiert werden, wenn jemand scannt?",
    statusLostTitle: "Ja, kontaktiert mich",
    statusLostDesc: "Standard. Läuft das Haustier weg, sieht der Finder sofort deine Nummer und kann anrufen.",
    statusRoamingTitle: "Nein — mein Haustier streift einfach frei herum",
    statusRoamingDesc: "Für Tiere, die im Hof, Dorf oder auf dem Bauernhof frei herumlaufen dürfen. Statt eines Anrufs beruhigt die Seite den Finder nur — keine Nummer wird gezeigt.",
    roamingPhoneTitle: "Telefonnummer (optional)",
    roamingPhoneToggle: "Trotzdem eine Nummer für Notfälle hinzufügen",
    roamingPhoneHint: "Standardmäßig wird keine Nummer angezeigt — die Seite beruhigt den Finder nur. Aktivierst du dies, erscheint ein kleiner „Anrufen\"-Button, falls doch etwas nicht stimmt.",
    scannedRoamingTitle: "Alles in Ordnung 🐾",
    scannedRoamingText: "streift frei herum und ist nicht verloren. Das ist normal — kein Grund zur Sorge oder zum Anrufen.",
    noSubBanner: "Kein Monatsabo, keine versteckten Kosten — du zahlst einmal für die Marke, Website und QR-Code bleiben für immer kostenlos.",
    warrantyTitle: "🛡 Kostenlose Ersatzgarantie",
    warrantyText: "Sollte der QR-Code jemals nicht mehr funktionieren, senden wir dir kostenlos einen Ersatz.",
    riskFreeNote: "Kein Risiko — du zahlst erst, wenn die Marke vor deiner Tür ist.",
    madeInSerbia: "Entworfen und in 3D gedruckt in Serbien",
    priceHookTitle: "990 Dinar. Einmalig. Nicht monatlich.",
    priceHookText: "Weniger als der Preis eines Haarschnitts — und dein Haustier hat ein Leben lang einen Weg nach Hause.",
    chipHookTitle: "Dein Hund hat einen Chip? Super. Aber kann ihn jemand auf der Straße überhaupt auslesen?",
    chipHookText: "Einen Chip kann nur ein Tierarzt mit Lesegerät auslesen. Einen QR-Code kann jeder mit einem Handy sofort vor Ort lesen.",
    chipHookCta: "Unterschied ansehen →",
    navCompare: "QR oder Chip?",
    compareTitle: "QR-Marke oder Chip — was hilft wirklich mehr?",
    compareIntro: "Kurze, ehrliche Antwort: beides. Ein Chip bleibt die beste dauerhafte Identifikation deines Haustiers. Aber in einer echten Verlustsituation hat ein Chip eine große Lücke, die eine QR-Marke schließt.",
    compareSections: [
      { title: "Wer die Kennung tatsächlich auslesen kann", chip: "Ein Chip braucht ein spezielles Lesegerät. Das haben nur Tierärzte, Tierheime und manchmal das Ordnungsamt — ein gewöhnlicher Passant auf der Straße hat kein Lesegerät und kann nichts damit anfangen.", qr: "Ein QR-Code wird von jedem Handy mit Kamera gelesen, völlig kostenlos, ohne spezielle App oder Ausrüstung." },
      { title: "Wie schnell es geht", chip: "Jemand muss das Tier erst einfangen oder zu einem Tierarzt oder Tierheim bringen, damit der Chip ausgelesen werden kann — das kann Stunden, manchmal Tage dauern.", qr: "Eine QR-Marke am Halsband wird SOFORT VOR ORT gesehen und gescannt, in Sekunden, während das Tier noch im Nachbargarten oder am Straßenrand ist." },
      { title: "Wer dich anruft", chip: "Ein Chip führt zu einer Datenbank, auf die nur eine autorisierte Institution zugreifen kann — sie muss dich dann indirekt kontaktieren, falls die Daten überhaupt aktuell sind.", qr: "Ein QR-Code zeigt sofort deine Telefonnummer. Der Finder ruft dich DIREKT an, ohne Mittelsperson." },
      { title: "Sichtbarkeit", chip: "Ein Chip ist unsichtbar — niemand in der Nähe weiß überhaupt, dass das Tier eine Kennung hat, und versucht sie deshalb gar nicht erst zu scannen.", qr: "Eine QR-Marke ist am Halsband sichtbar — jeder, der sie bemerkt, weiß sofort, dass es einen Weg gibt, den Besitzer zu erreichen." },
    ],
    compareConclusionTitle: "Fazit: nutze beides",
    compareConclusionText: "Ein Chip bleibt die beste dauerhafte, offizielle Identifikation, falls ein Haustier endgültig verloren geht und bei einem Tierarzt oder Tierheim landet. Eine QR-Marke ist der schnelle, sichtbare Kontaktpunkt für jeden, der dein Haustier in den ersten Stunden findet — wenn die Chance auf eine schnelle Rückkehr am größten ist. Zusammen decken sie beide Situationen ab.",
    priceRegular: "Regulärer Preis",
    pricePromo: "Aktionspreis",
    orderNote: "Wir melden uns bald zur Bestätigung der Bestellung. Fragen in der Zwischenzeit an",
    createProfile: "Haustierprofil erstellen",
    petName: "Name des Haustiers",
    ownerName: "Dein Name",
    phone1: "Haupttelefon",
    phone2: "Zweites Telefon (optional)",
    notes: "Notizen (Allergien, Gesundheit)",
    street: "Straße und Hausnummer",
    city: "Stadt",
    municipality: "Gemeinde",
    postal: "Postleitzahl",
    country: "Land",
    deliveryPhone: "Telefon für den Kurier",
    deliveryEmail: "E-Mail (optional)",
    privacyTitle: "Nach dem Scannen sichtbar",
    showPhone1: "Haupttelefon",
    showPhone2: "Zweites Telefon",
    showAddress: "Heimatadresse",
    showNotes: "Notizen",
    generate: "QR-Code erstellen",
    order: "Marke bestellen — Nachnahme",
    scannedBy: "Dieses Haustier wurde gefunden",
    call: "Anrufen",
    hiddenAddress: "Adresse ist verborgen",
  },
};

const LangContext = createContext({ lang: "sr", setLang: () => {}, t: dict.sr });

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("sr");

  useEffect(() => {
    const saved = window.localStorage.getItem("vmk_lang");
    if (saved && dict[saved]) setLang(saved);
  }, []);

  function changeLang(code) {
    setLang(code);
    window.localStorage.setItem("vmk_lang", code);
  }

  return (
    <LangContext.Provider value={{ lang, setLang: changeLang, t: dict[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useI18n() {
  return useContext(LangContext);
}

"use client";
import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { ShieldCheck, Truck, PawPrint, ChevronLeft, ChevronRight } from "lucide-react";

export default function Home() {
  const [formData, setFormData] = useState({
    imeLjubimca: "",
    imeVlasnika: "",
    adresa: "",
    grad: "",
    postanskiBroj: "",
    telefon: "",
    email: "",
  });
  const [status, setStatus] = useState(null);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  // Mesto za tvoje buduce slike (stavi prave putanje kada ih ubacis u /public folder)
  const images = [
    "/placeholder-1.jpg", 
    "/placeholder-2.jpg",
    "/placeholder-3.jpg"
  ];

  // Filtracija: Dozvoljava samo slova (ukljucujuci nasa) i razmake
  const handleTextChange = (e, field) => {
    const value = e.target.value.replace(/[^a-zA-ZšđčćžŠĐČĆŽ\s]/g, "");
    setFormData({ ...formData, [field]: value });
  };

  // Filtracija: Dozvoljava samo brojeve
  const handleNumberChange = (e, field) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) setStatus("success");
      else setStatus("error");
    } catch (err) {
      setStatus("error");
    }
  };

  const nextImg = () => setCurrentImgIndex((prev) => (prev + 1) % images.length);
  const prevImg = () => setCurrentImgIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      {/* HEADER */}
      <header className="bg-white shadow-sm py-6 px-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PawPrint className="text-amber-600 w-8 h-8" />
            <h1 className="text-2xl font-bold tracking-tight">Vrati Me Kući</h1>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-12">
        {/* LEVA STRANA - Informacije i Demo */}
        <div className="space-y-10">
          <div>
            <h2 className="text-4xl font-extrabold mb-6 leading-tight">
              Pametan QR privezak za sigurnost tvog ljubimca
            </h2>
            
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="bg-amber-100 p-3 rounded-full text-amber-700 font-bold">1</div>
                <div>
                  <h3 className="font-bold text-lg">Unesi podatke</h3>
                  <p className="text-gray-600">Popuni kratak profil svog ljubimca sa tvojim kontakt informacijama u formi pored.</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="bg-amber-100 p-3 rounded-full text-amber-700 font-bold">2</div>
                <div>
                  <h3 className="font-bold text-lg">Mi pravimo privezak</h3>
                  <p className="text-gray-600">Generišemo jedinstven QR kod i 3D štampamo izdržljiv privezak od premium Matte materijala koji ti stiže direktno na kućnu adresu.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="bg-amber-100 p-3 rounded-full text-amber-700 font-bold">3</div>
                <div>
                  <h3 className="font-bold text-lg">Brz povratak kući</h3>
                  <p className="text-gray-600">Ako tvoj ljubimac odluta, nalazač skenira QR kod telefonom i odmah vidi tvoj broj kako bi te pozvao.</p>
                </div>
              </div>
            </div>
          </div>

          {/* SLIDER SLIKA */}
          <div className="relative bg-gray-200 rounded-2xl overflow-hidden aspect-video flex items-center justify-center">
            {/* OVO ZAMENI PRAVIM SLIKAMA KASNIJE */}
            <div className="text-center text-gray-500 z-0 absolute">
              Slika psa sa priveskom {currentImgIndex + 1}
            </div>
            <img 
               src={images[currentImgIndex]} 
               alt="Pas sa priveskom" 
               className="object-cover w-full h-full z-10 relative opacity-0" 
               // Ukloni opacity-0 kada stavis prave slike
            />
            <button onClick={prevImg} className="absolute left-2 z-20 bg-white/80 p-2 rounded-full hover:bg-white transition"><ChevronLeft /></button>
            <button onClick={nextImg} className="absolute right-2 z-20 bg-white/80 p-2 rounded-full hover:bg-white transition"><ChevronRight /></button>
          </div>

          {/* ZIVO DEMO QR KODA */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-6">
             <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-100">
               <QRCodeSVG value="https://vratimekuci.rs/p/demo" size={100} />
             </div>
             <div>
               <h4 className="font-bold mb-1">Isprobaj skeniranje!</h4>
               <p className="text-sm text-gray-600">Uzmi telefon, otvori kameru i skeniraj ovaj kod da vidiš kako izgleda profil koji pronalazač vidi.</p>
             </div>
          </div>
        </div>

        {/* DESNA STRANA - Forma za narucivanje */}
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 h-fit">
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-2">Naruči svoj privezak</h3>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-extrabold text-amber-600">990 RSD</span>
              <span className="text-lg text-gray-400 line-through">1.190 RSD</span>
              <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded-md">PROMO</span>
            </div>
          </div>

          {status === "success" ? (
            <div className="bg-green-50 text-green-800 p-6 rounded-2xl text-center">
              <ShieldCheck className="w-16 h-16 mx-auto mb-4 text-green-600" />
              <h3 className="text-xl font-bold mb-2">Porudžbina je uspešna!</h3>
              <p>Hvala na poverenju. Ubrzo ćemo vas kontaktirati oko detalja i slanja.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ime ljubimca *</label>
                  <input required type="text" value={formData.imeLjubimca} onChange={(e) => handleTextChange(e, "imeLjubimca")} className="w-full border-gray-300 rounded-xl p-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-amber-500 transition outline-none border" placeholder="Maks" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tvoje ime i prezime *</label>
                  <input required type="text" value={formData.imeVlasnika} onChange={(e) => handleTextChange(e, "imeVlasnika")} className="w-full border-gray-300 rounded-xl p-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-amber-500 transition outline-none border" placeholder="Petar Petrović" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ulica i broj *</label>
                <input required type="text" value={formData.adresa} onChange={(e) => setFormData({...formData, adresa: e.target.value})} className="w-full border-gray-300 rounded-xl p-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-amber-500 transition outline-none border" placeholder="Bulevar 12" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Grad *</label>
                  <input required type="text" value={formData.grad} onChange={(e) => handleTextChange(e, "grad")} className="w-full border-gray-300 rounded-xl p-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-amber-500 transition outline-none border" placeholder="Zrenjanin" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Poštanski broj *</label>
                  <input required type="text" value={formData.postanskiBroj} onChange={(e) => handleNumberChange(e, "postanskiBroj")} className="w-full border-gray-300 rounded-xl p-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-amber-500 transition outline-none border" placeholder="23000" maxLength={5} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Telefon za kurira i nalazača *</label>
                <input required type="tel" value={formData.telefon} onChange={(e) => handleNumberChange(e, "telefon")} className="w-full border-gray-300 rounded-xl p-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-amber-500 transition outline-none border" placeholder="06..." />
              </div>

              <button disabled={status === "loading"} type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold text-lg py-4 rounded-xl shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2 mt-4">
                {status === "loading" ? "Slanje..." : "Poruči privezak (Plaćanje pouzećem)"}
              </button>
              
              <div className="text-center mt-6 border-t pt-6">
                <p className="text-sm text-gray-600 mb-1">
                  Nakon poručivanja, ubrzo ćemo vas kontaktirati radi potvrde.
                </p>
                <p className="text-sm text-gray-500">
                  Za sva pitanja pišite nam na: <a href="mailto:info@tvojdomen.rs" className="text-amber-600 font-semibold hover:underline">info@tvojdomen.rs</a>
                </p>
              </div>
            </form>
          )}
        </div>
      </main>

      {/* FOOTER sa elementima poverenja */}
      <footer className="bg-white border-t border-gray-200 mt-12 py-12">
        <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <Truck className="w-8 h-8 text-gray-400 mb-3" />
            <h4 className="font-bold">Brza Dostava</h4>
            <p className="text-sm text-gray-500">Šaljemo kurirskom službom direktno na vaša vrata.</p>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <ShieldCheck className="w-8 h-8 text-gray-400 mb-3" />
            <h4 className="font-bold">Kvalitetna Izrada</h4>
            <p className="text-sm text-gray-500">Industrijska preciznost i visok kvalitet završne obrade materijala.</p>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <PawPrint className="w-8 h-8 text-gray-400 mb-3" />
            <h4 className="font-bold">Sigurni Podaci</h4>
            <p className="text-sm text-gray-500">Bezbedno čuvanje profila vašeg ljubimca, bez skrivenih troškova.</p>
          </div>
        </div>
        <div className="max-w-5xl mx-auto px-4 text-center mt-12 pt-8 border-t border-gray-100 text-sm text-gray-400">
          © {new Date().getFullYear()} Vrati Me Kući by Inova Tech IT. Sva prava zadržana.
        </div>
      </footer>
    </div>
  );
}

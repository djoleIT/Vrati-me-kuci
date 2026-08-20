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

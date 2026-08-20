const LETTERS = /[^\p{L}\s\-']/gu;
const DIGITS = /\D/g;
const STREET = /[^\p{L}\p{N}\s\-\/\.]/gu;
const EMAIL_OK = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NOTES = /[<>]/g;

export function lettersOnly(value, max = 80) {
  return String(value || "")
    .replace(LETTERS, "")
    .replace(/\s+/g, " ")
    .slice(0, max);
}

export function digitsOnly(value, max = 15) {
  return String(value || "").replace(DIGITS, "").slice(0, max);
}

export function streetOnly(value, max = 120) {
  return String(value || "")
    .replace(STREET, "")
    .replace(/\s+/g, " ")
    .slice(0, max);
}

export function notesOnly(value, max = 280) {
  return String(value || "").replace(NOTES, "").slice(0, max);
}

export function emailOnly(value, max = 120) {
  return String(value || "").trim().slice(0, max);
}

export function isEmail(value) {
  if (!value) return true;
  return EMAIL_OK.test(value);
}

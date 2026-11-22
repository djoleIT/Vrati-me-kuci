// Dozvoljava slova (uključujući ćčšđž), razmake, crtice i apostrofe — za imena/gradove.
export function lettersOnly(value) {
  return value.replace(/[^\p{L}\s'-]/gu, "");
}

// Dozvoljava samo cifre — za telefone i poštanski broj.
export function digitsOnly(value) {
  return value.replace(/[^0-9]/g, "");
}

// Dozvoljava cifre i jednu decimalnu tačku (zarez se pretvara u tačku) — za mere u mm, npr. 3.5.
export function decimalOnly(value) {
  const cleaned = value.replace(",", ".").replace(/[^0-9.]/g, "");
  const parts = cleaned.split(".");
  return parts.length > 1 ? parts[0] + "." + parts.slice(1).join("").slice(0, 1) : cleaned;
}

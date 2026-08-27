// Dozvoljava slova (uključujući ćčšđž), razmake, crtice i apostrofe — za imena/gradove.
export function lettersOnly(value) {
  return value.replace(/[^\p{L}\s'-]/gu, "");
}

// Dozvoljava samo cifre — za telefone i poštanski broj.
export function digitsOnly(value) {
  return value.replace(/[^0-9]/g, "");
}

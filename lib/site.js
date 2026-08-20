export const SITE = {
  name: "Vrati Me Kući",
  domain: "vratimekuci.rs",
  contactEmail:
    process.env.NEXT_PUBLIC_CONTACT_EMAIL || "kontakt@vratimekuci.rs",
  priceRegular: 1190,
  pricePromo: 990,
  shipping: 250,
};

export const ORDER_STATUSES = ["Nova", "Odštampano", "Poslato", "Naplaćeno"];

export function formatDin(n) {
  return `${Number(n).toLocaleString("sr-RS")} din`;
}

export function makeSlug(length = 8) {
  const chars = "abcdefghjkmnpqrstuvwxyz23456789";
  let out = "";
  const bytes =
    typeof crypto !== "undefined" && crypto.getRandomValues
      ? crypto.getRandomValues(new Uint8Array(length))
      : Array.from({ length }, () => Math.floor(Math.random() * 256));
  for (let i = 0; i < length; i++) out += chars[bytes[i] % chars.length];
  return out;
}

export function isValidSlug(slug) {
  return typeof slug === "string" && /^[a-z0-9]{6,16}$/.test(slug);
}

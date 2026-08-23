const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://vratimekuci.rs";

export default function sitemap() {
  const routes = ["", "/naruci", "/kako-radi", "/cene", "/galerija", "/faq", "/kontakt", "/privacy", "/terms"];
  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
  }));
}

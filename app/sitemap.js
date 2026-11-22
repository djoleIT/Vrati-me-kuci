const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://vratimekuci.com";

export default function sitemap() {
  const routes = ["", "/kako-radi", "/galerija", "/faq", "/kontakt", "/naruci", "/privacy", "/terms"];
  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
  }));
}

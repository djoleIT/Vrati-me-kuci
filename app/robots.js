const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://vratimekuci.rs";

export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/admin", "/p", "/moj-profil"] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}

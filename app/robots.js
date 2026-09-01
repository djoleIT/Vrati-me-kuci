const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://vratimekuci.com";

export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/admin", "/p"] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}

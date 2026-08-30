import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import StickyCta from "@/components/StickyCta";
import NextSection from "@/components/NextSection";

export default function SiteLayout({ children }) {
  return (
    <>
      <Nav />
      {children}
      <NextSection />
      <Footer />
      <StickyCta />
    </>
  );
}

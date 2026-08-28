import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import StickyCta from "@/components/StickyCta";

export default function SiteLayout({ children }) {
  return (
    <>
      <Nav />
      {children}
      <Footer />
      <StickyCta />
    </>
  );
}

import { CONTACT_EMAIL, SMS_CONTACT } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="sitefooter">
      <div className="footerlinks">
        <a href="/privacy">Politika privatnosti</a>
        <a href="/terms">Uslovi korišćenja</a>
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        <a href={`sms:${SMS_CONTACT.replace(/\s/g, "")}`}>SMS: {SMS_CONTACT}</a>
        <a href="/admin" className="footeradmin">Admin</a>
      </div>
      <p>© {new Date().getFullYear()} Vrati Me Kući</p>
    </footer>
  );
}

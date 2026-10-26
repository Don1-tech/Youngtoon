import "./Footer.css";
import logo from "../../assets/shared/LOGO.avif";
import { useLanguage } from "../../i18n";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="site-footer" id="contact">
      <div className="footer-facets" aria-hidden="true"><span /><span /><span /></div>
      <div className="footer-container">
        <div className="footer-brand"><img src={logo} alt={t("footerLogo")} /></div>
        <div className="footer-copy">
          <h2>{t("footerHeading")}</h2>
          <p>
            {t("footerDescription")}{" "}
            <a href="mailto:inyoung@youngtoon.com">{t("footerContact")}</a>
          </p>
        </div>
        <nav className="footer-contact-links" aria-label={t("footerContactLinks")}>
          <a href="tel:+254113777050" aria-label={t("footerPhoneLabel")}>
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 3H5a2 2 0 0 0-2 2c0 8.8 7.2 16 16 16a2 2 0 0 0 2-2v-2l-5-2-2 2a14 14 0 0 1-7-7l2-2-2-5Z" />
            </svg>
            <span>+254-113-777-050</span>
          </a>
          <a href="mailto:inyoung@youngtoon.com" aria-label={t("footerEmailLabel")}>
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m4 7 8 6 8-6" />
            </svg>
            <span>inyoung@youngtoon.com</span>
          </a>
        </nav>
        <p className="copyright visually-hidden">
          {t("copyright")}
        </p>
      </div>
    </footer>
  );
}

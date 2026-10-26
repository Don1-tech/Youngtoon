
import { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import logo from "../../assets/shared/LOGO.avif";
import { useLanguage } from "../../i18n";
import { languages } from "../../locales";

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [currentPath, setCurrentPath] = useState(
    window.location.pathname.replace(/\/+$/, "") || "/"
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuToggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const updateCurrentPath = () =>
      setCurrentPath(window.location.pathname.replace(/\/+$/, "") || "/");

    window.addEventListener("popstate", updateCurrentPath);
    return () => window.removeEventListener("popstate", updateCurrentPath);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        menuToggleRef.current?.focus();
      }
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [isMenuOpen]);

  const navigate = (path: string) => {
    if (window.location.pathname !== path) {
      window.history.pushState({}, "", path);
      window.dispatchEvent(new PopStateEvent("popstate"));
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="site-navbar">
      <div className="navbar-container">
        <a
          className="brand-mark"
          href="/"
          aria-label={t("homeLink")}
          onClick={(event) => {
            event.preventDefault();
            navigate("/");
          }}
        >
          <img src={logo} alt={t("homeLink")} />
        </a>

        <button
          ref={menuToggleRef}
          className="menu-toggle gradient-outline"
          type="button"
          aria-label={isMenuOpen ? t("closeMenu") : t("openMenu")}
          aria-expanded={isMenuOpen}
          aria-controls="main-navigation"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav
          id="main-navigation"
          className={`nav-links${isMenuOpen ? " open" : ""}`}
          aria-label={t("mainNavigation")}
        >
          {[
            { label: t("navHome"), href: "/" },
            { label: t("navProduction"), href: "/production" },
            { label: t("navTraining"), href: "/training" },
            { label: t("navTeam"), href: "/team" },
            { label: t("navContact"), href: "/contact" },
          ].map((link) => {
            const isActive = currentPath === link.href;

            return (
              <a
                key={link.label}
                href={link.href}
                className={`nav-link${isActive ? " active" : ""}`}
                aria-current={isActive ? "page" : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  navigate(link.href);
                }}
              >
                {link.label}
              </a>
            );
          })}
          <label className="language-picker">
            <span className="visually-hidden">{t("language")}</span>
            <select
              aria-label={t("language")}
              value={language}
              onChange={(event) => {
                const selected = languages.find(
                  (option) => option === event.target.value,
                );
                if (selected) setLanguage(selected);
              }}
            >
              <option value="en">English</option>
              <option value="ko">한국어 · Korean</option>
              <option value="ja">日本語 · Japanese</option>
              <option value="zh">简体中文 · Chinese</option>
            </select>
          </label>
        </nav>
      </div>
    </header>
  );
}

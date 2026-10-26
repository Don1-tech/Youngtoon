
import { useRef, useState, type FormEvent } from "react";
import { useLanguage } from "../i18n";
import { getPageText } from "../pageTranslations";

import "./Contact.css";

const contactLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/youngtoon_studios/",
    icon: "instagram",
    external: true,
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@youngtoonstudios?is_from_webapp=1&sender_device=pc",
    icon: "tiktok",
    external: true,
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@YoungToonStudios",
    icon: "youtube",
    external: true,
  },
  {
    name: "X / Twitter (account link not configured)",
    href: "https://x.com/",
    icon: "x",
    external: true,
  },
  {
    name: "Email",
    href: "mailto:inyoung@youngtoon.com",
    icon: "email",
    external: false,
  },
  {
    name: "Phone",
    href: "tel:+254113777050",
    icon: "phone",
    external: false,
  },
] as const;

const studioAddress = "Youngtoon Studios, Riara Rd, Nairobi, Kenya";

const googleMapsEmbedUrl =
  "https://maps.google.com/maps?q=Youngtoon%20Studios%2C%20Riara%20Rd%2C%20Nairobi%2C%20Kenya&output=embed";

export default function ContactPage() {
  const { language } = useLanguage();

  const text = (key: Parameters<typeof getPageText>[1]) =>
    getPageText(language, key);

  const [formError, setFormError] = useState(false);
  const [emailLaunchRequested, setEmailLaunchRequested] = useState(false);

  const emailLaunchRef = useRef(false);

  const submitEnquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;

    if (!form.checkValidity()) {
      setFormError(true);
      form.reportValidity();
      return;
    }

    if (emailLaunchRef.current) return;

    setFormError(false);

    const values = new FormData(form);

    const selectedProject =
      form
        .querySelector<HTMLSelectElement>('select[name="project"]')
        ?.selectedOptions[0]?.textContent?.trim() ??
      String(values.get("project"));

    const subject = `${selectedProject} enquiry from ${values.get("name")}`;

    const body = [
      `Name: ${values.get("name")}`,
      `Email: ${values.get("email")}`,
      `Project: ${selectedProject}`,
      "",
      String(values.get("message")),
    ].join("\n");

    const query = new URLSearchParams({
      view: "cm",
      fs: "1",
      to: "inyoung@youngtoon.com",
      su: subject,
      body,
    });

    const gmailComposeUrl =
      `https://mail.google.com/mail/?${query.toString()}`;

    const composeWindow = window.open(gmailComposeUrl, "_blank");

    if (composeWindow) {
      emailLaunchRef.current = true;
      setEmailLaunchRequested(true);

      composeWindow.opener = null;

      window.setTimeout(() => {
        emailLaunchRef.current = false;
        setEmailLaunchRequested(false);
      }, 1800);

      return;
    }

    window.location.assign(gmailComposeUrl);
  };

  return (
    <main className="site-page-main contact-page">
      <div className="page-container contact-layout">
        <section className="contact-copy">
          <p className="section-eyebrow">
            {text("contactEyebrow")}
          </p>

          <h1>{text("contactTitle")}</h1>

          <p className="contact-lead">
            {text("contactIntro")}
          </p>

          <nav
            className="contact-social-links"
            aria-label="Contact and social links"
          >
            {contactLinks.map((link) => (
              <a
                key={link.icon}
                href={link.href}
                aria-label={link.name}
                title={link.name}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  focusable="false"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {link.icon === "instagram" && (
                    <>
                      <rect
                        x="3.5"
                        y="3.5"
                        width="17"
                        height="17"
                        rx="5"
                      />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.7" cy="6.7" r=".8" />
                    </>
                  )}

                  {link.icon === "tiktok" && (
                    <path d="M14 3v11.1a4.1 4.1 0 1 1-3.4-4.04M14 3c.5 3.1 2.2 4.8 5 5.1" />
                  )}

                  {link.icon === "youtube" && (
                    <>
                      <path d="M21 7.2a2.6 2.6 0 0 0-1.8-1.8C17.6 5 12 5 12 5s-5.6 0-7.2.4A2.6 2.6 0 0 0 3 7.2 27 27 0 0 0 2.6 12a27 27 0 0 0 .4 4.8 2.6 2.6 0 0 0 1.8 1.8C6.4 19 12 19 12 19s5.6 0 7.2-.4a2.6 2.6 0 0 0 1.8-1.8 27 27 0 0 0 .4-4.8 27 27 0 0 0-.4-4.8Z" />
                      <path d="m10 9 5 3-5 3z" />
                    </>
                  )}

                  {link.icon === "x" && (
                    <path d="m4 4 16 16M20 4 4 20M6 4h3l9 16h-3L6 4Z" />
                  )}

                  {link.icon === "email" && (
                    <>
                      <rect
                        x="3"
                        y="5"
                        width="18"
                        height="14"
                        rx="2"
                      />
                      <path d="m4 7 8 6 8-6" />
                    </>
                  )}

                  {link.icon === "phone" && (
                    <path d="M7 3H5a2 2 0 0 0-2 2c0 8.8 7.2 16 16 16a2 2 0 0 0 2-2v-2l-5-2-2 2a14 14 0 0 1-7-7l2-2-2-5Z" />
                  )}
                </svg>
              </a>
            ))}
          </nav>

          <section
            className="contact-location"
            aria-label="Studio location and opening hours"
          >
            <div className="contact-location-details">
              <div className="contact-detail">
                <span className="contact-detail-icon" aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                </span>

                <div className="contact-detail-content">
                  <h2>Visit Us</h2>
                  <p className="contact-studio-name">Youngtoon Studios</p>
                  <p>Riara Road, Nairobi, Kenya</p>
                  <p>P.O. Box 63795-00619</p>
                </div>
              </div>

              <div className="contact-detail">
                <span className="contact-detail-icon" aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                  </svg>
                </span>

                <div className="contact-detail-content">
                  <h2>Hours</h2>
                  <p>9 AM – 5 PM</p>
                </div>
              </div>
            </div>

            <div className="contact-map">
              <iframe
                title={`Google Maps: ${studioAddress}`}
                src={googleMapsEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </section>
        </section>

        <section className="contact-form-card">
          <h2>{text("contactFormTitle")}</h2>

          <form
            noValidate
            onSubmit={submitEnquiry}
            onInput={() => setFormError(false)}
          >
            <label>
              <span>{text("contactName")}</span>
              <input
                name="name"
                autoComplete="name"
                required
              />
            </label>

            <label>
              <span>{text("contactEmail")}</span>
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
              />
            </label>

            <label>
              <span>{text("contactProject")}</span>
              <select
                name="project"
                defaultValue="production"
                required
              >
                <option value="production">
                  {text("contactProjectProduction")}
                </option>
                <option value="training">
                  {text("contactProjectTraining")}
                </option>
                <option value="partnership">
                  {text("contactProjectPartnership")}
                </option>
                <option value="other">
                  {text("contactProjectOther")}
                </option>
              </select>
            </label>

            <label>
              <span>{text("contactMessage")}</span>
              <textarea
                name="message"
                rows={4}
                required
              />
            </label>

            {formError && (
              <p className="form-error" role="alert">
                {text("contactRequired")}
              </p>
            )}

            <button
              className="outline-cta gradient-outline"
              type="submit"
              disabled={emailLaunchRequested}
            >
              {text("contactSend")}{" "}
              <span aria-hidden="true">→</span>
            </button>

            {emailLaunchRequested && (
              <p className="form-note" role="status">
                {text("contactOpening")}
              </p>
            )}
          </form>
        </section>
      </div>
    </main>
  );
}

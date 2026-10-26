
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLanguage } from "../i18n";
import { getPageText } from "../pageTranslations";

import teamGroupPhoto from "../assets/team/team photo.jpg";
import ceoPortrait from "../assets/team/CEO photo.jpg";
import teamCreatingTogether from "../assets/team/creating together.jpg";
import teamShowcasingStories from "../assets/team/showcasing our stories.jpg";
import teamCelebratingCreativity from "../assets/team/celebrating creativity.webp";
import creativeNetworkArt from "../assets/team/creative-network.svg";

import "./Team.css";

type LightboxImage = {
  src: string;
  alt: string;
};

const teamJourney = [
  {
    title: "teamJourneyCreateTitle",
    image: teamCreatingTogether,
    imageAlt: "teamJourneyCreateTitle",
  },
  {
    title: "teamJourneyShareTitle",
    image: teamShowcasingStories,
    imageAlt: "teamJourneyShareTitle",
  },
  {
    title: "teamJourneyCelebrateTitle",
    image: teamCelebratingCreativity,
    imageAlt: "teamJourneyCelebrateTitle",
  },
] as const;

export default function TeamPage() {
  const { language } = useLanguage();

  const [lightboxImage, setLightboxImage] =
    useState<LightboxImage | null>(null);

  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lightboxTriggerRef = useRef<HTMLButtonElement | null>(null);

  const text = (key: Parameters<typeof getPageText>[1]) =>
    getPageText(language, key);

  const imageLabel = (title: string) =>
    text("productionViewImage").replace("{title}", title);

  useEffect(() => {
    if (!lightboxImage) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousRootOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    closeButtonRef.current?.focus();

    const handleDialogKeys = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLightboxImage(null);
        return;
      }

      if (event.key !== "Tab") return;

      const dialog = closeButtonRef.current?.closest('[role="dialog"]');

      const focusable = dialog?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
      );

      if (!focusable?.length) {
        event.preventDefault();
        closeButtonRef.current?.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleDialogKeys);

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousRootOverflow;

      document.removeEventListener("keydown", handleDialogKeys);

      if (lightboxTriggerRef.current?.isConnected) {
        lightboxTriggerRef.current.focus();
      }
    };
  }, [lightboxImage]);

  const openImage = (
    src: string,
    alt: string,
    trigger: HTMLButtonElement,
  ) => {
    lightboxTriggerRef.current = trigger;
    setLightboxImage({ src, alt });
  };

  return (
    <main className="site-page-main team-page">
      <div className="page-container">
        <header className="team-heading">
          <h1>{text("teamTitle")}</h1>
        </header>

        <section className="team-intro" aria-label={text("teamTitle")}>
          <p>{text("teamIntro")}</p>

          <div className="team-stat">
            <strong>
              150<span>+</span>
            </strong>
            <span>{text("teamPioneers")}</span>
          </div>

          <div className="team-stat">
            <strong>
              170<span>+</span>
            </strong>
            <span>{text("teamArtists")}</span>
          </div>
        </section>

        <section className="team-network">
          <h2>{text("teamMeet")}</h2>

          <div className="network-art">
            <button
              className="network-team-photo team-photo-trigger"
              type="button"
              aria-label={imageLabel(text("teamGroupAlt"))}
              onClick={(event) =>
                openImage(
                  teamGroupPhoto,
                  text("teamGroupAlt"),
                  event.currentTarget,
                )
              }
            >
              <img
                src={teamGroupPhoto}
                alt={text("teamGroupAlt")}
                decoding="async"
              />
            </button>
          </div>
        </section>

        <section className="team-values">
          <article className="team-feature">
            <button
              className="team-feature-art team-photo-trigger"
              type="button"
              aria-label={imageLabel(text("teamCeoHeading"))}
              onClick={(event) =>
                openImage(
                  ceoPortrait,
                  text("teamCeoHeading"),
                  event.currentTarget,
                )
              }
            >
              <img
                src={ceoPortrait}
                alt={text("teamCeoHeading")}
                loading="lazy"
                decoding="async"
              />
            </button>

            <div className="team-ceo-copy">
              <h2>{text("teamCeoHeading")}</h2>
              <h3>{text("teamFounderName")}</h3>
              <h4>{text("teamArtistRole")}</h4>
              <p>{text("teamArtistBio")}</p>

              <h4>{text("teamFounderRole")}</h4>
              <p>{text("teamFounderBio")}</p>

              <a
                className="team-resume-link"
                href="https://assets.zyrosite.com/mv02w81bzOTyWW4w/webtoon-portfolio-english-Aq2GkvNqq1SwDlJX.pdf"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={text("teamDownloadResume")}
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  focusable="false"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 3v12m0 0 4-4m-4 4-4-4" />
                  <path d="M5 15v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4" />
                </svg>

                <span>{text("teamDownloadResume")}</span>
              </a>
            </div>
          </article>
        </section>

        <section className="team-vision">
          <p className="section-eyebrow">
            {text("teamApproachEyebrow")}
          </p>

          <h2>{text("teamVisionHeading")}</h2>
          <p>{text("teamVisionCopy")}</p>
        </section>

        <section
          className="team-journey"
          aria-label={text("teamJourneyTitle")}
        >
          <h2>{text("teamJourneyTitle")}</h2>

          <img
            className="team-journey-network-art"
            src={creativeNetworkArt}
            alt=""
            aria-hidden="true"
            decoding="async"
          />

          <div className="team-journey-grid">
            {teamJourney.map((step) => {
              const alt = text(step.imageAlt);

              return (
                <article className="team-journey-card" key={step.title}>
                  <button
                    className="team-journey-image team-photo-trigger"
                    type="button"
                    aria-label={imageLabel(alt)}
                    onClick={(event) =>
                      openImage(
                        step.image,
                        alt,
                        event.currentTarget,
                      )
                    }
                  >
                    <img
                      src={step.image}
                      alt={alt}
                      loading="lazy"
                      decoding="async"
                    />
                  </button>

                  <div className="team-journey-copy">
                    <h3>{text(step.title)}</h3>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>

      {lightboxImage &&
        createPortal(
          <div
            className="production-lightbox"
            role="presentation"
            onClick={(event) => {
              if (event.target === event.currentTarget) {
                setLightboxImage(null);
              }
            }}
          >
            <section
              className="production-lightbox-panel"
              role="dialog"
              aria-modal="true"
              aria-label={lightboxImage.alt}
            >
              <button
                ref={closeButtonRef}
                className="production-lightbox-close"
                type="button"
                aria-label={text("productionCloseImage")}
                onClick={() => setLightboxImage(null)}
              >
                <span aria-hidden="true">×</span>
              </button>

              <div className="production-lightbox-frame">
                <img
                  src={lightboxImage.src}
                  alt={lightboxImage.alt}
                />
              </div>
            </section>
          </div>,
          document.body,
        )}
    </main>
  );
}

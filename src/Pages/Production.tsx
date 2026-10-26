
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLanguage } from "../i18n";
import { getPageText } from "../pageTranslations";

import characterDesignImage from "../assets/production/character design and concept art.png";
import storyboardingImage from "../assets/production/story boarding and pre production.png";
import backgroundArtImage from "../assets/production/background art  for fullscale webtoon production card.png";
import fullProductionImage from "../assets/production/main production and post production.png";
import lineartImage from "../assets/production/lineart.webp";
import baseColorImage from "../assets/production/base color.webp";
import shadingImage from "../assets/production/shading.webp";
import processBackgroundImage from "../assets/production/background ART for production processcard.webp";
import postEffectsImage from "../assets/production/Post effects.webp";

import "./Production.css";

const serviceCards = [
  {
    title: "productionCharacterTitle",
    description: "productionCharacterDescription",
    image: characterDesignImage,
    imageClass: "production-character",
  },
  {
    title: "productionStoryboardTitle",
    description: "productionStoryboardDescription",
    image: storyboardingImage,
    imageClass: "production-storyboard",
  },
  {
    title: "productionBackgroundTitle",
    description: "productionBackgroundDescription",
    image: backgroundArtImage,
    imageClass: "production-background",
  },
  {
    title: "productionFullTitle",
    description: "productionFullDescription",
    image: fullProductionImage,
    imageClass: "production-full",
  },
] as const;

const productionSteps = [
  {
    title: "processLineart",
    className: "step-lineart",
    image: lineartImage,
  },
  {
    title: "processColor",
    className: "step-color",
    image: baseColorImage,
  },
  {
    title: "processShading",
    className: "step-shading",
    image: shadingImage,
  },
  {
    title: "processBackground",
    className: "step-background",
    image: processBackgroundImage,
  },
  {
    title: "processEffects",
    className: "step-effects",
    image: postEffectsImage,
  },
] as const;

type LightboxImage = {
  src: string;
  alt: string;
};

export default function ProductionPage() {
  const { language } = useLanguage();

  const [lightboxImage, setLightboxImage] =
    useState<LightboxImage | null>(null);

  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lightboxTriggerRef = useRef<HTMLElement | null>(null);

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
    trigger: HTMLElement,
  ) => {
    lightboxTriggerRef.current = trigger;
    setLightboxImage({ src, alt });
  };

  return (
    <main className="site-page-main production-page">
      <header className="page-heading">
        <h1>{text("productionTitle")}</h1>
        <p>{text("productionIntro")}</p>
      </header>

      <section
        className="page-container production-services"
        aria-label={text("productionTitle")}
      >
        {serviceCards.map((card) => (
          <article className="service-card" key={card.title}>
            <button
              className={`page-image production-image-button ${card.imageClass}`}
              type="button"
              aria-label={imageLabel(text(card.title))}
              onClick={(event) =>
                openImage(
                  card.image,
                  text(card.title),
                  event.currentTarget,
                )
              }
            >
              <img
                src={card.image}
                alt={text(card.title)}
                decoding="async"
              />
            </button>

            <div className="service-copy">
              <h2>{text(card.title)}</h2>
              <p>{text(card.description)}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="production-process">
        <div className="page-container">
          <header className="section-heading">
            <h2>{text("productionProcessTitle")}</h2>
            <p>{text("productionProcessIntro")}</p>
          </header>

          <ol className="process-grid">
            {productionSteps.map((step) => (
              <li className="process-step" key={step.title}>
                <button
                  className={`process-art production-image-button ${step.className}`}
                  type="button"
                  aria-label={imageLabel(text(step.title))}
                  onClick={(event) =>
                    openImage(
                      step.image,
                      text(step.title),
                      event.currentTarget,
                    )
                  }
                >
                  <img
                    src={step.image}
                    alt={text(step.title)}
                    decoding="async"
                  />
                </button>

                <p>{text(step.title)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

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

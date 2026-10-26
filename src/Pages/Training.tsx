
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLanguage } from "../i18n";
import { getPageText } from "../pageTranslations";

import clipStudioLogo from "../assets/production/Clip studio paint.jpg";
import photoshopLogo from "../assets/production/PS.jpg";

import trainingCharacterImage from "../assets/training/character design and concept art training.png";
import trainingAnatomyImage from "../assets/training/Anatomy and lineart training.jpg";
import trainingColorImage from "../assets/training/coloring and shading training.png";
import trainingPanelImage from "../assets/training/webtoon panelling and pre production training.jpg";

import traineeGallery2 from "../assets/training/trainee gallery 2.webp";
import traineeGallery3 from "../assets/training/trainee gallery 3.png";
import traineeGallery4 from "../assets/training/trainee gallery 4.jpg";
import traineeGallery5 from "../assets/training/trainee gallery 5.jpg";
import traineeGallery6 from "../assets/training/trainee gallery 6.jpg";
import traineeGallery7 from "../assets/training/trainee gallery 7.jpg";
import traineeGallery8 from "../assets/training/trainee gallery 8.webp";
import trainerGallery1 from "../assets/training/trainer gallery 1.webp";

import "./Training.css";

const trainingCards = [
  {
    title: "trainingCharacterTitle",
    description: "trainingCharacterDescription",
    image: trainingCharacterImage,
    imageClass: "training-character",
  },
  {
    title: "trainingAnatomyTitle",
    description: "trainingAnatomyDescription",
    image: trainingAnatomyImage,
    imageClass: "training-anatomy",
  },
  {
    title: "trainingColorTitle",
    description: "trainingColorDescription",
    image: trainingColorImage,
    imageClass: "training-color",
  },
  {
    title: "trainingPanelTitle",
    description: "trainingPanelDescription",
    image: trainingPanelImage,
    imageClass: "training-panel",
  },
] as const;

const trainingGalleryImages = [
  traineeGallery2,
  traineeGallery3,
  traineeGallery4,
  traineeGallery5,
  traineeGallery6,
  traineeGallery7,
  traineeGallery8,
  trainerGallery1,
] as const;

type LightboxImage = {
  src: string;
  alt: string;
};

export default function TrainingPage() {
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
    <main className="site-page-main training-page">
      <section className="training-intro page-container">
        <div
          className="software-mark clip-mark"
          aria-label={text("toolClip")}
        >
          <img
            src={clipStudioLogo}
            alt={text("toolClip")}
            decoding="async"
          />
        </div>

        <header className="page-heading">
          <h1>{text("trainingTitle")}</h1>
          <p>{text("trainingIntro")}</p>
        </header>

        <div
          className="software-mark photoshop-mark"
          aria-label={text("toolPhotoshop")}
        >
          <img
            src={photoshopLogo}
            alt={text("toolPhotoshop")}
            decoding="async"
          />
        </div>
      </section>

      <section
        className="page-container training-services"
        aria-label={text("trainingTitle")}
      >
        {trainingCards.map((card) => (
          <article className="service-card training-card" key={card.title}>
            <button
              className={`page-image training-card-image ${card.imageClass}`}
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

      <section className="training-gallery">
        <div className="page-container">
          <header className="section-heading">
            <h2>{text("trainingGalleryTitle")}</h2>
            <p>{text("trainingGalleryIntro")}</p>
          </header>

          <div className="gallery-grid">
            {trainingGalleryImages.map((image, index) => {
              const alt = `${text("trainingGalleryTitle")} ${index + 1}`;

              return (
                <button
                  className={`gallery-tile training-gallery-image gallery-tile-${index + 1}`}
                  key={index}
                  type="button"
                  aria-label={imageLabel(alt)}
                  onClick={(event) =>
                    openImage(image, alt, event.currentTarget)
                  }
                >
                  <img
                    src={image}
                    alt={alt}
                    loading="lazy"
                    decoding="async"
                  />
                </button>
              );
            })}
          </div>
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

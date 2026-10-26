
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./Home.css";

import Navbar from "../Sections/navbar/Navbar";
import Footer from "../Sections/footer/Footer";
import { useLanguage } from "../i18n";

import heroImage from "../assets/home/hero.png";
import carouselImageOne from "../assets/home/Hero with sword carousel 1.png";
import carouselImageTwo from "../assets/home/lucky carousel 2.png";
import carouselImageThree from "../assets/home/crack carousel 3.png";
import creativeCharacterDesignImage from "../assets/home/creative character design.png";
import storytellingImage from "../assets/home/storytelling .png";
import lucky21Card from "../assets/home/lucky21 card.png";

import polygonOne from "../assets/home/polygon1.png";
import polygonTwo from "../assets/home/Polygon 2.png";
import polygonThree from "../assets/home/Polygon 3.png";
import polygonFour from "../assets/home/Polygon 4.png";
const showcaseItems = [
  {
    titleKey: "artwork",
    image: carouselImageOne,
    className: "card-artwork",
  },
  {
    titleKey: "characterDesign",
    image: carouselImageTwo,
    className: "card-character",
  },
  {
    titleKey: "webcomicProduction",
    image: carouselImageThree,
    className: "card-webcomic",
  },
  {
    titleKey: "creativeCharacterDesign",
    image: creativeCharacterDesignImage,
    className: "card-creative-character",
  },
  {
    titleKey: "storytelling",
    image: storytellingImage,
    className: "card-storytelling",
  },
] as const;

const ROTATION_INTERVAL = 5000;
const STORY_VIDEO_ID = "0KNtvQ5MuCw";
const STORY_THUMBNAIL_URL = `https://i.ytimg.com/vi/${STORY_VIDEO_ID}/hqdefault.jpg`;

type LightboxContent =
  | {
      type: "image";
      title: string;
      src: string;
      alt: string;
      variant?: "featured";
    }
  | { type: "video"; title: string };

export default function Home() {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(1);
  const [lightbox, setLightbox] = useState<LightboxContent | null>(null);
  const [storyThumbnail, setStoryThumbnail] = useState(STORY_THUMBNAIL_URL);
  const lightboxCloseRef = useRef<HTMLButtonElement>(null);
  const lightboxTriggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (lightbox) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const timer = window.setInterval(() => {
      if (document.visibilityState !== "visible") return;

      setActiveIndex(
        (current) => (current + 1) % showcaseItems.length
      );
    }, ROTATION_INTERVAL);

    return () => window.clearInterval(timer);
  }, [lightbox]);

  useEffect(() => {
    if (!lightbox) return;

    const previousOverflow = document.body.style.overflow;
    const previousRootOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    lightboxCloseRef.current?.focus();

    const handleDialogKeys = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLightbox(null);
        return;
      }

      if (event.key !== "Tab") return;

      const dialog = lightboxCloseRef.current?.closest('[role="dialog"]');
      const focusable = dialog?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), iframe, [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable?.length) {
        event.preventDefault();
        lightboxCloseRef.current?.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!dialog?.contains(document.activeElement)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleDialogKeys);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.documentElement.style.overflow = previousRootOverflow;
      document.removeEventListener("keydown", handleDialogKeys);
      if (lightboxTriggerRef.current?.isConnected) {
        lightboxTriggerRef.current.focus();
      }
    };
  }, [lightbox]);

  const openLightbox = (
    content: LightboxContent,
    trigger: HTMLElement,
  ) => {
    lightboxTriggerRef.current = trigger;
    setLightbox(content);
  };

  const previousSlide = () => {
    setActiveIndex(
      (current) =>
        (current - 1 + showcaseItems.length) % showcaseItems.length
    );
  };

  const nextSlide = () => {
    setActiveIndex(
      (current) => (current + 1) % showcaseItems.length
    );
  };

  const getCardPosition = (index: number) => {
    const difference =
      (index - activeIndex + showcaseItems.length) %
      showcaseItems.length;

    if (difference === 0) return "active";
    if (difference === 1) return "right";
    if (difference === showcaseItems.length - 1) return "left";
    if (difference === 2) return "right-far";
    return "left-far";
  };

  return (
    <div className="site-shell">
      <Navbar />

      <main className="home-main">
        <section
          className="hero-section"
          id="top"
          aria-label={t("heroLabel")}
        >
          <div className="hero-decoration" aria-hidden="true">
            <img className="hero-polygon polygon-one" src={polygonOne} alt="" />
            <img className="hero-polygon polygon-two" src={polygonTwo} alt="" />
            <img className="hero-polygon polygon-three" src={polygonThree} alt="" />
            <img className="hero-polygon polygon-four" src={polygonFour} alt="" />
          </div>

          <div className="hero-container">
            <div className="hero-copy hero-copy-left">
              <p className="eyebrow">{t("productionTagline")}</p>

              <h1>{t("productionHeading")}</h1>

              <p className="hero-description">{t("productionDescription")}</p>

              <a className="outline-cta gradient-outline" href="/production">
                {t("explore")} <span aria-hidden="true">+</span>
              </a>
            </div>

            <div className="hero-art" aria-hidden="true">
              <img src={heroImage} alt="" fetchPriority="high" />
            </div>

            <div className="hero-copy hero-copy-right" id="training">
              <p className="eyebrow">{t("trainingTagline")}</p>

              <h2>{t("trainingHeading")}</h2>

              <p className="hero-description">{t("trainingDescription")}</p>

              <a className="outline-cta gradient-outline" href="/training">
                {t("explore")} <span aria-hidden="true">+</span>
              </a>
            </div>
          </div>
        </section>

        <section
          className="showcase-carousel"
          aria-label={t("carouselLabel")}
        >
          <div className="content-container">
            <div className="carousel-stage">
              <button
                className="carousel-arrow carousel-arrow-left gradient-outline"
                type="button"
                onClick={previousSlide}
                aria-label={t("previousCard")}
              >
                <span aria-hidden="true">‹</span>
              </button>

              <div
                className="showcase-cylinder"
                role="group"
                aria-roledescription={t("carouselRole")}
                aria-label={t("carouselGroup")}
              >
                {showcaseItems.map((item, index) => {
                  const position = getCardPosition(index);
                  const isActive = position === "active";
                  const title = t(item.titleKey);

                  return (
                    <button
                      key={item.className}
                      type="button"
                      className={[
                        "showcase-card",
                        "gradient-outline",
                        item.className,
                        `position-${position}`,
                      ].join(" ")}
                      aria-pressed={isActive}
                      aria-label={title}
                      tabIndex={isActive ? 0 : -1}
                      onClick={(event) => {
                        if (isActive) {
                          openLightbox(
                            {
                              type: "image",
                              title,
                              src: item.image,
                              alt: title,
                            },
                            event.currentTarget,
                          );
                        } else {
                          setActiveIndex(index);
                        }
                      }}
                    >
                      <span className="showcase-card-face">
                        <span className="showcase-card-image">
                          <img src={item.image} alt="" loading="lazy" decoding="async" />
                          <span className="showcase-image-shade" />
                        </span>
                      </span>

                      <span className="showcase-card-label">
                        {title}
                      </span>
                    </button>
                  );
                })}
              </div>

              <button
                className="carousel-arrow carousel-arrow-right gradient-outline"
                type="button"
                onClick={nextSlide}
                aria-label={t("nextCard")}
              >
                <span aria-hidden="true">›</span>
              </button>
            </div>

            <div className="carousel-footer">
              <div className="carousel-dots" aria-label={t("chooseCard")}>
                {showcaseItems.map((item, index) => {
                  const title = t(item.titleKey);
                  return (
                  <button
                    key={item.className}
                    type="button"
                    className={`carousel-dot gradient-outline${
                      index === activeIndex ? " selected" : ""
                    }`}
                    aria-label={t("showCard", { title })}
                    aria-pressed={index === activeIndex}
                    aria-current={index === activeIndex ? "true" : undefined}
                    onClick={() => setActiveIndex(index)}
                  />
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="featured-production" id="production">
          <div className="content-container featured-container">
            <div className="featured-copy">
              <p className="section-eyebrow">{t("featuredProduction")}</p>

              <h2>&quot;LUCKY 21&quot;</h2>
              <h3>{t("luckyLaunched")}</h3>

              <p>{t("luckyDescription")}</p>

              <a
                className="outline-cta gradient-outline"
                href="https://www.webtoons.com/en/canvas/lucky-21/list?title_no=1050679"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("readWebtoon")} <span aria-hidden="true">→</span>
              </a>
            </div>

            <button
              className="featured-cover"
              type="button"
              aria-label={t("enlargeFeatured")}
              onClick={(event) =>
                openLightbox(
                  {
                    type: "image",
                    title: t("featuredProduction"),
                    src: lucky21Card,
                    alt: t("luckyCoverAlt"),
                    variant: "featured",
                  },
                  event.currentTarget,
                )
              }
            >
              <img
                src={lucky21Card}
                alt={t("luckyCoverAlt")}
                loading="lazy"
                decoding="async"
              />
            </button>
          </div>
        </section>

        <section className="story-section" id="story">
          <div className="content-container story-container">
            <button
              className="story-thumbnail"
              type="button"
              aria-label={t("playStoryVideo")}
              onClick={(event) =>
                openLightbox(
                  { type: "video", title: t("storyVideo") },
                  event.currentTarget,
                )
              }
            >
              <img
                src={storyThumbnail}
                alt=""
                loading="lazy"
                decoding="async"
                onError={(event) => {
                  if (storyThumbnail === STORY_THUMBNAIL_URL) {
                    setStoryThumbnail(
                      `https://img.youtube.com/vi/${STORY_VIDEO_ID}/mqdefault.jpg`,
                    );
                  } else {
                    event.currentTarget.hidden = true;
                  }
                }}
              />
              <span className="story-play-icon" aria-hidden="true">
                <svg viewBox="0 0 48 48" focusable="false">
                  <circle cx="24" cy="24" r="22" />
                  <path d="M20 15.5 33 24l-13 8.5z" />
                </svg>
              </span>
            </button>

            <div className="story-copy">
              <p className="section-eyebrow">{t("ourStory")}</p>
              <h2>{t("storyHeading")}</h2>

              <p>{t("storyDescription")}</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      {lightbox &&
        createPortal(
          <div
            className="media-lightbox"
            role="presentation"
            onClick={(event) => {
              if (event.target === event.currentTarget) setLightbox(null);
            }}
          >
            <section
              className={`lightbox-panel${lightbox.type === "image" && lightbox.variant === "featured" ? " lightbox-panel-featured" : ""}${lightbox.type === "video" ? " lightbox-panel-video" : ""}`}
              role="dialog"
              aria-modal="true"
              aria-label={lightbox.title}
            >
              <button
                ref={lightboxCloseRef}
                className="lightbox-close gradient-outline"
                type="button"
                aria-label={t("closeMedia")}
                onClick={() => setLightbox(null)}
              >
                <span aria-hidden="true">×</span>
              </button>
              {lightbox.type === "image" ? (
                <div className="lightbox-image-frame">
                  <img src={lightbox.src} alt={lightbox.alt} />
                </div>
              ) : (
                <div className="lightbox-video">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${STORY_VIDEO_ID}?autoplay=1&rel=0`}
                    title={lightbox.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              )}
            </section>
          </div>,
          document.body,
        )}
    </div>
  );
}

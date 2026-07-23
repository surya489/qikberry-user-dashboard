import { useEffect, useRef, useState, type ReactNode } from "react";
import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Autoplay, EffectCreative, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/pagination";

interface ContentSliderProps<T> {
  items: T[];
  renderItem: (item: T) => ReactNode;
  getItemKey: (item: T) => string | number;
  accent?: "indigo" | "violet";
}

const accentStyles = {
  indigo: {
    ring: "from-indigo-500/20 via-violet-500/10 to-indigo-500/20",
    glow: "bg-indigo-500/10",
    counter: "text-indigo-600 dark:text-indigo-400",
    nav: "hover:border-indigo-300 hover:text-indigo-600 dark:hover:border-indigo-500 dark:hover:text-indigo-400",
    dotActive: "slider-dot-active-indigo",
  },
  violet: {
    ring: "from-violet-500/20 via-fuchsia-500/10 to-violet-500/20",
    glow: "bg-violet-500/10",
    counter: "text-violet-600 dark:text-violet-400",
    nav: "hover:border-violet-300 hover:text-violet-600 dark:hover:border-violet-500 dark:hover:text-violet-400",
    dotActive: "slider-dot-active-violet",
  },
};

const ContentSlider = <T,>({
  items,
  renderItem,
  getItemKey,
  accent = "indigo",
}: ContentSliderProps<T>) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const paginationRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const styles = accentStyles[accent];

  useEffect(() => {
    const swiper = swiperRef.current;

    if (!swiper || !paginationRef.current) {
      return;
    }

    swiper.params.pagination = {
      el: paginationRef.current,
      clickable: true,
      bulletClass: "slider-dot",
      bulletActiveClass: styles.dotActive,
    };

    swiper.pagination.destroy();
    swiper.pagination.init();
    swiper.pagination.render();
    swiper.pagination.update();
  }, [items.length, styles.dotActive]);

  if (items.length === 0) {
    return null;
  }

  const handlePrevious = () => {
    swiperRef.current?.slidePrev();
  };

  const handleNext = () => {
    swiperRef.current?.slideNext();
  };

  return (
    <div className="relative flex h-full flex-col">
      <div
        className={clsx(
          "pointer-events-none absolute -inset-px rounded-[1.65rem] bg-gradient-to-br opacity-80",
          styles.ring
        )}
      />
      <div
        className={clsx(
          "pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full blur-3xl",
          styles.glow
        )}
      />

      <div className="relative flex flex-1 flex-col overflow-hidden rounded-[1.6rem] border border-slate-200/80 bg-gradient-to-br from-slate-50 via-white to-slate-100 p-4 shadow-inner dark:border-slate-700/80 dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-800/80">
        <Swiper
          modules={[Autoplay, EffectCreative, Pagination]}
          effect="creative"
          creativeEffect={{
            prev: {
              translate: ["-110%", 0, -200],
              opacity: 0.35,
              scale: 0.88,
            },
            next: {
              translate: ["110%", 0, -200],
              opacity: 0.35,
              scale: 0.88,
            },
          }}
          className="content-slider-slide w-full flex-1"
          spaceBetween={24}
          slidesPerView={1}
          speed={700}
          grabCursor
          loop={items.length > 1}
          autoplay={
            items.length > 1
              ? { delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true }
              : false
          }
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        >
          {items.map((item) => (
            <SwiperSlide key={getItemKey(item)} className="!h-auto">
              <div className="slider-slide-content flex min-h-[22rem] items-stretch">
                {renderItem(item)}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="mt-5 flex shrink-0 items-center justify-between gap-3 border-t border-slate-200/80 pt-4 dark:border-slate-700/80">
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous slide"
              onClick={handlePrevious}
              className={clsx(
                "flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300",
                styles.nav
              )}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={handleNext}
              className={clsx(
                "flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300",
                styles.nav
              )}
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <div ref={paginationRef} className="flex flex-1 items-center justify-center gap-1.5" />

          <p
            className={clsx(
              "min-w-[3.25rem] text-right text-sm font-semibold tabular-nums",
              styles.counter
            )}
          >
            {String(activeIndex + 1).padStart(2, "0")}
            <span className="font-normal text-slate-400 dark:text-slate-500">
              /{String(items.length).padStart(2, "0")}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContentSlider;

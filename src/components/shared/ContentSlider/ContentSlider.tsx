import { useState, type ReactNode } from "react";
import clsx from "clsx";
import { Autoplay, EffectCreative } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "@/styles/content-slider.css";
import "swiper/css";
import "swiper/css/effect-creative";

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
  },
  violet: {
    ring: "from-violet-500/20 via-fuchsia-500/10 to-violet-500/20",
    glow: "bg-violet-500/10",
    counter: "text-violet-600 dark:text-violet-400",
  },
};

const ContentSlider = <T,>({
  items,
  renderItem,
  getItemKey,
  accent = "indigo",
}: ContentSliderProps<T>) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const styles = accentStyles[accent];

  if (items.length === 0) {
    return null;
  }

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
          modules={[Autoplay, EffectCreative]}
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

        <div className="mt-5 flex shrink-0 items-center justify-end gap-3 border-t border-slate-200/80 pt-4 dark:border-slate-700/80">
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

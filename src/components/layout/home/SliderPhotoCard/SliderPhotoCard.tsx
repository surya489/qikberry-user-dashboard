import { Image as ImageIcon } from "lucide-react";
import type { MouseEvent } from "react";

import ImageWithFallback from "../../../shared/ImageWithFallback/ImageWithFallback";
import Button from "../../../ui/Button/Button";

interface SliderPhotoCardProps {
  id: number;
  title: string;
  imageUrl: string;
  fullImageUrl?: string;
  albumId: number;
  onClick?: () => void;
}

const SliderPhotoCard = ({
  id,
  title,
  imageUrl,
  fullImageUrl,
  albumId,
  onClick,
}: SliderPhotoCardProps) => {
  const handleViewClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onClick?.();
  };

  return (
    <article
      className="group flex h-full min-h-[22rem] w-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm transition-all duration-300 hover:shadow-lg dark:border-slate-700/90 dark:bg-slate-800/90"
      onClick={onClick}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onClick?.();
        }
      }}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className="relative min-h-[11.5rem] flex-1 overflow-hidden bg-gradient-to-br from-violet-100 to-indigo-100 dark:from-violet-950/50 dark:to-indigo-950/50">
        <ImageWithFallback
          src={imageUrl}
          fallbackSrc={fullImageUrl}
          alt={title}
          className="h-full min-h-[11.5rem] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
        <span className="absolute left-4 top-4 inline-flex rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-violet-700 shadow-sm backdrop-blur dark:bg-slate-900/80 dark:text-violet-300">
          Photo #{id}
        </span>
      </div>

      <div className="flex flex-col gap-2 px-5 py-4">
        <h3 className="line-clamp-2 text-base font-bold leading-snug text-slate-900 dark:text-slate-100">
          {title}
        </h3>

        <div className="flex items-center justify-between pt-1">
          <span className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Album #{albumId}
          </span>
          <Button size="sm" variant="ghost" type="button" onClick={handleViewClick}>
            View
            <ImageIcon size={16} />
          </Button>
        </div>
      </div>
    </article>
  );
};

export default SliderPhotoCard;

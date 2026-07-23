import { Image as ImageIcon } from "lucide-react";
import type { MouseEvent } from "react";

import ImageWithFallback from "../../../shared/ImageWithFallback/ImageWithFallback";
import Button from "../../../ui/Button/Button";

interface PhotoCardProps {
  id: number;
  title: string;
  imageUrl: string;
  fullImageUrl?: string;
  albumId: number;
  onClick?: () => void;
}

const albumBadgePalette = [
  "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
  "bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-950 dark:text-fuchsia-300",
  "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300",
  "bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300",
];

const getAlbumBadgeClass = (albumId: number) =>
  albumBadgePalette[(albumId - 1) % albumBadgePalette.length];

const PhotoCard = ({
  id,
  title,
  imageUrl,
  fullImageUrl,
  albumId,
  onClick,
}: PhotoCardProps) => {
  const handleViewClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onClick?.();
  };

  return (
    <article
      className="group cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800/80 dark:hover:border-indigo-800 dark:hover:shadow-indigo-900/20"
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
      <div className="relative overflow-hidden">
        <ImageWithFallback
          src={imageUrl}
          fallbackSrc={fullImageUrl}
          alt={title}
          className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span
          className={`absolute right-3 top-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold shadow-sm ${getAlbumBadgeClass(albumId)}`}
        >
          Album {albumId}
        </span>
      </div>

      <div className="space-y-2 p-5">
        <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-700 dark:text-slate-300">
          Photo #{id}
        </span>
        <h3 className="line-clamp-2 text-lg font-semibold leading-snug text-slate-900 transition-colors group-hover:text-indigo-700 dark:text-slate-100 dark:group-hover:text-indigo-300">
          {title}
        </h3>

        <div className="flex items-center justify-between border-t border-slate-100 pt-3 dark:border-slate-700/80">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
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

export default PhotoCard;

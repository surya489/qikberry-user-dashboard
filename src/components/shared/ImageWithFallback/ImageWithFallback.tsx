import { ImageOff, LoaderCircle } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
}

const ImageWithFallback = ({
  src,
  alt,
  fallbackSrc,
  className,
}: ImageWithFallbackProps) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = () => {
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setIsLoading(true);
      setCurrentSrc(fallbackSrc);
      return;
    }

    setIsLoading(false);
    setHasError(true);
  };

  if (hasError) {
    return (
      <div
        className={clsx(
          "flex   w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-violet-100 via-indigo-50 to-slate-100 text-violet-600 dark:from-violet-950/60 dark:via-indigo-950/40 dark:to-slate-900 dark:text-violet-300 min-h-[250px] h-auto",
          className
        )}
      >
        <ImageOff size={28} strokeWidth={1.5} />
        <span className="text-xs font-medium">Preview unavailable</span>
      </div>
    );
  }

  return (
    <>
      {isLoading ? (
        <div
          className="absolute inset-0 z-10 flex items-center justify-center bg-slate-100/90 dark:bg-slate-800/90"
          role="status"
          aria-label="Loading image preview"
        >
          <LoaderCircle
            size={30}
            className="animate-spin text-indigo-600 dark:text-indigo-400"
          />
        </div>
      ) : null}
      <img
        src={currentSrc}
        alt={alt}
        className={clsx(
          className,
          "transition-opacity duration-500",
          isLoading ? "opacity-0" : "opacity-100"
        )}
        loading="lazy"
        onLoad={() => setIsLoading(false)}
        onError={handleError}
      />
    </>
  );
};

export default ImageWithFallback;

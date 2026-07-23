import { ImageOff } from "lucide-react";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    setHasError(false);
    setCurrentSrc(src);
  }, [src]);

  const handleError = () => {
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      return;
    }

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
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      loading="lazy"
      onError={handleError}
    />
  );
};

export default ImageWithFallback;

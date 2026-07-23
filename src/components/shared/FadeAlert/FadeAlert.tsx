import clsx from "clsx";
import { useEffect, useState } from "react";

type FadeAlertVariant = "error" | "success";

interface FadeAlertProps {
  message: string;
  visible: boolean;
  onHidden?: () => void;
  autoHideMs?: number;
  variant?: FadeAlertVariant;
}

const variantStyles: Record<FadeAlertVariant, string> = {
  error:
    "border-red-200 bg-red-50 text-red-600 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-400",
  success:
    "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-400",
};

const FadeAlert = ({
  message,
  visible,
  onHidden,
  autoHideMs = 4000,
  variant = "error",
}: FadeAlertProps) => {
  const [shouldRender, setShouldRender] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!visible || !message) {
      setIsVisible(false);
      return;
    }

    setShouldRender(true);
    const showFrame = window.requestAnimationFrame(() => {
      setIsVisible(true);
    });

    const hideTimer = window.setTimeout(() => {
      setIsVisible(false);
    }, autoHideMs);

    return () => {
      window.cancelAnimationFrame(showFrame);
      window.clearTimeout(hideTimer);
    };
  }, [visible, message, autoHideMs]);

  useEffect(() => {
    if (isVisible || !shouldRender) {
      return;
    }

    const removeTimer = window.setTimeout(() => {
      setShouldRender(false);
      onHidden?.();
    }, 300);

    return () => window.clearTimeout(removeTimer);
  }, [isVisible, shouldRender, onHidden]);

  if (!shouldRender || !message) {
    return null;
  }

  return (
    <div
      role="alert"
      aria-live="polite"
      className={clsx(
        "rounded-xl border px-4 py-3 text-sm transition-all duration-300",
        variantStyles[variant],
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
      )}
    >
      {message}
    </div>
  );
};

export default FadeAlert;

import { type ButtonProps } from "./Button.types";
import { baseButtonStyles, buttonSizes, buttonVariants } from "./Button.style";
import clsx from "clsx";

const Button = ({
    children,
    variant = "primary",
    size = "md",
    loading = false,
    fullWidth = false,
    className = "",
    disabled,
    ...props
}: ButtonProps) => {
    return (
        <button
            className={clsx(
                baseButtonStyles,
                buttonVariants[variant],
                buttonSizes[size],
                fullWidth && "w-full",
                className
            )}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? "Loading..." : children}
        </button>
    );
};

export default Button;
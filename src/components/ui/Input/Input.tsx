import {
    containerStyles,
    errorTextStyles,
    helperTextStyles,
    iconStyles,
    inputStyles,
    inputWrapperStyles,
    labelStyles,
} from "./Input.styles";

import { type InputProps } from "./Input.types";

const Input = ({
    label,
    error,
    helperText,
    leftIcon,
    rightIcon,
    containerClassName = "",
    className = "",
    ...props
}: InputProps) => {
    return (
        <div className={`${containerStyles} ${containerClassName}`}>
            {label && <label className={labelStyles}>{label}</label>}

            <div className={inputWrapperStyles}>
                {leftIcon && (
                    <span className={iconStyles}>
                        {leftIcon}
                    </span>
                )}

                <input
                    autoComplete="off"
                    className={`${inputStyles} ${className}`}
                    {...props}
                />

                {rightIcon && (
                    <span className={iconStyles}>
                        {rightIcon}
                    </span>
                )}
            </div>

            {error ? (
                <p className={errorTextStyles}>{error}</p>
            ) : (
                helperText && (
                    <p className={helperTextStyles}>{helperText}</p>
                )
            )}
        </div>
    );
};

export default Input;
import { ReactNode, useState, useEffect, useRef } from "react";
import FieldError from "./FieldError";

interface FormFieldProps {
    label: string;
    htmlFor: string;
    children: ReactNode;
    error?: string;
    noLabel?: boolean;
    className?: string;
}

export default function FormField({
    label,
    htmlFor,
    children,
    error,
    noLabel = false,
    className = "",
}: FormFieldProps) {
    const [isFilled, setIsFilled] = useState(false);
    const fieldRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const field = fieldRef.current;
        if (!field) return;

        const input = field.querySelector(`#${htmlFor}`) as
            | HTMLInputElement
            | HTMLTextAreaElement
            | HTMLSelectElement
            | null;
        if (!input) return;

        const checkValue = () => {
            const hasValue = (input as HTMLInputElement).value?.trim() !== "";
            const isFocused = document.activeElement === input;
            setIsFilled(hasValue || isFocused);
        };

        checkValue();

        input.addEventListener("focus", () => setIsFilled(true));
        input.addEventListener("blur", checkValue);
        input.addEventListener("input", checkValue);

        return () => {
            input.removeEventListener("focus", () => setIsFilled(true));
            input.removeEventListener("blur", checkValue);
            input.removeEventListener("input", checkValue);
        };
    }, [htmlFor]);

    return (
        <div
            ref={fieldRef}
            className={`
                field
                ${className} 
                ${isFilled ? "filled" : ""} 
            `}
        >
            {!noLabel && (
                <label
                    htmlFor={htmlFor}
                    className={`label anim ${isFilled ? "fixed" : ""}`}
                >
                    <span className="field-label">
                        <span>{label}</span>
                    </span>
                </label>
            )}
            {children}
            {error && <FieldError error={error} />}
        </div>
    );
}

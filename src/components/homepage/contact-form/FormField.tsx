import { ReactNode } from "react";
import FieldError from "./FieldError";

interface FormFieldProps {
    label: string;
    htmlFor: string;
    children: ReactNode;
    error?: string;
}

export default function FormField({ label, htmlFor, children, error }: FormFieldProps) {
    return (
        <div className="field">
            <label htmlFor={htmlFor}>
                <span className="field-label">
                    <span>{label}</span>
                </span>
            </label>
            {children}
            {error && <FieldError error={error} />}
        </div>
    );
}

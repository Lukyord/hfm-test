import React from "react";

type FieldErrorProps = {
    error: string;
};

export default function FieldError({ error }: FieldErrorProps) {
    return (
        <div className="field-error">
            <p>{error}</p>
        </div>
    );
}

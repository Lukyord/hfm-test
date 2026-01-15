import React from "react";

export default function Spinner() {
    return (
        <div className="spinner" role="status" aria-live="polite" aria-label="Loading">
            <div className="spinner-circle" aria-hidden="true"></div>
        </div>
    );
}

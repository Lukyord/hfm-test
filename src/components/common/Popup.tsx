import React, { ReactNode, useEffect, useRef } from "react";

interface PopupProps {
    isOpen: boolean;
    onClose?: () => void;
    children: ReactNode;
}

export default function Popup({ isOpen, onClose = () => {}, children }: PopupProps) {
    const popupRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isOpen) return;

        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        const handleClickOutside = (e: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
                onClose();
            }
        };

        document.addEventListener("keydown", handleEsc);
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("keydown", handleEsc);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onClose]);

    return (
        <div className={`popup ${isOpen ? "active" : ""}`} ref={popupRef}>
            <div className="popup-content">{children}</div>
        </div>
    );
}

import React, { ReactNode, useEffect, useRef, RefObject } from "react";

interface PopupProps {
    isOpen: boolean;
    onClose?: () => void;
    children: ReactNode;
    positionPc?: "center" | "start" | "end";
    positionMb?: "center" | "start" | "end";
    triggerRef?: RefObject<HTMLElement | null>;
}

export default function Popup({
    isOpen,
    onClose = () => {},
    children,
    positionPc = "center",
    positionMb = "center",
    triggerRef,
}: PopupProps) {
    const popupRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isOpen) return;

        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as Node;
            if (
                popupRef.current &&
                !popupRef.current.contains(target) &&
                (!triggerRef?.current || !triggerRef.current.contains(target))
            ) {
                onClose();
            }
        };

        document.addEventListener("keydown", handleEsc);
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("keydown", handleEsc);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onClose, triggerRef]);

    return (
        <div
            className={`popup ${isOpen ? "active" : ""}`}
            data-position-pc={positionPc}
            data-position-mb={positionMb}
            ref={popupRef}
        >
            <div className="popup-content">{children}</div>
        </div>
    );
}

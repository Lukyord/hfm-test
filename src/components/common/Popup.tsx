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

    useEffect(() => {
        if (!isOpen || !popupRef.current) return;

        const popupElement = popupRef.current;
        const focusableElements = popupElement.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        const handleTabKey = (e: KeyboardEvent) => {
            if (e.key !== "Tab") return;

            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement?.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement?.focus();
                }
            }
        };

        firstElement?.focus();
        popupElement.addEventListener("keydown", handleTabKey);

        return () => {
            popupElement.removeEventListener("keydown", handleTabKey);
        };
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen && triggerRef?.current) {
            triggerRef.current.focus();
        }
    }, [isOpen, triggerRef]);

    return (
        <div
            className={`popup ${isOpen ? "active" : ""}`}
            data-position-pc={positionPc}
            data-position-mb={positionMb}
            ref={popupRef}
            role="dialog"
            aria-modal="true"
            aria-hidden={!isOpen}
            {...(isOpen ? {} : { tabIndex: -1 })}
        >
            <div className="popup-content">{children}</div>
        </div>
    );
}

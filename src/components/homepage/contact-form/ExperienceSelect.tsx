import { RefObject } from "react";

import { experienceOptions } from "./type";

import Popup from "@/components/common/Popup";

type ExperienceSelectProps = {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (value: (typeof experienceOptions)[number]["value"]) => void;
    triggerRef?: RefObject<HTMLElement | null>;
};

export default function ExperienceSelect({ isOpen, onClose, onSelect, triggerRef }: ExperienceSelectProps) {
    return (
        <Popup isOpen={isOpen} onClose={onClose} triggerRef={triggerRef}>
            <div className="country-select">
                <div className="country-list" data-lenis-prevent role="listbox" aria-label="Experience options">
                    {experienceOptions.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            className="country-item"
                            onClick={() => onSelect(option.value)}
                            role="option"
                            aria-selected={false}
                        >
                            <span>{option.label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </Popup>
    );
}

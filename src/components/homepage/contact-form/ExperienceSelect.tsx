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
                <div className="country-list" data-lenis-prevent>
                    {experienceOptions.map((option) => (
                        <div key={option.value} className="country-item" onClick={() => onSelect(option.value)}>
                            <span>{option.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </Popup>
    );
}

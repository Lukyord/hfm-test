import Popup from "@/components/common/Popup";
import { experienceOptions } from "./type";

interface ExperienceSelectProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (value: (typeof experienceOptions)[number]["value"]) => void;
}

export default function ExperienceSelect({ isOpen, onClose, onSelect }: ExperienceSelectProps) {
    return (
        <Popup isOpen={isOpen} onClose={onClose}>
            <div className="country-select">
                <div className="country-list">
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

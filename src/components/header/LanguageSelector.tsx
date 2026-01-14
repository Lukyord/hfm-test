import React, { useState, useRef } from "react";
import Popup from "@/components/common/Popup";
import flagEn from "@/assets/media/lang-flag-en.webp";
import flagTh from "@/assets/media/lang-flag-th.webp";
import RenderMedia from "../common/Media";

type Language = {
    code: string;
    name: string;
    flag: string;
};

const languages: Language[] = [
    { code: "en", name: "EN", flag: flagEn },
    { code: "th", name: "TH", flag: flagTh },
];

export default function LanguageSelector() {
    const [currentLanguage, setCurrentLanguage] = useState<Language>(
        languages[0]
    );
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const languageSelectorTriggerRef = useRef<HTMLButtonElement>(null);

    const handleLanguageSelect = (language: Language) => {
        setCurrentLanguage(language);
        setIsPopupOpen(false);
    };

    const handleToggle = () => {
        setIsPopupOpen((prev) => !prev);
    };

    return (
        <div className="language-selector">
            <button
                ref={languageSelectorTriggerRef}
                type="button"
                className="language-selector-button"
                onClick={handleToggle}
                aria-label="Select language"
            >
                <div className="flag">
                    <RenderMedia
                        src={currentLanguage.flag}
                        alt={currentLanguage.name}
                        className="language-flag"
                    />
                </div>
            </button>

            <Popup
                isOpen={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
                positionPc="center"
                positionMb="end"
                triggerRef={languageSelectorTriggerRef}
            >
                <div className="language-list">
                    {languages.map((language) => (
                        <button
                            key={language.code}
                            type="button"
                            className={`language-item ${
                                currentLanguage.code === language.code
                                    ? "active"
                                    : ""
                            }`}
                            onClick={() => handleLanguageSelect(language)}
                        >
                            <div className="flag">
                                <RenderMedia
                                    src={language.flag}
                                    alt={language.name}
                                    className="language-flag"
                                />
                            </div>
                            <span>{language.name}</span>
                        </button>
                    ))}
                </div>
            </Popup>
        </div>
    );
}

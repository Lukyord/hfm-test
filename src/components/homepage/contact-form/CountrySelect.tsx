import { useState, useEffect, RefObject } from "react";
import Popup from "@/components/common/Popup";
import type { Country } from "./type";

type CountrySelectProps = {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (country: Country) => void;
    countries: Country[];
    triggerRef?: RefObject<HTMLElement | null>;
};

export default function CountrySelect({ isOpen, onClose, onSelect, countries, triggerRef }: CountrySelectProps) {
    const [search, setSearch] = useState("");

    useEffect(() => {
        if (!isOpen) {
            setSearch("");
        }
    }, [isOpen]);

    const filtered = countries.filter((c) => c.name.common.toLowerCase().includes(search.toLowerCase()));

    const handleSelect = (country: Country) => {
        setSearch("");
        onSelect(country);
    };

    return (
        <Popup isOpen={isOpen} onClose={onClose} triggerRef={triggerRef}>
            <div className="country-select">
                <label htmlFor="country-search" className="visually-hidden">
                    Search countries
                </label>
                <input
                    id="country-search"
                    type="text"
                    placeholder="Search countries..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="popup-search"
                    aria-label="Search countries"
                />
                <div className="country-list" data-lenis-prevent role="listbox" aria-label="Country options">
                    {filtered.length === 0 ? (
                        <div className="country-empty" role="status" aria-live="polite">
                            <p className="size-extra-small">No countries found</p>
                        </div>
                    ) : (
                        filtered.map((country) => (
                            <button
                                key={country.name.common}
                                type="button"
                                className="country-item"
                                onClick={() => handleSelect(country)}
                                role="option"
                                aria-selected={false}
                            >
                                <img src={country.flags.svg} alt="" aria-hidden="true" />
                                <span className="country-name">{country.name.common}</span>
                                <span className="country-code">
                                    {country.idd.root}
                                    {country.idd.suffixes[0]}
                                </span>
                            </button>
                        ))
                    )}
                </div>
            </div>
        </Popup>
    );
}

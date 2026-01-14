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

export default function CountrySelect({
    isOpen,
    onClose,
    onSelect,
    countries,
    triggerRef,
}: CountrySelectProps) {
    const [search, setSearch] = useState("");

    useEffect(() => {
        if (!isOpen) {
            setSearch("");
        }
    }, [isOpen]);

    const filtered = countries.filter((c) =>
        c.name.common.toLowerCase().includes(search.toLowerCase())
    );

    const handleSelect = (country: Country) => {
        setSearch("");
        onSelect(country);
    };

    return (
        <Popup isOpen={isOpen} onClose={onClose} triggerRef={triggerRef}>
            <div className="country-select">
                <input
                    type="text"
                    placeholder="Search countries..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="popup-search"
                />
                <div className="country-list">
                    {filtered.length === 0 ? (
                        <div className="country-empty">
                            <p className="size-extra-small">
                                No countries found
                            </p>
                        </div>
                    ) : (
                        filtered.map((country) => (
                            <div
                                key={country.name.common}
                                className="country-item"
                                onClick={() => handleSelect(country)}
                            >
                                <img
                                    src={country.flags.svg}
                                    alt={country.name.common}
                                />
                                <span className="country-name">
                                    {country.name.common}
                                </span>
                                <span className="country-code">
                                    {country.idd.root}
                                    {country.idd.suffixes[0]}
                                </span>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </Popup>
    );
}

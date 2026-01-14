import { useState, useEffect, RefObject } from "react";
import Popup from "@/components/common/Popup";
import type { Country } from "./type";

type CountryCodeItem = {
    code: string;
    countries: Country[];
};

type CountryCodeSelectProps = {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (code: string) => void;
    countryCodes: CountryCodeItem[];
    triggerRef?: RefObject<HTMLElement | null>;
};

export default function CountryCodeSelect({
    isOpen,
    onClose,
    onSelect,
    countryCodes,
    triggerRef,
}: CountryCodeSelectProps) {
    const [search, setSearch] = useState("");

    useEffect(() => {
        if (!isOpen) {
            setSearch("");
        }
    }, [isOpen]);

    const filtered = countryCodes.filter(
        (item) =>
            item.code.toLowerCase().includes(search.toLowerCase()) ||
            item.countries.some((c) =>
                c.name.common.toLowerCase().includes(search.toLowerCase())
            )
    );

    const handleSelect = (code: string) => {
        setSearch("");
        onSelect(code);
    };

    return (
        <Popup
            isOpen={isOpen}
            onClose={onClose}
            triggerRef={triggerRef}
            positionPc="start"
            positionMb="start"
        >
            <div className="country-select">
                <input
                    type="text"
                    placeholder="Search codes or countries..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="popup-search"
                />
                <div className="country-list">
                    {filtered.length === 0 ? (
                        <div className="country-empty">
                            <p className="size-extra-small">
                                No country codes found
                            </p>
                        </div>
                    ) : (
                        filtered.map((item) => (
                            <div
                                key={item.code}
                                className="country-item"
                                onClick={() => handleSelect(item.code)}
                            >
                                <img
                                    src={item.countries[0].flags.png}
                                    alt={item.countries[0].name.common}
                                />
                                <span className="country-name">
                                    {item.countries
                                        .map((c) => c.name.common)
                                        .join(", ")}
                                </span>
                                <span className="country-code">
                                    {item.code}
                                </span>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </Popup>
    );
}

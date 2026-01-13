import { useState, useEffect } from "react";
import Popup from "@/components/common/Popup";
import type { Country } from "./type";

interface CountryCodeItem {
    code: string;
    countries: Country[];
}

interface CountryCodeSelectProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (code: string) => void;
    countryCodes: CountryCodeItem[];
}

export default function CountryCodeSelect({ isOpen, onClose, onSelect, countryCodes }: CountryCodeSelectProps) {
    const [search, setSearch] = useState("");

    useEffect(() => {
        if (!isOpen) {
            setSearch("");
        }
    }, [isOpen]);

    const filtered = countryCodes.filter(
        (item) =>
            item.code.toLowerCase().includes(search.toLowerCase()) ||
            item.countries.some((c) => c.name.common.toLowerCase().includes(search.toLowerCase()))
    );

    const handleSelect = (code: string) => {
        setSearch("");
        onSelect(code);
    };

    return (
        <Popup isOpen={isOpen} onClose={onClose}>
            <div className="country-select">
                <input
                    type="text"
                    placeholder="Search codes or countries..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="country-search"
                />
                <div className="country-list">
                    {filtered.length === 0 ? (
                        <div className="country-empty">No country codes found</div>
                    ) : (
                        filtered.map((item) => (
                            <div key={item.code} className="country-item" onClick={() => handleSelect(item.code)}>
                                <img src={item.countries[0].flags.png} alt={item.countries[0].name.common} />
                                <span className="country-code-label">{item.code}</span>
                                <span className="country-names">
                                    {item.countries.map((c) => c.name.common).join(", ")}
                                </span>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </Popup>
    );
}

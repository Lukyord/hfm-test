import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Popup from "../../common/Popup.tsx";

interface Country {
    name: { common: string };
    flags: { png: string; svg: string };
    idd: { root: string; suffixes: string[] };
}

export default function ContactForm() {
    const { register, setValue } = useForm();

    const [countries, setCountries] = useState<Country[]>([]);
    const [countrySearch, setCountrySearch] = useState("");
    const [countryCodeSearch, setCountryCodeSearch] = useState("");
    const [isCountryPopupOpen, setIsCountryPopupOpen] = useState(false);
    const [isCountryCodePopupOpen, setIsCountryCodePopupOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

    useEffect(() => {
        fetch("https://restcountries.com/v3.1/all?fields=name,flags,idd")
            .then((res) => res.json())
            .then((data) => setCountries(data));
    }, []);

    const filteredCountries = countries.filter((c) =>
        c.name.common.toLowerCase().includes(countrySearch.toLowerCase())
    );

    const getCountryCode = (country: Country) => `${country.idd.root}${country.idd.suffixes[0]}`;

    const countryCodes = Array.from(
        new Map(
            countries.map((c) => {
                const code = getCountryCode(c);
                return [code, { code, countries: [] as Country[] }];
            })
        ).values()
    );

    countryCodes.forEach((item) => {
        item.countries = countries.filter((c) => getCountryCode(c) === item.code);
    });

    const filteredCountryCodes = countryCodes.filter(
        (item) =>
            item.code.toLowerCase().includes(countryCodeSearch.toLowerCase()) ||
            item.countries.some((c) => c.name.common.toLowerCase().includes(countryCodeSearch.toLowerCase()))
    );

    const handleCountrySelect = (country: Country) => {
        setSelectedCountry(country);
        setValue("country", country.name.common);
        setValue("country-code", getCountryCode(country));
        setIsCountryPopupOpen(false);
    };

    const handleCountryCodeSelect = (code: string) => {
        const countryWithCode = countries.find((c) => getCountryCode(c) === code);
        if (countryWithCode) {
            setSelectedCountry(countryWithCode);
            setValue("country", countryWithCode.name.common);
            setValue("country-code", code);
        }
        setIsCountryCodePopupOpen(false);
    };

    return (
        <form className="contact-form">
            <h2>Contact Us</h2>
            <div className="fields">
                <div className="field">
                    <label htmlFor="name">
                        <span className="field-label">
                            <span>First Name</span>
                        </span>
                    </label>
                    <input type="text" id="first-name" name="first-name" />
                </div>
                <div className="field">
                    <label htmlFor="last-name">
                        <span className="field-label">
                            <span>Last Name</span>
                        </span>
                    </label>
                    <input type="text" id="last-name" name="last-name" />
                </div>
                <div className="field">
                    <label htmlFor="country">
                        <span className="field-label">
                            <span>Country</span>
                        </span>
                    </label>
                    <button type="button" onClick={() => setIsCountryPopupOpen(true)} className="country-select-button">
                        {selectedCountry ? (
                            <>
                                <img src={selectedCountry.flags.png} alt={selectedCountry.name.common} />
                                {selectedCountry.name.common}
                            </>
                        ) : (
                            "Select Country"
                        )}
                    </button>
                    <input type="hidden" {...register("country")} value={selectedCountry?.name.common || ""} />

                    <Popup isOpen={isCountryPopupOpen} onClose={() => setIsCountryPopupOpen(false)}>
                        <div className="country-select">
                            <input
                                type="text"
                                placeholder="Search countries..."
                                value={countrySearch}
                                onChange={(e) => setCountrySearch(e.target.value)}
                                className="country-search"
                            />
                            <div className="country-list">
                                {filteredCountries.map((country) => (
                                    <div
                                        key={country.name.common}
                                        className="country-item"
                                        onClick={() => handleCountrySelect(country)}
                                    >
                                        <img src={country.flags.png} alt={country.name.common} />
                                        <span>{country.name.common}</span>
                                        <span className="country-code">
                                            {country.idd.root}
                                            {country.idd.suffixes[0]}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Popup>
                </div>

                <div className="field">
                    <div className="subfield">
                        <label htmlFor="country-code">
                            <span className="field-label">
                                <span>Country Code</span>
                            </span>
                        </label>
                        <button
                            type="button"
                            onClick={() => setIsCountryCodePopupOpen(true)}
                            className="country-select-button"
                        >
                            {selectedCountry ? getCountryCode(selectedCountry) : "Select Code"}
                        </button>
                        <input
                            type="hidden"
                            {...register("country-code")}
                            value={selectedCountry ? getCountryCode(selectedCountry) : ""}
                        />

                        <Popup isOpen={isCountryCodePopupOpen} onClose={() => setIsCountryCodePopupOpen(false)}>
                            <div className="country-select">
                                <input
                                    type="text"
                                    placeholder="Search codes or countries..."
                                    value={countryCodeSearch}
                                    onChange={(e) => setCountryCodeSearch(e.target.value)}
                                    className="country-search"
                                />
                                <div className="country-list">
                                    {filteredCountryCodes.map((country) => (
                                        <div
                                            key={country.code}
                                            className="country-item"
                                            onClick={() => handleCountryCodeSelect(country.code)}
                                        >
                                            <img
                                                src={country.countries[0].flags.png}
                                                alt={country.countries[0].name.common}
                                            />
                                            <span className="country-code-label">{country.code}</span>
                                            <span className="country-names">
                                                {country.countries.map((c) => c.name.common).join(", ")}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Popup>
                    </div>
                    <div className="subfield">
                        <label htmlFor="phone">
                            <span className="field-label">
                                <span>Phone</span>
                            </span>
                        </label>
                        <input type="text" id="phone" name="phone" />
                    </div>
                </div>
                <div className="field">
                    <label htmlFor="email">
                        <span>
                            <span className="field-label">Email</span>
                        </span>
                    </label>
                    <input type="email" id="email" name="email" />
                </div>
                <div className="field">
                    <label htmlFor="experience">
                        <span className="field-label">
                            <span>Experience</span>
                        </span>
                    </label>
                    <select id="experience" name="experience">
                        <option value="0-1">0-1 years</option>
                        <option value="1-3">1-3 years</option>
                        <option value="3-5">3-5 years</option>
                    </select>
                </div>
            </div>

            <button type="submit">Submit</button>
        </form>
    );
}

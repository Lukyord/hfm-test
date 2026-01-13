import React, { useState, useEffect } from "react";
import type { FieldValues } from "react-hook-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";

import { TContactFormSchema, contactFormSchema, Country, experienceOptions } from "./type.ts";

import Popup from "../../common/Popup.tsx";
import FieldError from "./FieldError.tsx";

export default function ContactForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        setValue,
        getValues,
    } = useForm<TContactFormSchema>({
        resolver: zodResolver(contactFormSchema),
    });

    const [countries, setCountries] = useState<Country[]>([]);
    const [countrySearch, setCountrySearch] = useState("");
    const [countryCodeSearch, setCountryCodeSearch] = useState("");
    const [isCountryPopupOpen, setIsCountryPopupOpen] = useState(false);
    const [isCountryCodePopupOpen, setIsCountryCodePopupOpen] = useState(false);
    const [isExperiencePopupOpen, setIsExperiencePopupOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
    const [selectedExperience, setSelectedExperience] = useState<string>("");

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

    function handleCountrySelect(country: Country) {
        setSelectedCountry(country);
        setValue("country", country.name.common);
        setValue("country-code", getCountryCode(country));
        setIsCountryPopupOpen(false);
    }

    function handleCountryCodeSelect(code: string) {
        const countryWithCode = countries.find((c) => getCountryCode(c) === code);
        if (countryWithCode) {
            setSelectedCountry(countryWithCode);
            setValue("country", countryWithCode.name.common);
            setValue("country-code", code);
        }
        setIsCountryCodePopupOpen(false);
    }

    function handleExperienceSelect(value: (typeof experienceOptions)[number]["value"]) {
        setSelectedExperience(value);
        setValue("experience", value);
        setIsExperiencePopupOpen(false);
    }

    async function onSubmit(data: FieldValues) {
        // MOCK SUBMIT TO SERVER
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const firstName = getValues("first-name");
        toast.success(`Form submitted successfully for ${firstName}`);

        reset();
        setSelectedCountry(null);
        setSelectedExperience("");
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
            <h2>Contact Us</h2>
            <div className="fields">
                <div className="field">
                    <label htmlFor="name">
                        <span className="field-label">
                            <span>First Name</span>
                        </span>
                    </label>
                    <input type="text" id="first-name" {...register("first-name")} />
                    {errors["first-name"] && <FieldError error={errors["first-name"].message as string} />}
                </div>
                <div className="field">
                    <label htmlFor="last-name">
                        <span className="field-label">
                            <span>Last Name</span>
                        </span>
                    </label>
                    <input type="text" id="last-name" {...register("last-name")} />
                    {errors["last-name"] && <FieldError error={errors["last-name"].message as string} />}
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
                                <img src={selectedCountry.flags.svg} alt={selectedCountry.name.common} />
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
                                        <img src={country.flags.svg} alt={country.name.common} />
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
                    <div className="subfield grow">
                        <label htmlFor="phone">
                            <span className="field-label">
                                <span>Phone</span>
                            </span>
                        </label>
                        <input type="text" id="phone" {...register("phone")} />
                        {errors.phone && <FieldError error={errors.phone.message as string} />}
                    </div>
                </div>
                <div className="field">
                    <label htmlFor="email">
                        <span>
                            <span className="field-label">Email</span>
                        </span>
                    </label>
                    <input type="email" id="email" {...register("email")} />
                    {errors.email && <FieldError error={errors.email.message as string} />}
                </div>
                <div className="field">
                    <label htmlFor="experience">
                        <span className="field-label">
                            <span>Experience</span>
                        </span>
                    </label>
                    <button
                        type="button"
                        onClick={() => setIsExperiencePopupOpen(true)}
                        className="country-select-button"
                    >
                        {selectedExperience
                            ? experienceOptions.find((opt) => opt.value === selectedExperience)?.label
                            : "Select Experience"}
                    </button>
                    <input type="hidden" {...register("experience")} value={selectedExperience || ""} />

                    <Popup isOpen={isExperiencePopupOpen} onClose={() => setIsExperiencePopupOpen(false)}>
                        <div className="country-select">
                            <div className="country-list">
                                {experienceOptions.map((option) => (
                                    <div
                                        key={option.value}
                                        className="country-item"
                                        onClick={() => handleExperienceSelect(option.value)}
                                    >
                                        <span>{option.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Popup>
                    {errors.experience && <FieldError error={errors.experience.message as string} />}
                </div>
            </div>

            <button type="submit" disabled={isSubmitting}>
                Submit
            </button>
        </form>
    );
}

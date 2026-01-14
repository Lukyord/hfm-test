import { useState, useRef } from "react";
import type { FieldValues } from "react-hook-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";

import {
    TContactFormSchema,
    contactFormSchema,
    experienceOptions,
    Country,
} from "./type";
import { useCountries, useCountryCodes, getCountryCode } from "./useCountries";

import CountrySelect from "./CountrySelect";
import CountryCodeSelect from "./CountryCodeSelect";
import ExperienceSelect from "./ExperienceSelect";
import FormField from "./FormField";
import FieldError from "./FieldError";
import Spinner from "@/components/common/Spinner";

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

    const { countries, isLoading: isLoadingCountries } = useCountries();
    const countryCodes = useCountryCodes(countries);

    const [isCountryPopupOpen, setIsCountryPopupOpen] = useState(false);
    const [isCountryCodePopupOpen, setIsCountryCodePopupOpen] = useState(false);
    const [isExperiencePopupOpen, setIsExperiencePopupOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(
        null
    );
    const [selectedExperience, setSelectedExperience] = useState<string>("");

    const countryCodeSelectTriggerRef = useRef<HTMLButtonElement>(null);
    const countrySelectTriggerRef = useRef<HTMLButtonElement>(null);
    const experienceSelectTriggerRef = useRef<HTMLButtonElement>(null);

    async function onSubmit(data: FieldValues) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const firstName = getValues("first-name");
        toast.success(`Form submitted successfully for ${firstName}`);
        console.log(data);
        reset();
        setSelectedCountry(null);
        setSelectedExperience("");
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
            <h2>Contact Us</h2>

            {/* FIELDS */}
            <div className="fields">
                {/* FIRST NAME */}
                <FormField
                    label="First Name"
                    htmlFor="first-name"
                    error={errors["first-name"]?.message as string}
                >
                    <input
                        type="text"
                        id="first-name"
                        {...register("first-name")}
                        autoComplete="given-name"
                    />
                </FormField>

                {/* LAST NAME */}
                <FormField
                    label="Last Name"
                    htmlFor="last-name"
                    error={errors["last-name"]?.message as string}
                >
                    <input
                        type="text"
                        id="last-name"
                        {...register("last-name")}
                        autoComplete="family-name"
                    />
                </FormField>

                {/* COUNTRY */}
                <div className="field">
                    <label htmlFor="country">
                        <span className="field-label">
                            <span>Country</span>
                        </span>
                    </label>
                    <button
                        type="button"
                        onClick={() => setIsCountryPopupOpen((prev) => !prev)}
                        className="country-select-button"
                        disabled={isLoadingCountries}
                        ref={countrySelectTriggerRef}
                    >
                        {isLoadingCountries ? (
                            <Spinner />
                        ) : selectedCountry ? (
                            <>
                                <img
                                    src={selectedCountry.flags.svg}
                                    alt={selectedCountry.name.common}
                                />
                                {selectedCountry.name.common}
                            </>
                        ) : (
                            "Select Country"
                        )}
                    </button>
                    <input
                        type="hidden"
                        {...register("country")}
                        value={selectedCountry?.name.common || ""}
                    />
                    <CountrySelect
                        isOpen={isCountryPopupOpen}
                        onClose={() => setIsCountryPopupOpen((prev) => !prev)}
                        onSelect={(country: Country) => {
                            setSelectedCountry(country);
                            setValue("country", country.name.common);
                            setValue("country-code", getCountryCode(country));
                            setIsCountryPopupOpen(false);
                        }}
                        countries={countries}
                        triggerRef={countrySelectTriggerRef}
                    />
                </div>

                {/* PHONE */}
                <div className="field">
                    {/* COUNTRY CODE */}
                    <div className="subfield">
                        <label htmlFor="country-code">
                            <span className="field-label">
                                <span>Country Code</span>
                            </span>
                        </label>
                        <button
                            type="button"
                            onClick={() =>
                                setIsCountryCodePopupOpen((prev) => !prev)
                            }
                            className="country-select-button"
                            disabled={isLoadingCountries}
                            ref={countryCodeSelectTriggerRef}
                        >
                            {isLoadingCountries ? (
                                <Spinner />
                            ) : selectedCountry ? (
                                getCountryCode(selectedCountry)
                            ) : (
                                "Select Code"
                            )}
                        </button>
                        <input
                            type="hidden"
                            {...register("country-code")}
                            value={
                                selectedCountry
                                    ? getCountryCode(selectedCountry)
                                    : ""
                            }
                        />
                        <CountryCodeSelect
                            isOpen={isCountryCodePopupOpen}
                            onClose={() => setIsCountryCodePopupOpen(false)}
                            onSelect={(code: string) => {
                                const countryWithCode = countries.find(
                                    (c) => getCountryCode(c) === code
                                );
                                if (countryWithCode) {
                                    setSelectedCountry(countryWithCode);
                                    setValue(
                                        "country",
                                        countryWithCode.name.common
                                    );
                                    setValue("country-code", code);
                                }
                                setIsCountryCodePopupOpen(false);
                            }}
                            countryCodes={countryCodes}
                            triggerRef={countryCodeSelectTriggerRef}
                        />
                    </div>

                    {/* PHONE */}
                    <div className="subfield grow">
                        <label htmlFor="phone">
                            <span className="field-label">
                                <span>Phone</span>
                            </span>
                        </label>
                        <input
                            type="text"
                            id="phone"
                            {...register("phone")}
                            autoComplete="tel"
                        />
                        {errors.phone && (
                            <FieldError
                                error={errors.phone.message as string}
                            />
                        )}
                    </div>
                </div>

                {/* EMAIL */}
                <FormField
                    label="Email"
                    htmlFor="email"
                    error={errors.email?.message as string}
                >
                    <input
                        type="email"
                        id="email"
                        {...register("email")}
                        autoComplete="email"
                    />
                </FormField>

                {/* EXPERIENCE */}
                <FormField
                    label="Experience"
                    htmlFor="experience"
                    error={errors.experience?.message as string}
                >
                    <label htmlFor="experience">
                        <span className="field-label">
                            <span>Experience</span>
                        </span>
                    </label>
                    <button
                        type="button"
                        onClick={() =>
                            setIsExperiencePopupOpen((prev) => !prev)
                        }
                        className="country-select-button"
                        ref={experienceSelectTriggerRef}
                    >
                        {selectedExperience
                            ? experienceOptions.find(
                                  (opt) => opt.value === selectedExperience
                              )?.label
                            : "Select Experience"}
                    </button>
                    <input
                        type="hidden"
                        {...register("experience")}
                        value={selectedExperience || ""}
                    />
                    <ExperienceSelect
                        isOpen={isExperiencePopupOpen}
                        onClose={() => setIsExperiencePopupOpen(false)}
                        onSelect={(
                            value: (typeof experienceOptions)[number]["value"]
                        ) => {
                            setSelectedExperience(value);
                            setValue("experience", value);
                            setIsExperiencePopupOpen(false);
                        }}
                        triggerRef={experienceSelectTriggerRef}
                    />
                    {errors.experience && (
                        <FieldError
                            error={errors.experience.message as string}
                        />
                    )}
                </FormField>
            </div>

            <button type="submit" disabled={isSubmitting}>
                Submit
            </button>
        </form>
    );
}

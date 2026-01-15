import { useState, useRef } from "react";
import type { FieldValues } from "react-hook-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

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
    const [selectedCountryCode, setSelectedCountryCode] = useState<string>("");
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
        setSelectedCountryCode("");
        setSelectedExperience("");

        const form = document.querySelector(".contact-form");
        if (form) {
            const filledFields = form.querySelectorAll(".field.filled");
            filledFields.forEach((field) => {
                field.classList.remove("filled");
            });
        }
    }

    const formTitleId = "contact-form-title";

    return (
        <form 
            onSubmit={handleSubmit(onSubmit)} 
            className="contact-form"
            aria-labelledby={formTitleId}
            noValidate
        >
            <div className="form-ttl">
                <h3 id={formTitleId} className="size-h3 weight-bold c-black">
                    Lorem ipsum dolor sit amet
                </h3>
            </div>

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
                    <label htmlFor="country-select" className="visually-hidden">
                        Country
                    </label>
                    <button
                        type="button"
                        id="country-select"
                        onClick={() => setIsCountryPopupOpen((prev) => !prev)}
                        className={`popup-trigger-button input ${
                            selectedCountry ? "active" : ""
                        }`}
                        disabled={isLoadingCountries}
                        ref={countrySelectTriggerRef}
                        aria-expanded={isCountryPopupOpen}
                        aria-haspopup="listbox"
                        aria-label={selectedCountry ? `Selected country: ${selectedCountry.name.common}` : "Select country"}
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
                            const countryCode = getCountryCode(country);
                            setSelectedCountryCode(countryCode);
                            setValue("country", country.name.common);
                            setValue("country-code", countryCode);
                            setIsCountryPopupOpen(false);
                        }}
                        countries={countries}
                        triggerRef={countrySelectTriggerRef}
                    />
                </div>

                {/* PHONE */}
                <div className="field">
                    {/* COUNTRY CODE */}
                    <div className="subfield country-code">
                        <label htmlFor="country-code-select" className="visually-hidden">
                            Country Code
                        </label>
                        <button
                            type="button"
                            id="country-code-select"
                            onClick={() =>
                                setIsCountryCodePopupOpen((prev) => !prev)
                            }
                            className={`popup-trigger-button input ${
                                selectedCountryCode ? "active" : ""
                            }`}
                            disabled={isLoadingCountries}
                            ref={countryCodeSelectTriggerRef}
                            aria-expanded={isCountryCodePopupOpen}
                            aria-haspopup="listbox"
                            aria-label={selectedCountryCode ? `Selected country code: ${selectedCountryCode}` : "Select country code"}
                        >
                            {isLoadingCountries ? (
                                <Spinner />
                            ) : selectedCountryCode ? (
                                selectedCountryCode
                            ) : (
                                "Code"
                            )}
                        </button>
                        <input
                            type="hidden"
                            {...register("country-code")}
                            value={selectedCountryCode}
                        />
                        <CountryCodeSelect
                            isOpen={isCountryCodePopupOpen}
                            onClose={() => setIsCountryCodePopupOpen(false)}
                            onSelect={(code: string) => {
                                setSelectedCountryCode(code);
                                setValue("country-code", code);
                                setIsCountryCodePopupOpen(false);
                            }}
                            countryCodes={countryCodes}
                            triggerRef={countryCodeSelectTriggerRef}
                        />
                    </div>

                    {/* PHONE */}
                    <div className="subfield grow">
                        <FormField
                            label="Phone"
                            htmlFor="phone"
                            error={errors.phone?.message as string}
                        >
                            <input
                                type="text"
                                id="phone"
                                {...register("phone")}
                                autoComplete="tel"
                            />
                        </FormField>
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
                    noLabel
                    className="experience-field"
                >
                    <button
                        type="button"
                        id="experience"
                        onClick={() =>
                            setIsExperiencePopupOpen((prev) => !prev)
                        }
                        className={`popup-trigger-button input ${
                            selectedExperience ? "active" : ""
                        }`}
                        ref={experienceSelectTriggerRef}
                        aria-expanded={isExperiencePopupOpen}
                        aria-haspopup="listbox"
                        aria-label={selectedExperience ? `Selected experience: ${experienceOptions.find(opt => opt.value === selectedExperience)?.label}` : "Select experience"}
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

                {/* ACCEPT TERMS */}
                <div className="accept-terms">
                    <div className="checkbox">
                        <input
                            type="checkbox"
                            id="accept-terms"
                            {...register("accept-terms")}
                        />
                        <label htmlFor="accept-terms" className="size-small">
                            I have read and accepted the{" "}
                            <Link to="#privacy-policy" className="c-dark-red">
                                Privacy Policy
                            </Link>{" "}
                            and{" "}
                            <Link
                                to="#terms-and-conditions"
                                className="c-dark-red"
                            >
                                Terms and Conditions
                            </Link>
                        </label>
                    </div>
                    {errors["accept-terms"] && (
                        <FieldError
                            error={errors["accept-terms"].message as string}
                        />
                    )}
                </div>
            </div>

            <button 
                type="submit" 
                disabled={isSubmitting} 
                className="button"
                aria-busy={isSubmitting}
                aria-label={isSubmitting ? "Submitting form, please wait" : "Submit contact form"}
            >
                {isSubmitting ? "SUBMITTING..." : "JOIN NOW"}
            </button>
        </form>
    );
}

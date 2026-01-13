import { useState, useEffect } from "react";
import type { Country } from "./type";

export function useCountries() {
    const [countries, setCountries] = useState<Country[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        fetch("https://restcountries.com/v3.1/all?fields=name,flags,idd")
            .then((res) => res.json())
            .then((data) => {
                setCountries(data);
                setIsLoading(false);
            })
            .catch(() => {
                setIsLoading(false);
            });
    }, []);

    return { countries, isLoading };
}

export function getCountryCode(country: Country) {
    return `${country.idd.root}${country.idd.suffixes[0]}`;
}

export function useCountryCodes(countries: Country[]) {
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

    return countryCodes;
}

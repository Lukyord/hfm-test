import { z } from "zod";
import { normalizePhone } from "./normalizePhone";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[\d\s\-+()]+$/;

export const experienceOptions = [
    { value: "0-1", label: "0-1 years" },
    { value: "1-3", label: "1-3 years" },
    { value: "3-5", label: "3-5 years" },
    { value: "5+", label: "5+ years" },
] as const;

const experienceValues = ["0-1", "1-3", "3-5", "5+"] as const;

export const contactFormSchema = z
    .object({
        "first-name": z.string().min(1, { message: "First Name is required" }),
        "last-name": z.string().min(1, { message: "Last Name is required" }),
        country: z.string().min(1, { message: "Country is required" }),
        "country-code": z.string().min(1, { message: "Country Code is required" }),
        phone: z
            .string()
            .min(1, { message: "Phone is required" })
            .regex(phoneRegex, { message: "Invalid phone number format" }),
        email: z
            .string()
            .min(1, { message: "Email is required" })
            .regex(emailRegex, { message: "Invalid email address" }),
        experience: z.enum(experienceValues, { message: "Experience is required" }),
        "accept-terms": z.boolean().refine((val) => val === true, {
            message: "You must accept the Privacy Policy and Terms and Conditions",
        }),
    })
    .transform((data) => ({
        ...data,
        phone: normalizePhone(data.phone, data["country-code"]),
    }))
    .refine((data) => data.phone.length >= 7, {
        message: "Phone number must be at least 7 digits",
        path: ["phone"],
    });

export type TContactFormSchema = z.infer<typeof contactFormSchema>;

export type Country = {
    name: { common: string };
    flags: { png: string; svg: string };
    idd: { root: string; suffixes: string[] };
};

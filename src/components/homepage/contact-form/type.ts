import { z } from "zod";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[\d\s\-+()]+$/;

export const experienceOptions = [
    { value: "0-1", label: "0-1 years" },
    { value: "1-3", label: "1-3 years" },
    { value: "3-5", label: "3-5 years" },
    { value: "5+", label: "5+ years" },
] as const;

const experienceValues = ["0-1", "1-3", "3-5", "5+"] as const;

export const contactFormSchema = z.object({
    "first-name": z.string().min(1, { message: "First Name is required" }),
    "last-name": z.string().min(1, { message: "Last Name is required" }),
    country: z.string().min(1, { message: "Country is required" }),
    "country-code": z.string().min(1, { message: "Country Code is required" }),
    phone: z
        .string()
        .min(1, { message: "Phone is required" })
        .regex(phoneRegex, { message: "Invalid phone number format" })
        .min(7, { message: "Phone number must be at least 7 digits" }),
    email: z.string().min(1, { message: "Email is required" }).regex(emailRegex, { message: "Invalid email address" }),
    experience: z.enum(experienceValues, { message: "Experience is required" }),
});

export type TContactFormSchema = z.infer<typeof contactFormSchema>;

export type Country = {
    name: { common: string };
    flags: { png: string; svg: string };
    idd: { root: string; suffixes: string[] };
};

export function normalizePhone(phone: string, countryCode: string): string {
    let normalized = phone.trim();

    if (countryCode) {
        const escapedCode = countryCode.replace(/[+()]/g, "\\$&");
        normalized = normalized.replace(new RegExp(escapedCode, "g"), "");
    }

    normalized = normalized.replace(/[()]/g, "");
    normalized = normalized.replace(/\s+/g, "");

    return normalized.trim();
}

export class MaterialConfigFormService {
    private constructor() { }

    public static fromForm(formElement: HTMLFormElement) {
        const data = new FormData(formElement);
        const config = {
            contrast: data.get("contrast") as string,
            variant: data.get("variant") as string,
            sourceColor: data.get("source-color") as string,
            primaryPalette: data.get("enable-primary-palette-option") === "on" ? (data.get("primary-palette") as string) : null,
            secondaryPalette: data.get("enable-secondary-palette-option") === "on" ? (data.get("secondary-palette") as string) : null,
            tertiaryPalette: data.get("enable-tertiary-palette-option") === "on" ? (data.get("tertiary-palette") as string) : null,
            errorPalette: data.get("enable-error-palette-option") === "on" ? (data.get("error-palette") as string) : null,
            neutralPalette: data.get("enable-neutral-palette-option") === "on" ? (data.get("neutral-palette") as string) : null,
            neutralVariantPalette: data.get("enable-neutral-variant-palette-option") === "on" ? (data.get("neutral-variant-palette") as string) : null,
            cssStyleMode: (data.get("css-style-mode") as "class" | "scheme") ?? "scheme",
            specVersion: (data.get("spec-version") as "2021" | "2025") ?? "2025",
        };
        return config;
    }
}

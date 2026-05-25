import { DynamicScheme, type Hct, type Platform, type TonalPalette, type Variant } from "@material/material-color-utilities";

interface Theme {
    light: { name: string; hct: Hct; palette: TonalPalette }[];
    dark: { name: string; hct: Hct; palette: TonalPalette }[];
    palettes: {
        primaryPalette: TonalPalette;
        secondaryPalette: TonalPalette;
        tertiaryPalette: TonalPalette;
        errorPalette: TonalPalette;
        neutralPalette: TonalPalette;
        neutralVariantPalette: TonalPalette;
    };
}

export class MaterialColorService {
    private constructor() { }

    public static createTheme(args: {
        sourceColor: Hct;
        contrast?: -1 | 0 | 1;
        variant: Variant;
        platform?: Platform;
        specVersion?: "2021" | "2025";
        palettes: Partial<{
            primaryPalette: TonalPalette;
            secondaryPalette: TonalPalette;
            tertiaryPalette: TonalPalette;
            errorPalette: TonalPalette;
            neutralPalette: TonalPalette;
            neutralVariantPalette: TonalPalette;
        }>;
    }): Theme {
        const { contrast = 1, palettes, platform = "phone", sourceColor, specVersion = "2025", variant } = args;
        const lightScheme = this.createTemplateLightScheme(sourceColor, contrast, variant, platform, specVersion, palettes);
        const darkScheme = this.createTemplateDarkScheme(sourceColor, contrast, variant, platform, specVersion, palettes);

        const toResult = (
            scheme: DynamicScheme,
        ): {
            name: string;
            hct: Hct;
            palette: TonalPalette;
        }[] =>
            [
                ...scheme.colors.allColors.map((color) => ({
                    name: color.name,
                    hct: color.getHct(scheme),
                    palette: color.palette(scheme),
                })),
                ({name: scheme.colors.scrim.name, hct: scheme.colors.scrim().getHct(scheme), palette: scheme.colors.scrim().palette(scheme)}),
                ({name: scheme.colors.shadow.name, hct: scheme.colors.shadow().getHct(scheme), palette: scheme.colors.shadow().palette(scheme)}),
                ({name: scheme.colors.surfaceTint.name, hct: scheme.colors.surfaceTint().getHct(scheme), palette: scheme.colors.surfaceTint().palette(scheme)}),
                ({name: scheme.colors.surfaceVariant.name, hct: scheme.colors.surfaceVariant().getHct(scheme), palette: scheme.colors.surfaceVariant().palette(scheme)}),
            ].sort((a, b) => a.name.localeCompare(b.name));

        return {
            light: toResult(lightScheme),
            dark: toResult(darkScheme),
            palettes: {
                primaryPalette: lightScheme.primaryPalette,
                secondaryPalette: lightScheme.secondaryPalette,
                tertiaryPalette: lightScheme.tertiaryPalette,
                errorPalette: lightScheme.errorPalette,
                neutralPalette: lightScheme.neutralPalette,
                neutralVariantPalette: lightScheme.neutralVariantPalette,
            },
        };
    }

    private static createTemplateDarkScheme(
        sourceColor: Hct,
        contrast: -1 | 0 | 1,
        variant: Variant,
        platform: Platform,
        specVersion: "2021" | "2025",
        palettes: Partial<{
            primaryPalette: TonalPalette;
            secondaryPalette: TonalPalette;
            tertiaryPalette: TonalPalette;
            errorPalette: TonalPalette;
            neutralPalette: TonalPalette;
            neutralVariantPalette: TonalPalette;
        }>,
    ) {
        return new DynamicScheme({
            sourceColorHct: sourceColor,
            contrastLevel: contrast,
            variant,
            isDark: true,
            specVersion,
            platform,
            ...(palettes.primaryPalette ? { primaryPalette: palettes.primaryPalette } : {}),
            ...(palettes.secondaryPalette ? { secondaryPalette: palettes.secondaryPalette } : {}),
            ...(palettes.tertiaryPalette ? { tertiaryPalette: palettes.tertiaryPalette } : {}),
            ...(palettes.errorPalette ? { errorPalette: palettes.errorPalette } : {}),
            ...(palettes.neutralPalette ? { neutralPalette: palettes.neutralPalette } : {}),
            ...(palettes.neutralVariantPalette ? { neutralVariantPalette: palettes.neutralVariantPalette } : {}),
        });
    }
    private static createTemplateLightScheme(
        sourceColor: Hct,
        contrast: -1 | 0 | 1,
        variant: Variant,
        platform: Platform,
        specVersion: "2021" | "2025",
        palettes: Partial<{
            primaryPalette: TonalPalette;
            secondaryPalette: TonalPalette;
            tertiaryPalette: TonalPalette;
            errorPalette: TonalPalette;
            neutralPalette: TonalPalette;
            neutralVariantPalette: TonalPalette;
        }>,
    ) {
        return new DynamicScheme({
            sourceColorHct: sourceColor,
            contrastLevel: contrast,
            variant,
            isDark: false,
            specVersion,
            platform,
            ...(palettes.primaryPalette ? { primaryPalette: palettes.primaryPalette } : {}),
            ...(palettes.secondaryPalette ? { secondaryPalette: palettes.secondaryPalette } : {}),
            ...(palettes.tertiaryPalette ? { tertiaryPalette: palettes.tertiaryPalette } : {}),
            ...(palettes.errorPalette ? { errorPalette: palettes.errorPalette } : {}),
            ...(palettes.neutralPalette ? { neutralPalette: palettes.neutralPalette } : {}),
            ...(palettes.neutralVariantPalette ? { neutralVariantPalette: palettes.neutralVariantPalette } : {}),
        });
    }
}

import type { TonalPalette } from "@material/material-color-utilities";

export class MaterialPaletteService {
    private constructor() { }

    public static createPalette(args: { palette: TonalPalette; tones: number[] }) {
        const { palette, tones } = args;
        return tones.map((tone) => ({
            tone,
            color: palette.tone(tone),
        }));
    }

}

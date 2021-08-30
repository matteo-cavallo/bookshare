import {DarkColors, LightColors} from './colors';
import {Spacing} from './spacing';
import {Fonts} from './typography';
import {Icons} from "./icons";

export const LightTheme = {
    colors: LightColors,
    spacing: Spacing,
    fonts: Fonts,
    icons: Icons,
}

export const DarkTheme = {
    ...LightTheme,
    colors: DarkColors
}

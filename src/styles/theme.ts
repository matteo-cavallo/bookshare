import {DarkColors, LightColors} from './colors';
import {Spacing} from './spacing';
import {Fonts} from './typography';

export const LightTheme = {
    colors: LightColors,
    spacing: Spacing,
    fonts: Fonts
}

export const DarkTheme = {
    ...LightTheme,
    colors: DarkColors
}

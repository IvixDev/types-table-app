import { PaletteOptions } from "@mui/material/styles"

export const commonPalette = {
    white: '#ffffff',
    black: '#000000',
}

// Brand Colors
const darkYellow = {
    main: '#a18a00', // Deep Yellow / Mustard - Definitely not orange
    dark: '#857200',
    light: '#c7aa00',
    contrastText: '#ffffff'
}

// Light Mode Colors
const yellowBackground = '#fefce8' // Yellow 50
const darkBlue = {
    main: '#1e3a8a', // Blue 900
    dark: '#172554', // Blue 950
    light: '#3b82f6', // Blue 500
}

// Dark Mode Colors
const primaryBrandDark = {
    main: '#818cf8', // Indigo 400
    dark: '#4f46e5',
    light: '#a5b4fc',
}

export const lightPalette: PaletteOptions = {
    mode: 'light',
    common: commonPalette,
    background: {
        default: yellowBackground,
        paper: commonPalette.white,
    },
    primary: {
        main: darkBlue.main,
        dark: darkBlue.dark,
        light: darkBlue.light,
        contrastText: commonPalette.white
    },
    secondary: {
        main: darkBlue.main,
        dark: darkBlue.dark,
        light: darkBlue.light,
        contrastText: commonPalette.white
    },
    text: {
        primary: darkBlue.dark,
        secondary: '#475569',
        disabled: '#94a3b8',
    },
    divider: '#bfdbfe',
}

export const darkPalette: PaletteOptions = {
    mode: 'dark',
    common: commonPalette,
    background: {
        default: '#0f172a', // Slate 900
        paper: '#1e293b', // Slate 800
    },
    primary: {
        main: primaryBrandDark.main,
        dark: primaryBrandDark.dark,
        light: primaryBrandDark.light,
        contrastText: '#ffffff'
    },
    secondary: {
        main: darkYellow.main,
        dark: darkYellow.dark,
        light: darkYellow.light,
        contrastText: darkYellow.contrastText
    },
    text: {
        primary: '#ffffff',
        secondary: '#cbd5e1',
        disabled: '#64748b',
    },
    divider: '#334155',
}

import React, {createContext, FC, useEffect, useState} from 'react';
import {DarkTheme, LightTheme} from '../styles/theme';
import {ColorSchemeName, StatusBar, useColorScheme} from 'react-native';

interface ThemeParams {
    theme: typeof LightTheme;
}

/**
 *  This is our Theme Context.
 *  It provides the 'theme' attribute, which gives
 *  always the correct Theme based on current Color Scheme.
 */
export const ThemeContext = createContext<ThemeParams>({
    theme: LightTheme,
})

/**
 * The ThemeProvides MUST wrap the entire application. It ensures that
 * all components access the same Theme.
 *
 * @param children
 * @constructor
 */
export const ThemeProvider: FC = ({children}) => {

    const [theme, setTheme] = useState(LightTheme)

    // Dynamic update theme
    const colorScheme = useColorScheme()
    useEffect(() => {
        if (colorScheme === "light") {
            setTheme(LightTheme)
        } else {
            setTheme(DarkTheme)
        }
    }, [colorScheme])

    return (
        <ThemeContext.Provider value={{theme}}>
            {children}
        </ThemeContext.Provider>
    )
}


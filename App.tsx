import React from 'react';
import {ThemeContext, ThemeProvider} from './src/providers/theme.provider';
import {AuthProvider} from './src/providers/auth.provider';
import {DarkTheme, DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {RootNavigator} from './src/navigators/root.navigator';
import {useColorScheme} from 'react-native';
import {Provider as ReduxProvider} from 'react-redux';
import {store} from './src/store/store.config';

export default function App() {

    const colorScheme = useColorScheme()

    return (
        <ThemeProvider>
            <AuthProvider>
                <ReduxProvider store={store}>
                    <NavigationContainer theme={colorScheme === 'light' ? DefaultTheme : DarkTheme}>
                        <RootNavigator/>
                    </NavigationContainer>
                </ReduxProvider>
            </AuthProvider>
        </ThemeProvider>
    );
}

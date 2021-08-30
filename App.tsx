import React, {useEffect} from 'react';
import {ThemeContext, ThemeProvider} from './src/providers/theme.provider';
import {AuthenticationProvider} from './src/providers/authentication.provider';
import {DarkTheme, DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {RootNavigator} from './src/navigators/root.navigator';
import {useColorScheme} from 'react-native';
import {Provider as ReduxProvider, useDispatch} from 'react-redux';
import {store} from './src/store/store.config';

export default function App() {

    const colorScheme = useColorScheme()

    return (
        <ReduxProvider store={store}>
            <AuthenticationProvider>
                <NavigationContainer theme={colorScheme === 'light' ? DefaultTheme : DarkTheme}>
                    <ThemeProvider>
                        <RootNavigator/>
                    </ThemeProvider>
                </NavigationContainer>
            </AuthenticationProvider>
        </ReduxProvider>
    );
}

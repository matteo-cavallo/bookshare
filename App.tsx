import React from 'react';
import {ThemeProvider} from 'providers/theme.provider';
import {AuthenticationProvider} from 'providers/authentication.provider';
import {DarkTheme, DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {RootNavigator} from 'navigators/root.navigator';
import {useColorScheme} from 'react-native';
import {Provider as ReduxProvider} from 'react-redux';
import {store} from 'store/store.config';

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

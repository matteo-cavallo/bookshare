import React, {FC} from 'react';
import {
    createNativeStackNavigator,
} from 'react-native-screens/native-stack';
import {AuthenticationScreen} from 'screens/authentication/authentication.screen';
import {LoginEmailScreen} from 'screens/authentication/loginEmail.screen';
import {SignUpEmailScreen} from 'screens/authentication/signUpEmail.screen';

export type AuthenticationNavigatorScreens = {
    LandingPage: undefined;
    LoginEmail: undefined;
    SignUpEmail: undefined;
}

export enum AuthenticationNavigatorScreenNames {
    landingPage ="LandingPage",
    loginEmail ="LoginEmail",
    signUpEmail ="SignUpEmail",
}

export const AuthenticationNavigator: FC = () => {

    const LoginStack = createNativeStackNavigator<AuthenticationNavigatorScreens>()

    return (
        <LoginStack.Navigator>
            <LoginStack.Screen name={AuthenticationNavigatorScreenNames.landingPage} component={AuthenticationScreen} />
            <LoginStack.Screen name={AuthenticationNavigatorScreenNames.loginEmail} component={LoginEmailScreen} />
            <LoginStack.Screen name={AuthenticationNavigatorScreenNames.signUpEmail} component={SignUpEmailScreen} />
        </LoginStack.Navigator>
    )
}

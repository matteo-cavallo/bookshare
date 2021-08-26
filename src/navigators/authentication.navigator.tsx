import React, {FC} from 'react';
import {
    createNativeStackNavigator,
    NativeStackNavigationProp,
    NativeStackScreenProps
} from 'react-native-screens/native-stack';
import {AuthenticationScreen} from '../screens/authentication/authentication.screen';
import {LoginEmailScreen} from '../screens/authentication/loginEmail.screen';
import {SignUpEmailScreen} from '../screens/authentication/signUpEmail.screen';

export type AuthenticationNavigatorScreens = {
    LandingPage: undefined;
    LoginEmail: undefined;
    SignUpEmail: undefined;
}
export const AuthenticationNavigator: FC = () => {

    const LoginStack = createNativeStackNavigator<AuthenticationNavigatorScreens>()

    return (
        <LoginStack.Navigator>
            <LoginStack.Screen name={"LandingPage"} component={AuthenticationScreen} />
            <LoginStack.Screen name={"LoginEmail"} component={LoginEmailScreen} />
            <LoginStack.Screen name={"SignUpEmail"} component={SignUpEmailScreen} />
        </LoginStack.Navigator>
    )
}

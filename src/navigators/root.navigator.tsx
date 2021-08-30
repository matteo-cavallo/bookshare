import React, {FC, useContext, useEffect, useState} from 'react';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {SplashScreen} from '../screens/splashscreen/splashscreen.screen';
import {TabsNavigator} from './tabs.navigator';
import {AuthenticationNavigator} from './authentication.navigator';
import {PostBookScreen} from '../screens/tabs/postBook/postBook.screen';
import {LightColors} from '../styles/colors';
import {useAppSelector} from '../store/store.config';

type RootStackScreens = {
    SplashScreen: undefined;
    TabsNavigator: undefined;
    LoginModal: undefined;
    NewBookModal: undefined;
}

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackScreens {
        }
    }
}
export const RootNavigator: FC = () => {

    const user = useAppSelector(state => state.auth.user)

    const RootStack = createNativeStackNavigator<RootStackScreens>()

    return (
        <RootStack.Navigator initialRouteName={'SplashScreen'}>
            {
                !user ?
                    <RootStack.Group screenOptions={{headerShown: false, stackAnimation: 'fade'}}>
                        <RootStack.Screen name={'SplashScreen'} component={SplashScreen}/>
                    </RootStack.Group>
                    :
                    <RootStack.Group screenOptions={{headerShown: false}}>
                        <RootStack.Screen name={"TabsNavigator"} component={TabsNavigator} />
                    </RootStack.Group>
            }

            <RootStack.Screen name={"NewBookModal"} component={PostBookScreen} options={{
                stackPresentation: 'fullScreenModal',
                headerTintColor: LightColors.ACCENT,
            }} />

            <RootStack.Group screenOptions={{stackPresentation: "modal", title: "Login", headerShown: false}}>
                <RootStack.Screen name={"LoginModal"} component={AuthenticationNavigator}/>
            </RootStack.Group>

        </RootStack.Navigator>
    )
}

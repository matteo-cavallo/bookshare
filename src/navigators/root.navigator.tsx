import React, {FC, useContext, useEffect, useState} from 'react';
import {createNativeStackNavigator, NativeStackNavigationOptions} from 'react-native-screens/native-stack';
import {SplashScreen} from '../screens/splashscreen/splashscreen.screen';
import {TabsNavigator} from './tabs.navigator';
import {AuthenticationNavigator} from './authentication.navigator';
import {PostBookScreen} from '../screens/tabs/postBook/postBook.screen';
import {LightColors} from '../styles/colors';
import {useAppSelector} from '../store/store.config';
import {PositionScreen} from "../screens/tabs/profile/settings/account/position/position.screen";

export type RootStackScreens = {
    SplashScreen: undefined;
    TabsNavigator: undefined;
    LoginModal: undefined;
    NewBookModal: undefined;
    Position: undefined;
}

export enum rootScreensNames  {
    splashScreen ="SplashScreen",
    TabsNavigator ="TabsNavigator",
    loginModal ="LoginModal",
    newBookModal ="NewBookModal",
    position ="Position",
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
        <RootStack.Navigator initialRouteName={rootScreensNames.splashScreen}>
            {
                !user ?
                    <RootStack.Group screenOptions={{headerShown: false, stackAnimation: 'fade'}}>
                        <RootStack.Screen name={rootScreensNames.splashScreen} component={SplashScreen}/>
                    </RootStack.Group>
                    :
                    <RootStack.Group screenOptions={{headerShown: false}}>
                        <RootStack.Screen name={rootScreensNames.TabsNavigator} component={TabsNavigator} />
                    </RootStack.Group>
            }
            <RootStack.Screen name={rootScreensNames.position} options={positionScreenOptions} component={PositionScreen} />


            <RootStack.Screen name={rootScreensNames.newBookModal} component={PostBookScreen} options={{
                stackPresentation: 'fullScreenModal',
                headerTintColor: LightColors.ACCENT,
            }} />

            <RootStack.Group screenOptions={{stackPresentation: "modal", title: "Login", headerShown: false}}>
                <RootStack.Screen name={rootScreensNames.loginModal} component={AuthenticationNavigator}/>
            </RootStack.Group>



        </RootStack.Navigator>
    )
}

export const positionScreenOptions: NativeStackNavigationOptions = {
    title: "Posizione",
    stackPresentation: 'modal'
}

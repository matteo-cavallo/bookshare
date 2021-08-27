import React, {FC, useContext, useEffect, useState} from 'react';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {SplashScreen} from '../screens/splashscreen/splashscreen.screen';
import {TabsNavigator} from './tabs.navigator';
import {AuthenticationNavigator} from './authentication.navigator';
import {useSplashScreen} from '../hooks/useSplashScreen.hook';
import {HomeScreen} from '../screens/tabs/home/home.screen';
import {PostBookScreen} from '../screens/tabs/postBook/postBook.screen';

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

    const RootStack = createNativeStackNavigator<RootStackScreens>()

    const {loading} = useSplashScreen()

    return (
        <RootStack.Navigator initialRouteName={'SplashScreen'}>
            {
                loading ?
                    <RootStack.Group screenOptions={{headerShown: false, stackAnimation: 'fade'}}>
                        <RootStack.Screen name={'SplashScreen'} component={SplashScreen}/>
                    </RootStack.Group>
                    :
                    <RootStack.Group screenOptions={{headerShown: false}}>
                        <RootStack.Screen name={"TabsNavigator"} component={TabsNavigator}/>
                    </RootStack.Group>
            }

            <RootStack.Screen name={"NewBookModal"} component={PostBookScreen} options={{
                stackPresentation: 'modal'
            }} />

            <RootStack.Group screenOptions={{stackPresentation: "modal", title: "Login", headerShown: false}}>
                <RootStack.Screen name={"LoginModal"} component={AuthenticationNavigator}/>
            </RootStack.Group>
        </RootStack.Navigator>
    )
}

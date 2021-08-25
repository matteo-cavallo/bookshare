import React, {FC, useContext, useEffect} from 'react';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {SplashScreen} from '../screens/splashscreen/splashscreen.screen';
import {TabsNavigator} from './tabs.navigator';
import {AuthContext} from '../providers/auth.provider';
import {LoginScreen} from '../screens/login/login.screen';
import {useSelector} from 'react-redux';
import {UISelector} from '../store/uiStore/uistore.selectors';

type RootStackScreens = {
    SplashScreen: undefined;
    TabsNavigator: undefined;
    LoginModal: undefined;
}

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackScreens {
        }
    }
}
export const RootNavigator: FC = () => {

    const {loading} = useContext(AuthContext)
    const RootStack = createNativeStackNavigator<RootStackScreens>()

    return (
        <RootStack.Navigator>
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

            <RootStack.Group screenOptions={{stackPresentation: "modal", title: "Login", headerShown: true}}>
                <RootStack.Screen name={"LoginModal"} component={LoginScreen}/>
            </RootStack.Group>

        </RootStack.Navigator>
    )
}

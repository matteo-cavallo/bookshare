import React, {FC} from 'react';
import {createNativeStackNavigator, NativeStackNavigationOptions} from 'react-native-screens/native-stack';
import {SplashScreen} from 'screens/splashscreen/splashscreen.screen';
import {TabsNavigator} from './tabs.navigator';
import {AuthenticationNavigator} from './authentication.navigator';
import {PostBookScreen} from 'screens/tabs/postBook/postBook.screen';
import {LightColors} from 'styles/colors';
import {useAppSelector} from 'store/store.config';
import {PositionScreen} from "screens/tabs/profile/settings/account/position/position.screen";
import {rootScreensNames, RootStackScreens} from 'navigators/types';

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackScreens {
        }
    }
}
export const RootNavigator: FC = () => {

    const isSplashScreen = useAppSelector(state => state.auth.isSplashScreen)

    const RootStack = createNativeStackNavigator<RootStackScreens>()

    return (
        <RootStack.Navigator initialRouteName={rootScreensNames.splashScreen}>
            {
                isSplashScreen ?
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

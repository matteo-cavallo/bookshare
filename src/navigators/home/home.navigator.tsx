import {createNativeStackNavigator, NativeStackNavigationOptions} from 'react-native-screens/native-stack';
import React from 'react';
import {HomeScreen} from '../../screens/tabs/home/home.screen';
import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';

export type HomeStackParams = {
    Home: undefined;
    BookPostDetail: {bookId: string};
}

export const HomeNavigator = () => {

    const Stack = createNativeStackNavigator<HomeStackParams>()

    return (
        <Stack.Navigator>
            <Stack.Screen name={"Home"} component={HomeScreen} options={homeScreenOptions}/>
        </Stack.Navigator>
    )
}

const homeScreenOptions: NativeStackNavigationOptions = {
    headerShown: true,
    headerLargeTitle: true,
    title: "Bookshare",
    headerLargeTitleHideShadow: true,
    headerTranslucent: true
}

const detailPostOptions: NativeStackNavigationOptions = {
    headerShown: false,
    stackPresentation: "fullScreenModal"
}


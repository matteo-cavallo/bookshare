import {createNativeStackNavigator, NativeStackNavigationOptions} from 'react-native-screens/native-stack';
import React from 'react';
import {HomeScreen} from '../../screens/tabs/home/home.screen';
import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import {BookDetail} from '../../screens/tabs/home/detail/bookDetail.screen';

export type HomeStackParams = {
    Home: undefined;
    BookDetail: {uid: string};
}

export const HomeNavigator = () => {

    const Stack = createNativeStackNavigator<HomeStackParams>()

    return (
        <Stack.Navigator>
            <Stack.Screen name={"Home"} component={HomeScreen} options={homeScreenOptions}/>
            <Stack.Screen name={"BookDetail"} component={BookDetail} options={detailPostOptions}/>
        </Stack.Navigator>
    )
}

const homeScreenOptions: NativeStackNavigationOptions = {
    headerShown: true,
    title: "Bookshare",
}

const detailPostOptions: NativeStackNavigationOptions = {
    headerShown: false,
    stackPresentation: "fullScreenModal"
}


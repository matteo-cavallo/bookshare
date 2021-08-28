import {createNativeStackNavigator, NativeStackNavigationOptions} from 'react-native-screens/native-stack';
import React from 'react';
import {HomeScreen} from '../../screens/tabs/home/home.screen';
import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import {BookDetailScreen} from '../../screens/tabs/home/bookDetail/bookDetail.screen';

export type HomeStackParams = {
    Home: undefined;
    BookPostDetail: {bookId: string};
}

export const HomeNavigator = () => {

    const Stack = createNativeStackNavigator<HomeStackParams>()

    return (
        <Stack.Navigator>
            <Stack.Screen name={"Home"} component={HomeScreen} options={homeScreenOptions}/>
            <Stack.Screen name={"BookPostDetail"} component={BookDetailScreen} options={detailPostOptions}/>
        </Stack.Navigator>
    )
}

const homeScreenOptions: NativeStackNavigationOptions = {
    headerShown: false
}

const detailPostOptions: NativeStackNavigationOptions = {
    headerShown: true
}


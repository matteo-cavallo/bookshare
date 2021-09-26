import {createNativeStackNavigator, NativeStackNavigationOptions} from 'react-native-screens/native-stack';
import React from 'react';
import {HomeScreen} from 'screens/tabs/home/home.screen';
import {BookDetail} from 'screens/tabs/home/detail/bookDetail.screen';

export type HomeStack = {
    Home: undefined;
    BookDetail: {uid: string};
}

export enum HomeScreensNames {
    home ="Home",
    bookDetail ="BookDetail",
    //root
    profile ="Profile",
}

export const HomeNavigator = () => {

    const Stack = createNativeStackNavigator<HomeStack>()

    return (
        <Stack.Navigator>
            <Stack.Screen name={HomeScreensNames.home} component={HomeScreen} options={homeScreenOptions}/>
            <Stack.Screen name={HomeScreensNames.bookDetail} component={BookDetail} options={detailPostOptions}/>
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


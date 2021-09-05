import {createNativeStackNavigator, NativeStackNavigationOptions} from 'react-native-screens/native-stack';
import React from 'react';
import {ChatsScreen} from "../screens/tabs/chats/chats.screen";

export type ChatsScreens = {
    Chats: undefined;
}

export const ChatsNavigator = () => {

    const ChatsStack = createNativeStackNavigator<ChatsScreens>()

    return (
        <ChatsStack.Navigator>
            <ChatsStack.Screen name={"Chats"} options={chatsScreenOptions}  component={ChatsScreen} />
        </ChatsStack.Navigator>
    )
}


export const chatsScreenOptions: NativeStackNavigationOptions = {
    headerShown:false
}




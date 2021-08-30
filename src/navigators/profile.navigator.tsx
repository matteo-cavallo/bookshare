import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import React from 'react';
import {ProfileScreen} from '../screens/tabs/profile/profile.screen';

type ProfileScreens = {
    ProfileScreen: undefined;
    ProfileInfo: undefined;
}

export const ProfileNavigator = () => {

    const ProfileStack = createNativeStackNavigator<ProfileScreens>()

    return (
        <ProfileStack.Navigator>
            <ProfileStack.Screen name={"ProfileScreen"} options={{headerShown:false}}  component={ProfileScreen} />
        </ProfileStack.Navigator>
    )
}

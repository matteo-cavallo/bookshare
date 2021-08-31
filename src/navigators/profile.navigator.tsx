import {createNativeStackNavigator, NativeStackNavigationOptions} from 'react-native-screens/native-stack';
import React from 'react';
import {ProfileScreen} from '../screens/tabs/profile/profile.screen';
import {SettingsScreen} from "../screens/tabs/profile/settings/settings.screen";
import {AccountScreen} from "../screens/tabs/profile/settings/account/account.screen";

export type ProfileScreens = {
    Profile: undefined;
    Settings: undefined;
    Account: undefined;
}

export const ProfileNavigator = () => {

    const ProfileStack = createNativeStackNavigator<ProfileScreens>()

    return (
        <ProfileStack.Navigator>
            <ProfileStack.Screen name={"Profile"} options={profileScreenOptions}  component={ProfileScreen} />
            <ProfileStack.Screen name={"Settings"} options={settingsScreenOptions} component={SettingsScreen} />
            <ProfileStack.Screen name={"Account"} options={accountScreenOptions} component={AccountScreen} />
        </ProfileStack.Navigator>
    )
}


export const profileScreenOptions: NativeStackNavigationOptions = {
    headerShown:false
}

export const settingsScreenOptions: NativeStackNavigationOptions = {
    headerLargeTitle: true,
    title: "Settings"
}

export const accountScreenOptions: NativeStackNavigationOptions = {
    headerLargeTitle: true,
    title: "Account"
}
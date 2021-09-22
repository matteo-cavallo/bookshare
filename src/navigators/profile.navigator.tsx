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
export enum ProfileScreensNames {
    profile ="Profile",
    settings ="Settings",
    account ="Account",
}

export const ProfileNavigator = () => {

    const ProfileStack = createNativeStackNavigator<ProfileScreens>()

    return (
        <ProfileStack.Navigator>
            <ProfileStack.Screen name={ProfileScreensNames.profile} options={profileScreenOptions}  component={ProfileScreen} />
            <ProfileStack.Screen name={ProfileScreensNames.settings} options={settingsScreenOptions} component={SettingsScreen} />
            <ProfileStack.Screen name={ProfileScreensNames.account} options={accountScreenOptions} component={AccountScreen} />
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


import React, {FC} from 'react';
import {BottomTabNavigationOptions, createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeScreen} from '../screens/tabs/home/home.screen';
import {Ionicons} from '@expo/vector-icons';
import {ProfileScreen} from '../screens/tabs/profile/profile.screen';
import {withAuthentication} from '../highOrderComponents/withAuthentication';

type TabsScreens = {
    Home: undefined,
    Profile: undefined
}

export const TabsNavigator: FC = () => {
    const Tabs = createBottomTabNavigator<TabsScreens>()

    return (
        <Tabs.Navigator screenOptions={tabsNavigatorOptions}>
            {/* Public tabs */}
            <Tabs.Group>
                <Tabs.Screen name={"Home"} component={HomeScreen} options={homeScreenOptions}/>
            </Tabs.Group>

            {/* Private tabs*/}
            <Tabs.Group>
                <Tabs.Screen name={"Profile"} component={withAuthentication(ProfileScreen)} options={profileScreenOptions}/>
            </Tabs.Group>
        </Tabs.Navigator>
    )
}

const tabsNavigatorOptions: BottomTabNavigationOptions = {
    headerShown: true
}

const homeScreenOptions: BottomTabNavigationOptions = {
    tabBarIcon: props => <Ionicons name={"home"} size={props.size} color={props.color}/>
}

const profileScreenOptions: BottomTabNavigationOptions = {
    headerShown: false,
    tabBarIcon: props => <Ionicons name={"person"} size={props.size} color={props.color}/>
}

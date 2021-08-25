import React, {FC} from 'react';
import {BottomTabNavigationOptions, createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeScreen} from '../screens/tabs/home/home.screen';
import {Ionicons} from '@expo/vector-icons';

type TabsScreens = {
    Home: undefined
}

export const TabsNavigator: FC = () => {

    const Tabs = createBottomTabNavigator<TabsScreens>()
    return (
        <Tabs.Navigator screenOptions={tabsNavigatorOptions}>
            <Tabs.Screen name={"Home"} component={HomeScreen} options={homeScreenOptions}/>
        </Tabs.Navigator>
    )
}

const tabsNavigatorOptions: BottomTabNavigationOptions = {
    headerShown: true
}

const homeScreenOptions: BottomTabNavigationOptions = {
    tabBarIcon: props => <Ionicons name={"home"} size={props.size} color={props.color}/>
}

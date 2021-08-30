import React, {FC} from 'react';
import {BottomTabNavigationOptions, createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeScreen} from '../screens/tabs/home/home.screen';
import {Ionicons} from '@expo/vector-icons';
import {ProfileScreen} from '../screens/tabs/profile/profile.screen';
import {withAuthentication} from '../highOrderComponents/withAuthentication';
import {ProfileNavigator} from './profile.navigator';
import {Center} from '../components/center.component';
import {PostBookScreen} from '../screens/tabs/postBook/postBook.screen';
import {Button, Pressable, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {TextInputComponent} from '../components/textInput.component';
import {LightColors} from '../styles/colors';
import {useNavigation} from '@react-navigation/native';
import {HomeNavigator} from './home/home.navigator';

export type TabsScreens = {
    HomeNavigator: undefined,
    ProfileNavigator: undefined;
    PostBook: undefined;
}


export const TabsNavigator: FC = () => {
    const Tabs = createBottomTabNavigator<TabsScreens>()

    return (
        <Tabs.Navigator screenOptions={tabsNavigatorOptions}>
            {/* Public tabs */}
            <Tabs.Group>
                <Tabs.Screen name={"HomeNavigator"} component={HomeNavigator} options={homeScreenOptions} />
            </Tabs.Group>

            {/* Private tabs*/}
            <Tabs.Group>
                <Tabs.Screen name={"PostBook"} component={withAuthentication(PostBookScreen)}
                             options={sellBookOptions}/>
                <Tabs.Screen name={"ProfileNavigator"} component={withAuthentication(ProfileNavigator)}
                             options={profileScreenOptions}/>
            </Tabs.Group>
        </Tabs.Navigator>
    )
}

const tabsNavigatorOptions: BottomTabNavigationOptions = {
    headerShown: true,
    tabBarActiveTintColor: LightColors.ACCENT,
}

const homeScreenOptions: BottomTabNavigationOptions = {
    headerShown: false,
    title: "Home",
    tabBarIcon: props => <Ionicons name={"home"} size={props.size} color={props.color}/>
}

const profileScreenOptions: BottomTabNavigationOptions = {
    headerShown: false,
    tabBarIcon: props => <Ionicons name={"person"} size={props.size} color={props.color}/>
}

const sellBookOptions: BottomTabNavigationOptions = {
    tabBarButton: props => {

        const navigation = useNavigation()

        return (
            <TouchableOpacity {...props} onPress={() => navigation.navigate("NewBookModal")}>
                <View style={{backgroundColor: LightColors.ACCENT, width: 64, height: 64, borderRadius: 25, transform: [{translateY: 0}]}}>
                    <Center>
                        <Ionicons name={"add"}  color={"#FFFFFF"} size={28}/>
                    </Center>
                </View>
            </TouchableOpacity>
        )
    }
    ,
    tabBarIcon: props => <Ionicons name={"add-circle-outline"} size={props.size + 8} color={props.color}/>
}

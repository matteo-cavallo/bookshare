import React, {FC, useContext} from 'react';
import {Center} from '../../../components/center.component';
import {Button, Text} from 'react-native';
import {TextComponent} from '../../../components/text.component';
import {useDispatch} from 'react-redux';
import {UIActions} from '../../../store/uiStore/uistore.actions';
import {useNavigation} from '@react-navigation/native'
import {ThemeContext} from '../../../providers/theme.provider';
import {AuthContext} from '../../../providers/auth.provider';

export const HomeScreen: FC = () => {

    const navigation = useNavigation()

    const {theme} = useContext(ThemeContext)

    const {user, logout} = useContext(AuthContext)

    return (
        <Center style={{padding: 16}}>
            <TextComponent style={theme.fonts.LARGE_TITLE}>{user?.uid || "NO USER"}</TextComponent>
            <TextComponent>Home</TextComponent>
            <Button title={"Open login modal"} onPress={() => navigation.navigate("LoginModal")} />
            <Button title={"Logout"} onPress={() => logout()} />
        </Center>
    )
}

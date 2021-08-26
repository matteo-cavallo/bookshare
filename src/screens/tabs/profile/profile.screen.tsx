import React, {FC, useContext} from 'react';
import {Center} from '../../../components/center.component';
import {Button, Text} from 'react-native';
import {TextComponent} from '../../../components/text.component';
import {useDispatch} from 'react-redux';
import {UIActions} from '../../../store/uiStore/uistore.actions';
import {useNavigation} from '@react-navigation/native'
import {ThemeContext} from '../../../providers/theme.provider';
import {AuthContext} from '../../../providers/auth.provider';

export const ProfileScreen: FC = () => {

    const navigation = useNavigation()

    const {theme} = useContext(ThemeContext)

    const {user, logout} = useContext(AuthContext)

    return (
        <Center style={{padding: 16}}>
            <TextComponent>{user?.uid || "NO USER"}</TextComponent>
            <TextComponent>{user?.email || "NO EMAIL"}</TextComponent>
            <TextComponent>{user?.isAnonymous ? "Anonimo" : "Non anonimo"}</TextComponent>
            <Button title={"Login"} onPress={() => navigation.navigate("LoginModal")} />
            <Button title={"Logout"} onPress={() => logout()} />
        </Center>
    )
}

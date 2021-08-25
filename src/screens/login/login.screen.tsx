import React, {FC, useContext} from 'react';
import {Center} from '../../components/center.component';
import {TextComponent} from '../../components/text.component';
import {Button, TextInput, View} from 'react-native';
import {UIActions} from '../../store/uiStore/uistore.actions';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import { TextInputComponent } from '../../components/textInput.component';
import {ThemeContext} from '../../providers/theme.provider';

export const LoginScreen: FC = () => {

    const navigation = useNavigation()

    const {theme} = useContext(ThemeContext)

    return (
        <Center>
            <View style={{padding: theme.spacing.MD, width: '100%'}}>
                <TextInputComponent placeholder={"email"}/>
                <TextInputComponent placeholder={"password"}/>
            </View>
            <Button title={"Login"} onPress={() => navigation.goBack()} />
        </Center>
    )
}

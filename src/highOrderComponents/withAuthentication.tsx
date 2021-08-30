import React, {ComponentType, FC, useContext, useEffect} from 'react';
import {AuthContext} from '../providers/authentication.provider';
import {useNavigation} from '@react-navigation/native';
import {Image, View} from 'react-native';
import {Center} from '../components/center.component';
import {TextComponent} from '../components/text.component';
import {AuthenticationScreen} from '../screens/authentication/authentication.screen';
import {ButtonComponent} from '../components/button.component';
import {ThemeContext} from '../providers/theme.provider';
import {useDispatch, useSelector} from 'react-redux';
import {useAppSelector} from '../store/store.config';

export const withAuthentication = (WrappedComponent: ComponentType<any>) => {

    const auth = useAppSelector(state => state.auth.user)

    const rootNavigation = useNavigation()
    const {theme} = useContext(ThemeContext)

    function handleSubmit() {
        rootNavigation.navigate("LoginModal")
    }

    const Component = () => {
        return (
            <View style={{padding: theme.spacing.LG, justifyContent: "space-around", flex: 1}}>
                <Image source={require('../../assets/loginImage.png')}
                       style={{width: 300, height: 300, resizeMode: 'contain'}}/>
                <View style={{alignItems: "center"}}>
                    <TextComponent>Accedi per gestire il tuo account personale.</TextComponent>
                    <ButtonComponent style={{width: '100%', marginTop: theme.spacing.LG}} onPress={handleSubmit}>Accedi</ButtonComponent>
                </View>
            </View>
        )
    }

    if (!auth || auth.isAnonymous) {
        return Component
    } else {
        return WrappedComponent
    }

}

import React, {ComponentType, useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Image, View} from 'react-native';
import {TextComponent} from 'components/text.component';
import {ButtonComponent} from 'components/button.component';
import {ThemeContext} from 'providers/theme.provider';
import {useAppSelector} from 'store/store.config';

export const withAuthentication = (WrappedComponent: ComponentType<any>) => {

    const profile = useAppSelector(state => state.auth.profile)
    const token = useAppSelector(state => state.auth.token)

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

    if (profile && token) {
        return WrappedComponent
    }
    return Component

}

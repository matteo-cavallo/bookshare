import React, {FC, useContext, useState} from 'react';
import {
    Alert,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    StyleSheet, Text,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import {NativeStackScreenProps} from 'react-native-screens/native-stack';
import {AuthenticationNavigatorScreens} from 'navigators/authentication.navigator';
import {TextInputComponent} from 'components/textInput.component';
import {ThemeContext} from 'providers/theme.provider';
import {TextComponent} from 'components/text.component';
import {ButtonComponent} from 'components/button.component';
import {useNavigation} from '@react-navigation/native';
import {AuthenticationActions} from 'store/auth/authentication.actions';
import { useAppDispatch, useAppSelector} from 'store/store.config';

type Props = NativeStackScreenProps<AuthenticationNavigatorScreens, "LoginEmail">

export const LoginEmailScreen: FC<Props> = ({navigation}) => {

    const dispatch = useAppDispatch()

    // This hook allows to navigate over the Root Navigation Stack
    const rootNavigation = useNavigation()

    const [email, setEmail] = useState("m.cavallo1011@gmail.com")
    const [password, setPassword] = useState("password")

    const isLoading = useAppSelector(state => state.auth.isLoading)

    const submitLogin = async () => {
        dispatch(AuthenticationActions.loginWithEmail({
            email,
            password
        }))
            .unwrap()
            .then(() => {
                rootNavigation.navigate("TabsNavigator")
            })
            .catch(error => {
                Alert.alert("Errore", error.message)
            })

    }

    const {theme} = useContext(ThemeContext)
    const styles = StyleSheet.create({
        container: {
            paddingHorizontal: theme.spacing.LG,
            paddingVertical: theme.spacing.XL,
            flex: 1,
            justifyContent: "space-between"
        },
        title: {
            marginBottom: theme.spacing.LG
        }
    })

    return (
        <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === 'ios' ? "padding" : "height"}
                              keyboardVerticalOffset={100}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <View >
                        <TextComponent style={[theme.fonts.LARGE_TITLE, styles.title]}>Entra in
                            Bookshare</TextComponent>
                        <TextInputComponent
                            value={email}
                            onChangeText={setEmail}
                            placeholder={"Email"}
                            returnKeyType={"next"}
                            keyboardType={'email-address'}
                            textContentType={"emailAddress"}
                            autoCapitalize={"none"}
                        />
                        <TextInputComponent
                            value={password}
                            onChangeText={setPassword}
                            placeholder={"Password"}
                            secureTextEntry
                            returnKeyType={"done"}
                            textContentType={"password"}
                        />
                    </View>
                    <ButtonComponent onPress={submitLogin} loading={isLoading}>
                        <Text>Accedi</Text>
                    </ButtonComponent>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

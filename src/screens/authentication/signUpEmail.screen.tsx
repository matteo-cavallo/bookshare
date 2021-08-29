import React, {FC, useContext, useState} from 'react';
import {
    ActivityIndicator, Alert,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    StyleSheet, Text, TextInput,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import {NativeStackScreenProps} from 'react-native-screens/native-stack';
import {AuthenticationNavigatorScreens} from '../../navigators/authentication.navigator';
import {TextInputComponent} from '../../components/textInput.component';
import {ThemeContext} from '../../providers/theme.provider';
import {TextComponent} from '../../components/text.component';
import {ButtonComponent} from '../../components/button.component';
import {AuthContext} from '../../providers/authentication.provider';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../../store/store.config';
import {AuthenticationActions} from '../../store/auth/authentication.actions';

type Props = NativeStackScreenProps<AuthenticationNavigatorScreens, "LoginEmail">

export const SignUpEmailScreen: FC<Props> = ({navigation}) => {

    const dispatch = useAppDispatch()

    // This hook allows to navigate over the Root Navigation Stack
    const rootNavigation = useNavigation()

    const [email, setEmail] = useState("m.cavallo1011@gmail.com")
    const [password, setPassword] = useState("password")
    const [passwordConfirm, setPasswordConfirm] = useState("password")

    const loading = useAppSelector(state => state.auth.isLoading)

    function submitSignUp() {
        dispatch(AuthenticationActions.signUpWithEmailAndPassword({
            email,
            password
        }))
            .unwrap()
            .then(result => {
                rootNavigation.navigate("TabsNavigator")
            })
            .catch(error => {
                Alert.alert("Errore nella registrazione", error.message)
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
                    <View>
                        <TextComponent style={[theme.fonts.LARGE_TITLE, styles.title]}>Crea un account</TextComponent>
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
                            returnKeyType={"next"}
                            textContentType={"password"}
                        />
                        <TextInputComponent
                            value={passwordConfirm}
                            onChangeText={setPasswordConfirm}
                            placeholder={"Password"}
                            secureTextEntry
                            returnKeyType={"done"}
                            textContentType={"password"}
                        />
                    </View>
                    <ButtonComponent onPress={submitSignUp}>
                        {
                            loading
                                ? <ActivityIndicator color={"#FFFFFF"}/>
                                : <Text>Crea l'account e accedi</Text>
                        }
                    </ButtonComponent>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

import React, {FC, useContext, useState} from 'react';
import {
    ActivityIndicator,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    StyleSheet, Text,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import {NativeStackScreenProps} from 'react-native-screens/native-stack';
import {AuthenticationNavigatorScreens} from '../../navigators/authentication.navigator';
import {TextInputComponent} from '../../components/textInput.component';
import {ThemeContext} from '../../providers/theme.provider';
import {TextComponent} from '../../components/text.component';
import {ButtonComponent} from '../../components/button.component';
import {AuthContext} from '../../providers/auth.provider';
import {useNavigation} from '@react-navigation/native';

type Props = NativeStackScreenProps<AuthenticationNavigatorScreens, "LoginEmail">

export const LoginEmailScreen: FC<Props> = ({navigation}) => {

    // This hook allows to navigate over the Root Navigation Stack
    const rootNavigation = useNavigation()
    const {loginWithEmail} = useContext(AuthContext)

    const [email, setEmail] = useState("m.cavallo1011@gmail.com")
    const [password, setPassword] = useState("password")

    const [loading, setLoading] = useState(false)

    function submitLogin(){
        setLoading(true)
        loginWithEmail(email, password, completion => {
            if(completion){
                console.log("Logged successfully")
                rootNavigation.navigate("TabsNavigator")
            } else {
                setLoading(false)
            }
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
                    <ButtonComponent onPress={submitLogin}>
                        {
                            loading
                                ? <ActivityIndicator color={"#FFFFFF"}/>
                                : <Text>Accedi</Text>
                        }
                    </ButtonComponent>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

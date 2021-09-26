import React, {FC, useContext, useEffect} from 'react';
import {TextComponent} from 'components/text.component';
import {
    Alert,
    Button,
    StyleSheet,
    useColorScheme,
    View
} from 'react-native';
import {ThemeContext} from 'providers/theme.provider';
import {ButtonComponent} from 'components/button.component';
import {
    NativeStackNavigationOptions,
    NativeStackScreenProps
} from 'react-native-screens/native-stack';
import {AuthenticationNavigatorScreens} from 'navigators/authentication.navigator';

type Props = NativeStackScreenProps<AuthenticationNavigatorScreens,"LandingPage" >
export const AuthenticationScreen: FC<Props> = ({navigation}) => {

    const {theme} = useContext(ThemeContext)
    const colorScheme = useColorScheme()

    useEffect(() => {
        navigation.setOptions({
            headerRight: props => <Button title={"Chiudi"} onPress={() => navigation.goBack()} />
        } as NativeStackNavigationOptions)

    }, [])


    function loginWithFacebook() {
        Alert.alert("Uffa ☹️", "Questa modalità non è ancora disponibile.")
    }

    function loginWithGoogle() {
        Alert.alert("Uffa ☹️", "Questa modalità non è ancora disponibile.")
    }

    function loginWithApple() {
        Alert.alert("Uffa ☹️", "Questa modalità non è ancora disponibile.")
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "center",
            alignItems: 'center',
            padding: theme.spacing.LG
        },
        title: {
            marginBottom: theme.spacing.S
        },
        subtitle: {
            textAlign: "center",
            marginBottom: theme.spacing.LG,
            padding: theme.spacing.LG
        },
        socialButtons: {
            width: '100%'
        },
        bottomButtons: {
            flexDirection: "row",
            width: '100%'
        }
    })

    return (
        <View style={styles.container}>
            <TextComponent style={[theme.fonts.LARGE_TITLE, styles.title]}>📚 Bookshare</TextComponent>
            <TextComponent style={[styles.subtitle]}>Un posto dove puoi vendere e comprare i tuoi libri
                preferiti.</TextComponent>
            <View style={styles.socialButtons}>
                <ButtonComponent style={{backgroundColor: "red"}} onPress={loginWithGoogle}>Login con
                    Google</ButtonComponent>
                <ButtonComponent style={{backgroundColor: "#4267B2"}} onPress={loginWithFacebook}>Login con
                    Facebook</ButtonComponent>
                <ButtonComponent style={{backgroundColor: colorScheme === "light" ? "black" : "white"}}
                                 textStyle={{color: colorScheme === "light" ? "white" : "black"}}
                                 onPress={loginWithApple}
                >Login con Apple</ButtonComponent>
            </View>
            <View style={styles.bottomButtons}>
                <ButtonComponent
                    style={{flexGrow: 1, marginEnd: 8}}
                    onPress={() => navigation.navigate("LoginEmail")}
                >Login</ButtonComponent>
                <ButtonComponent style={{flexGrow: 1, marginEnd: 8}} onPress={() => navigation.navigate("SignUpEmail")}>Registrati con Email</ButtonComponent>
            </View>
        </View>
    )
}

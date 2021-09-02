import React, {FC, useContext} from 'react';
import {ScrollView, Text, View, StyleSheet, Alert} from 'react-native';
import {TextComponent} from "../../../../components/text.component";
import {ThemeContext} from "../../../../providers/theme.provider";
import {ButtonComponent} from "../../../../components/button.component";
import {NavigationLinkComponent} from "../../../../components/navigationLink.component";
import {Ionicons} from "@expo/vector-icons";
import {NativeStackScreenProps} from "react-native-screens/native-stack";
import {ProfileScreens} from "../../../../navigators/profile.navigator";
import {useAppDispatch} from "../../../../store/store.config";
import {AuthenticationActions} from "../../../../store/auth/authentication.actions";

type Props = NativeStackScreenProps<ProfileScreens, "Settings">

export const SettingsScreen:FC<Props> = ({navigation}) => {

    const {theme} = useContext(ThemeContext)
    const dispatch = useAppDispatch()

    const styles = StyleSheet.create({
        container: {
            padding: theme.spacing.LG
        },
        section:{

        },
        sectionHeader:{
            ...theme.fonts.SECTION_HEADER,
            color : theme.colors.SECONDARY,
            marginBottom: theme.spacing.MD
        },
        sectionItem:{
            backgroundColor: theme.colors.FILL_TERTIARY
        },
        sectionTextItem:{
            color: theme.colors.PRIMARY
        },
        logoutButton:{
            color: theme.colors.DANGER
        }
    })


    const handleSignOut = () =>{
        return (
            Alert.alert("Attenzione!","Sei sicuro di voler uscire?",[
                {text:"Annulla"},
                {text:"Esci",style: "destructive",onPress:()=>{
                        dispatch(AuthenticationActions.signOut())
                    }},
            ])
        )
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.section}>
                <TextComponent style={styles.sectionHeader} >Profilo</TextComponent>
                <NavigationLinkComponent startItem={
                    <Ionicons name={"person-circle-outline"} size={theme.icons.XS} color={theme.colors.SECONDARY} />}
                    onPress={()=>{navigation.navigate("Account")}}
                >Dati personali</NavigationLinkComponent>

            </View>

            <View style={styles.section}>
                <TextComponent style={styles.sectionHeader} >Informazioni</TextComponent>
                <NavigationLinkComponent>About us</NavigationLinkComponent>
            </View>

            <View style={styles.section}>
                <TextComponent style={styles.sectionHeader} >Impostazioni</TextComponent>
                <ButtonComponent style={styles.sectionItem}
                                 textStyle={styles.logoutButton}
                                 onPress={handleSignOut}
                >Logout</ButtonComponent>
            </View>
        </ScrollView>
    );
};


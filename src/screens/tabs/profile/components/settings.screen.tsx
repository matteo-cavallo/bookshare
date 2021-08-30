import React, {FC, useContext} from 'react';
import {ScrollView, Text, View,StyleSheet} from 'react-native';
import {TextComponent} from "../../../../components/text.component";
import {ThemeContext} from "../../../../providers/theme.provider";
import {ButtonComponent} from "../../../../components/button.component";
import {NavigationLinkComponent} from "../../../../components/navigationLink.component";
import {Ionicons} from "@expo/vector-icons";
import {NativeStackScreenProps} from "react-native-screens/native-stack";
import {ProfileScreens} from "../../../../navigators/profile.navigator";

type Props = NativeStackScreenProps<ProfileScreens, "SettingsScreen">


export const SettingsScreen:FC<Props> = ({navigation}) => {

    const {theme} = useContext(ThemeContext)



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
                <ButtonComponent style={styles.sectionItem} textStyle={styles.logoutButton} >Logout</ButtonComponent>
            </View>





        </ScrollView>
    );
};


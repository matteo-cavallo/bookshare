import React, {useContext} from 'react';

import {ScrollView, StyleSheet, View} from 'react-native';
import {TextComponent} from "../../../../components/text.component";
import {ThemeContext} from "../../../../providers/theme.provider";
import {TextInputComponent} from "../../../../components/textInput.component";
import {NavigationLinkComponent} from "../../../../components/navigationLink.component";
import {Ionicons} from "@expo/vector-icons";

export const AccountScreen = () => {

    const {theme} = useContext(ThemeContext)

    const styles = StyleSheet.create({
        container:{
            margin: theme.spacing.LG
        },
        section:{
            marginVertical: theme.spacing.MD
        },
        sectionHeader:{
            ...theme.fonts.SECTION_HEADER,
            color : theme.colors.SECONDARY,
            marginBottom: theme.spacing.MD
        },
        sectionItem:{
            textAlign:"right"
        },
        sectionTextItem:{
            color: theme.colors.SECONDARY
        },
        sectionStartItem:{
            marginBottom:0,borderBottomStartRadius:0,borderBottomEndRadius:0
        },
        sectionMiddleItem:{
            marginBottom:0,borderRadius: 0,
        },
        sectionEndItem:{
            marginBottom:0,borderTopStartRadius:0,borderTopEndRadius:0
        }
    })

    return (
        <ScrollView style={styles.container}>
            <View style={styles.section}>
                <TextComponent style={styles.sectionHeader} >Dati Personali</TextComponent>
                <TextInputComponent
                    style={styles.sectionItem}
                    containerStyle={styles.sectionStartItem}
                    startItem={
                    <TextComponent style={styles.sectionTextItem}>Nome</TextComponent>
                }/>
                <TextInputComponent
                    style={styles.sectionItem}
                    containerStyle={styles.sectionMiddleItem}
                    startItem={
                        <TextComponent style={styles.sectionTextItem}>Cognome</TextComponent>
                }/>
                <TextInputComponent
                    style={styles.sectionItem}
                    containerStyle={styles.sectionEndItem}
                    startItem={
                        <TextComponent style={styles.sectionTextItem}>Data di Nascita</TextComponent>
                }/>
            </View>

            <View style={styles.section}>
                <TextComponent style={styles.sectionHeader} >Account</TextComponent>
                <TextInputComponent
                    style={styles.sectionItem}
                    containerStyle={styles.sectionStartItem}
                    startItem={
                        <TextComponent style={styles.sectionTextItem}>Email</TextComponent>
                    }/>
                <TextInputComponent
                    style={styles.sectionItem}
                    containerStyle={styles.sectionEndItem}
                    startItem={
                        <TextComponent style={styles.sectionTextItem}>Nome</TextComponent>
                    }/>
            </View>

            <View style={styles.section}>
                <TextComponent style={styles.sectionHeader} >Posizione</TextComponent>
                <NavigationLinkComponent startItem={
                    <Ionicons name={"navigate-circle-outline"} size={theme.icons.XS}/>
                } >Gestisci posizione</NavigationLinkComponent>
            </View>

            <NavigationLinkComponent
                style={{color:theme.colors.DANGER}}
                endItem={
                <Ionicons name={"trash-outline"} size={theme.icons.XS} color={theme.colors.DANGER}/>
            }
            >Chiudi account</NavigationLinkComponent>
        </ScrollView>
    );
};


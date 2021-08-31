import React, {FC, useContext, useEffect, useState} from 'react';

import {ActivityIndicator, Alert, Button, ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {TextComponent} from "../../../../components/text.component";
import {ThemeContext} from "../../../../providers/theme.provider";
import {TextInputComponent} from "../../../../components/textInput.component";
import {NavigationLinkComponent} from "../../../../components/navigationLink.component";
import {Ionicons} from "@expo/vector-icons";
import {useAppDispatch, useAppSelector} from "../../../../store/store.config";
import {NativeStackScreenProps} from "react-native-screens/native-stack";
import {ProfileScreens} from "../../../../navigators/profile.navigator";
import {UserModel} from "../../../../model/user.model";
import {UserActions} from "../../../../store/user/user.actions";
import {Center} from "../../../../components/center.component";

type Props = NativeStackScreenProps<ProfileScreens, "Account">

export const AccountScreen:FC<Props> = ({navigation}) => {

    const dispatch = useAppDispatch()
    const {theme} = useContext(ThemeContext)

    const profile = useAppSelector(state => state.user.user)
    const isLoading = useAppSelector(state => state.user.isLoading)

    const [canSubmit,setCanSubmit] = useState(false)
    const [draftAccount, setDraftAccount] = useState<UserModel>(null)


    useEffect(()=>{
        if(!draftAccount){
            setDraftAccount(profile)
        }
    },[profile, draftAccount])


    useEffect(()=>{
        if(draftAccount && profile){
            setCanSubmit(JSON.stringify(draftAccount) != JSON.stringify(profile))
        }
    },[draftAccount, profile])


    useEffect(() => {
        if(navigation){
            navigation.setOptions({
                headerRight: ({tintColor}) => <Button disabled={!canSubmit} onPress={handleUpdateUser} color={tintColor}
                                                      title={"Salva"}/>
            })
        }
    },[navigation,canSubmit, profile, draftAccount])


    const submitButton = () =>{
        return(
            <TouchableOpacity disabled={!canSubmit} onPress={handleUpdateUser} >
                <TextComponent>Salva</TextComponent>
            </TouchableOpacity>
        )
    }


    const handleUpdateUser = () =>{
        console.log(draftAccount)

        dispatch(UserActions.updateUser(draftAccount))
            .unwrap()
            .then(() => {
                dispatch(UserActions.fetchUser())
                    .then(() => {
                        setDraftAccount(null)
                        setCanSubmit(false)
                    })
            })
            .catch(e => {
                Alert.alert("Attenzione", e.message)
            })
    }

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

    if(isLoading){
        return (
            <Center>
                <ActivityIndicator />
            </Center>
        )
    }


    return (
        <ScrollView style={styles.container}>
            <View style={styles.section}>
                <TextComponent style={styles.sectionHeader}>Dati Personali</TextComponent>
                <TextInputComponent
                    onChangeText={(value)=>setDraftAccount({...draftAccount,firstName:value})}
                    value={draftAccount?.firstName}
                    style={styles.sectionItem}
                    containerStyle={styles.sectionStartItem}
                    startItem={
                    <TextComponent style={styles.sectionTextItem}>Nome</TextComponent>
                }/>
                <TextInputComponent
                    onChangeText={(value)=>setDraftAccount({...draftAccount,lastName:value})}
                    value={draftAccount?.lastName}
                    style={styles.sectionItem}
                    containerStyle={styles.sectionMiddleItem}
                    startItem={
                        <TextComponent style={styles.sectionTextItem}>Cognome</TextComponent>
                }/>
                <TextInputComponent
                    onChangeText={(value)=>setDraftAccount({...draftAccount,birthday:value})}
                    value={draftAccount?.birthday}
                    style={styles.sectionItem}
                    containerStyle={styles.sectionEndItem}
                    startItem={
                        <TextComponent style={styles.sectionTextItem}>Data di Nascita</TextComponent>
                }/>
            </View>

            <View style={styles.section}>
                <TextComponent style={styles.sectionHeader} >Account</TextComponent>
                <TextInputComponent
                    editable={false}
                    value={profile?.email}
                    style={[styles.sectionItem,{color: theme.colors.SECONDARY}]}
                    startItem={
                        <TextComponent style={styles.sectionTextItem}>Email</TextComponent>
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


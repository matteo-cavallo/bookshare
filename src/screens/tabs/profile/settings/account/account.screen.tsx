import React, {FC, useContext, useEffect, useState} from 'react';

import {
    ActivityIndicator,
    Alert,
    Button,
    DeviceEventEmitter,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import {TextComponent} from "components/text.component";
import {ThemeContext} from "providers/theme.provider";
import {TextInputComponent} from "components/textInput.component";
import {NavigationLinkComponent} from "components/navigationLink.component";
import {Ionicons} from "@expo/vector-icons";
import {useAppDispatch, useAppSelector} from "store/store.config";
import {NativeStackScreenProps} from "react-native-screens/native-stack";
import {
    ProfileScreens,
    ProfileScreensNames
} from 'navigators/profile.navigator';
import {ProfileActions} from "store/profile/profile.actions";
import {Center} from "components/center.component";
import {ON_APPLY_EVENT_EMITTER, OnApplyEventProps} from "./position/position.screen";
import {Profile} from 'model/profile.model';
import {BookSharePosition} from 'model/bookSharePosition.model';
import {rootScreensNames, RootStackScreens} from 'navigators/types';

type Props = NativeStackScreenProps<ProfileScreens & RootStackScreens , ProfileScreensNames.account>

export const AccountScreen:FC<Props> = ({navigation}) => {

    const dispatch = useAppDispatch()
    const {theme} = useContext(ThemeContext)

    const profile = useAppSelector(state => state.user.user)
    const isLoading = useAppSelector(state => state.user.isLoading)

    const [canSubmit,setCanSubmit] = useState(false)
    const [draftAccount, setDraftAccount] = useState<Profile | undefined>(undefined)

    useEffect(()=>{
        if(!draftAccount){
            setDraftAccount(profile)
        }
    },[profile, draftAccount])


    //Listener for the position widget callback
    useEffect(()=>{
        DeviceEventEmitter.addListener(ON_APPLY_EVENT_EMITTER, (params:OnApplyEventProps) =>
            handleOnApplyPositionScreen(params.position,params.goBack));

        return () => {
            DeviceEventEmitter.removeAllListeners(ON_APPLY_EVENT_EMITTER)
        };
    },[])

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

        if(draftAccount){
            dispatch(ProfileActions.updateProfile({profile:draftAccount}))
                .unwrap()
                .then(() => {
                    dispatch(ProfileActions.fetchProfile())
                        .then(() => {
                            setDraftAccount(undefined)
                            setCanSubmit(false)
                        })
                })
                .catch(e => {
                    Alert.alert("Attenzione", e.message)
                })
        }

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

    const handleOnApplyPositionScreen = (position:BookSharePosition,goBack:()=>void) =>{
        //Dispatch to the reducer the position
        if(position){
            dispatch(ProfileActions.updateProfile({profile:{defaultPosition:position}}))
                .unwrap()
                .then(result => {
                    console.log("User default position updated successfully.")
                    dispatch(ProfileActions.fetchProfile()).unwrap()
                        .then(result=>{
                            //go back to account screen from positionScreen
                            setDraftAccount(undefined)
                            goBack()
                        })
                        .catch(e=>{
                            console.log("Can't fetch the new user position", e.message)
                            Alert.alert("Problema con il caricamento della nuova posizione", e.message)
                        })
                })
                .catch(e => {
                    console.log("Default position hasn't been updated.", e.message)
                    Alert.alert("Problema con il salvataggio", e.message)
                })

        }else {
            //alert message , should never be visible
            Alert.alert("Attenzione","Non è stata selezionata nessuna posizione!",[
                {text:"Ok"}
            ])
        }
    }

    if(isLoading){
        return (
            <Center>
                <ActivityIndicator />
            </Center>
        )
    }


    // @ts-ignore
    // @ts-ignore
    return (
        <ScrollView style={styles.container}>
            <View style={styles.section}>
                <TextComponent style={styles.sectionHeader}>Dati Personali</TextComponent>
                <TextInputComponent
                    onChangeText={(value)=>setDraftAccount(draftAccount &&{...draftAccount,firstName:value})}
                    value={draftAccount?.firstName}
                    style={styles.sectionItem}
                    containerStyle={styles.sectionStartItem}
                    startItem={
                    <TextComponent style={styles.sectionTextItem}>Nome</TextComponent>
                }/>
                <TextInputComponent
                    onChangeText={(value)=>setDraftAccount(draftAccount &&{...draftAccount,lastName:value})}
                    value={draftAccount?.lastName}
                    style={styles.sectionItem}
                    containerStyle={styles.sectionMiddleItem}
                    startItem={
                        <TextComponent style={styles.sectionTextItem}>Cognome</TextComponent>
                }/>
                <TextInputComponent
                    onChangeText={(value)=>setDraftAccount(draftAccount &&{...draftAccount,birthday:value})}
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
                    containerStyle={styles.sectionStartItem}
                    startItem={
                        <TextComponent style={styles.sectionTextItem}>Email</TextComponent>
                    }/>
                <TextInputComponent
                    onChangeText={(value)=>{}/*setDraftAccount()*/}
                    value={draftAccount?.phoneNumber?.number}
                    style={[styles.sectionItem,{color: theme.colors.PRIMARY}]}
                    containerStyle={styles.sectionEndItem}
                    startItem={
                        <TextComponent style={styles.sectionTextItem}>Telefono</TextComponent>
                    }/>
            </View>

            <View style={styles.section}>
                <TextComponent style={styles.sectionHeader} >Posizione</TextComponent>
                <NavigationLinkComponent
                    onPress={()=>navigation.navigate(rootScreensNames.position)}
                    startItem={
                    <Ionicons name={"navigate-circle-outline"} size={theme.icons.XS}/>
                } >{profile?.defaultPosition ? `Posizione: ${profile.defaultPosition.address} - ${profile.defaultPosition.radius}km`:"Gestisci posizione" } </NavigationLinkComponent>
            </View>

            <NavigationLinkComponent
                endItem={
                <Ionicons name={"trash-outline"} size={theme.icons.XS} color={theme.colors.DANGER}/>
            }
            >Chiudi account</NavigationLinkComponent>
        </ScrollView>
    );
};


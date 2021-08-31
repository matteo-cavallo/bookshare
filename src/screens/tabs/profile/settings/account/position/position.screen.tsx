import React, {useContext, useState} from 'react';

import {Alert, Slider, StyleSheet, TouchableOpacity, View} from 'react-native';
import {ThemeContext} from "../../../../../../providers/theme.provider";
import {TextInputComponent} from "../../../../../../components/textInput.component";
import {Ionicons} from "@expo/vector-icons";
import MapView from 'react-native-maps';
import {TextComponent} from "../../../../../../components/text.component";
import {ButtonComponent} from "../../../../../../components/button.component";
import * as Location from 'expo-location';
import {LocationAccuracy, LocationObject} from 'expo-location';
import {GoogleMapsAPI} from "../../../../../../services/googleMapsAPI.service";

export const PositionScreen = () => {

    const {theme} = useContext(ThemeContext)

    const [positionName,setPositionName] = useState("Vetralla, VT")
    const [location,setLocation] = useState<LocationObject>(null)
    const [positionRadius,setPositionRadius] = useState(50)

    const styles = StyleSheet.create({
        container:{
            flex:1,
        },
        searchBar:{
            margin: theme.spacing.LG
        },
        map: {
            flex:3,
            alignSelf: "stretch",
        },
        modalContainer:{
            flex:2,
            backgroundColor: theme.colors.FILL_TERTIARY,
            borderTopStartRadius: theme.spacing.LG,
            borderTopEndRadius: theme.spacing.LG,
            padding: theme.spacing.XL
        },
        modalCard:{
            borderRadius: theme.spacing.LG,
            backgroundColor: theme.colors.WHITE,
            padding: theme.spacing.XL,
            marginBottom: theme.spacing.LG
        },
        positionName:{
            ...theme.fonts.BODY,
            marginBottom: theme.spacing.XL
        },
        sliderContainer:{
            flexDirection:"row",
            paddingVertical: theme.spacing.MD
        },
        slider:{
            flex:1,
        },
        sliderText:{
            ...theme.fonts.BODY,
            marginLeft: theme.spacing.S,
            minWidth: 35
        }
    })

    const handleFetchLocation = async ()  =>{
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert("Richiesta Posizione","Concedere i permessi per la posizione per proseguire",[
                {text:"Concedi",onPress:()=>handleFetchLocation()},
                {text:"Annulla",style:"destructive"}
            ])
            return;
        }

        let location = await Location.getCurrentPositionAsync({accuracy:LocationAccuracy.Low});
        setLocation(location);
    }
    return (
        <View style={styles.container}>
            <View
                style={styles.searchBar}
            >
                <TextInputComponent
                    startItem={
                        <Ionicons name={"search-outline"} size={theme.icons.XS} color={theme.colors.SECONDARY}/>
                    }
                    endItem={
                        <TouchableOpacity onPress={handleFetchLocation}>
                            <Ionicons name={"locate-outline"} size={theme.icons.S} color={theme.colors.SECONDARY}/>
                        </TouchableOpacity>
                    }
                />
            </View>
            <MapView style={styles.map} />
            <View style={styles.modalContainer} >
                <View style={styles.modalCard}>
                    <TextComponent style={styles.positionName}>{ location &&`${location.coords.latitude} & ${location.coords.longitude}`}</TextComponent>
                    <TextComponent style={theme.fonts.SECTION_HEADER}>Raggio di Vendita</TextComponent>
                    <View style={styles.sliderContainer}>
                        <Slider style={styles.slider} value={positionRadius} onValueChange={setPositionRadius} maximumValue={250} minimumValue={5} />
                        <TextComponent style={styles.sliderText} >{positionRadius.toFixed()}</TextComponent>
                    </View>
                </View>
                <ButtonComponent onPress={()=>{
                    GoogleMapsAPI.getLocationName(location.coords.latitude,location.coords.longitude)
                }}>Applica</ButtonComponent>
            </View>



        </View>
    );
};


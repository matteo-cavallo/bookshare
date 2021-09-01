import React, {useContext, useEffect, useState} from 'react';

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
import {BookSharePosition} from "../../../../../../model/position";

export const PositionScreen = () => {

    const {theme} = useContext(ThemeContext)

    const [position,setPosition] = useState<BookSharePosition>(null)
    const [positionRadius,setPositionRadius] = useState(50)
    const mapRef = React.createRef<MapView>();
    const [isMapLoaded,setIsMapLoaded] = useState(false)

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

    const handleFetchLocation = async ():void  =>{
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert("Richiesta Posizione","Concedere i permessi per la posizione per proseguire",[
                {text:"Concedi",onPress:()=>handleFetchLocation()},
                {text:"Annulla",style:"destructive"}
            ])
            return;
        }

        //Get user coordinates
        let location = await Location.getCurrentPositionAsync({accuracy:LocationAccuracy.Low})
        //Retrive user position(address name ecc...) from location
        let newPosition = await GoogleMapsAPI.getLocationName(location.coords.latitude,location.coords.longitude) as BookSharePosition
        setPosition(newPosition)
        console.log(newPosition)
        //Animate map
        if(isMapLoaded && mapRef && mapRef.current){
            mapRef.current.animateToRegion({
                latitude: newPosition.lat,
                longitude: newPosition.lng,
            })
        }

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
            <MapView
                showsUserLocation={true}
                style={styles.map}
                ref={mapRef}
                onMapReady={()=>{
                    setIsMapLoaded(true)
                    handleFetchLocation()
                }}
            />
            <View style={styles.modalContainer} >
                <View style={styles.modalCard}>
                    <TextComponent style={styles.positionName}>{ position && position.address}</TextComponent>
                    <TextComponent style={theme.fonts.SECTION_HEADER}>Raggio di Vendita</TextComponent>
                    <View style={styles.sliderContainer}>
                        <Slider style={styles.slider} value={positionRadius} onValueChange={setPositionRadius} maximumValue={250} minimumValue={5} />
                        <TextComponent style={styles.sliderText} >{positionRadius.toFixed()}</TextComponent>
                    </View>
                </View>
                <ButtonComponent onPress={()=>{}}>Applica</ButtonComponent>
            </View>



        </View>
    );
};


import React, {FC, useContext, useEffect, useRef, useState} from 'react';
import {Alert, Slider, StyleSheet, TouchableOpacity, View} from 'react-native';
import {ThemeContext} from "../../../../../../providers/theme.provider";
import {TextInputComponent} from "../../../../../../components/textInput.component";
import {Ionicons} from "@expo/vector-icons";
import MapView, {Circle} from 'react-native-maps';
import {TextComponent} from "../../../../../../components/text.component";
import {ButtonComponent} from "../../../../../../components/button.component";
import * as Location from 'expo-location';
import {LocationAccuracy} from 'expo-location';
import {GoogleMapsAPI} from "../../../../../../services/googleMapsAPI.service";
import {BookSharePosition} from "../../../../../../model/position";
import {useAppDispatch, useAppSelector} from "../../../../../../store/store.config";
import {UserActions} from "../../../../../../store/user/user.actions";
import {NativeStackScreenProps} from "react-native-screens/native-stack";
import {HomeStackParams} from "../../../../../../navigators/home/home.navigator";

type Props = NativeStackScreenProps<HomeStackParams, "Home">

export const PositionScreen:FC<Props> = ({navigation}) => {

    const {theme} = useContext(ThemeContext)

    //MAIN POSITION
    const [position,setPosition] = useState<BookSharePosition>(null)
    //Slider
    const [positionRadius,setPositionRadius] = useState(50)
    //Searchbar
    const [searchBar,setSearchBar] = useState("")
    //Ref for the map, allows to do camera animations
    const mapRef = useRef<MapView>();
    //Searchbar language for the places, should be the keyboard language or the phone language
    const [searchLanguage,setSearchLanguage] = useState("it")

    //REDUX
    const dispatch = useAppDispatch()
    const userDefaultPosition = useAppSelector(state => state.user.user?.defaultPosition)
    const user = useAppSelector(state => state.user.user)

    //App default position: Roma
    const defaultPosition = {latitude:41.9027835, longitude: 12.4963655}

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

    useEffect(()=>{
        //initial position loading
        if (!userDefaultPosition){
            handleFetchLocation()
        }else{
            //if user has already setted the position load data
            setPosition(userDefaultPosition)
            setPositionRadius(userDefaultPosition.radius)
            //Animate camera to the default position
            animateMapToRegion(userDefaultPosition.lat,userDefaultPosition.lng)
        }
    },[])

    const handleDispatch = () =>{
        //Dispatch to the reducer the position
        if(position){
            dispatch(UserActions.updateUser({defaultPosition:position}))
                .unwrap()
                .then(result => {
                    console.log("User default position updated successfully.")
                    dispatch(UserActions.fetchUser()).unwrap()
                        .then(result=>{
                            //go back to settings
                            navigation.goBack() //TODO: on go back the button save on the top corner is clickable and contains the old user data, should be fixed
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

    //Handler for the search bar
    const handleAddressSearch = async (address:string) =>{
        let newPosition = await GoogleMapsAPI.getLocationCoordinates(address,searchLanguage,positionRadius) as BookSharePosition
        setPosition(newPosition)
        animateMapToRegion(newPosition.lat,newPosition.lng)
    }

    //Handler for retriving user location
    const handleFetchLocation = async ():void  =>{
        //ask location permission
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

        await handleUpdateMapPosition(location.coords.latitude,location.coords.longitude)
    }

    //Convert a location to a Position address
    const handleUpdateMapPosition = async (lat:number,lng:number) =>{
        let newPosition = await GoogleMapsAPI.getLocationName(lat,lng,positionRadius) as BookSharePosition
        setPosition(newPosition)
        animateMapToRegion(newPosition.lat,newPosition.lng)
    }

    //Animate the map camera
    const animateMapToRegion = (lat:number,lng:number) =>{
        mapRef.current?.animateToRegion({
            latitude: lat,
            longitude: lng,
        })
    }

    //selector of the right position
    const choosePosition = () =>{
        if(position){
            return {
                latitude: position.lat,
                longitude: position.lng
            }
        }
        return defaultPosition
    }

    //Slider handler for setting the radius
    const handleRadiusChange = (newRadius:number) =>{
        setPositionRadius(newRadius)
        setPosition({...position,radius:newRadius})
    }

    return (
        <View style={styles.container}>
            <View
                style={styles.searchBar}
            >
                <TextInputComponent
                    value={searchBar}
                    onChangeText={setSearchBar}
                    placeholder={"Inserire il nome di una città"}
                    onSubmitEditing={(event)=>{handleAddressSearch(event.nativeEvent.text)}}
                    startItem={
                        <TouchableOpacity onPress={()=>handleAddressSearch(searchBar)}>
                            <Ionicons name={"search-outline"} size={theme.icons.XS} color={theme.colors.SECONDARY}/>
                        </TouchableOpacity>

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
                    if (!userDefaultPosition){
                        handleFetchLocation()
                    }
                }}
                onLongPress={(event) =>{
                    handleUpdateMapPosition(event.nativeEvent.coordinate.latitude,event.nativeEvent.coordinate.longitude)
                }}
                >

                <Circle
                    center={choosePosition()}
                    radius={positionRadius*1000} //The positionRadius is in meters , *1000 = km
                    strokeWidth={2}
                    strokeColor="#3399ff"
                    fillColor="rgba(129,178,251,0.5)"
                />
                <MapView.Marker
                    coordinate={choosePosition()}
                    title={"Selected Position"}
                />
            </MapView>
            <View style={styles.modalContainer} >
                <View style={styles.modalCard}>
                    <TextComponent style={styles.positionName}>{ position && position.address}</TextComponent>
                    <TextComponent style={theme.fonts.SECTION_HEADER}>Raggio di Vendita</TextComponent>
                    <View style={styles.sliderContainer}>
                        <Slider step={5} style={styles.slider} value={positionRadius} onValueChange={handleRadiusChange} maximumValue={250} minimumValue={5} />
                        <TextComponent style={styles.sliderText} >{positionRadius.toFixed()}</TextComponent>
                    </View>
                </View>
                <ButtonComponent onPress={()=>handleDispatch()}>Applica</ButtonComponent>
            </View>



        </View>
    );
};


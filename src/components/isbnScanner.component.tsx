import React, {FC, useContext, useEffect, useState} from 'react';
import {Button, Text, View, StyleSheet, Alert} from 'react-native'
import {BarCodeScanner, PermissionStatus} from "expo-barcode-scanner";
import {Ionicons} from "@expo/vector-icons";
import {ThemeContext} from "../providers/theme.provider";
import {TextComponent} from "./text.component";
import {Center} from "./center.component";

type IsbnScannerProps = {
    setIsbnModal : (value:boolean)=>void
    onIsbnScanned : (isbn:string)=>void
}


const IsbnScanner:FC<IsbnScannerProps> = ({setIsbnModal,onIsbnScanned}) => {
    const [hasPermission, setHasPermission] = useState<boolean>(false);
    const [scanned, setScanned] = useState(false);

    const {theme} = useContext(ThemeContext)

    const askCameraPermission = () =>{
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === PermissionStatus.GRANTED);
        })();
    }

    useEffect(() => {
        askCameraPermission();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        Alert.alert('Isbn Scansionato',`${data}`,[
            {text:"Ok",onPress:()=>{
                    onIsbnScanned(data)
                    setIsbnModal(false)
                }},
            {text:"Annulla", onPress:()=>{
                    setScanned(false)
                }}
        ])
    };

    if (hasPermission === null) {
        return (
            <Center>
                <Text>Requesting for camera permission</Text>
            </Center>
        )
    }

    if (!hasPermission) {
        return (
            <Center>
                <Text>No access to camera</Text>
            </Center>
        )
    }

    return (
        <Center>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
        </Center>

    );
};

//{scanned && <Button title={'Tap to Scan Again'} onPress={() => } />}

export default IsbnScanner;

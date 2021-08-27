import React, {useContext, useEffect, useState} from 'react';
import {Button, Text, View, StyleSheet} from 'react-native'
import {BarCodeScanner, PermissionStatus} from "expo-barcode-scanner";
import {Ionicons} from "@expo/vector-icons";
import {ThemeContext} from "../providers/theme.provider";
import {TextComponent} from "./text.component";

const IsbnScanner = () => {
    const [hasPermission, setHasPermission] = useState<boolean>(false);
    const [scanned, setScanned] = useState(false);
    const [text,setText] = useState("Not scanned");

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
        setText(data)
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
        },
        scanner: {
            alignItems: 'center',
            justifyContent: 'center',
            height: 300,
            width: 300,
            overflow: 'hidden',
            borderRadius: theme.spacing.LG
        }
    });

    if (hasPermission === null) {
        return (
            <View style={styles.container}>
                <Text>Requesting for camera permission</Text>
            </View>
        )
    }

    if (!hasPermission) {
        return (
            <View style={styles.container}>
                <Text>No access to camera</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.scanner}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />
            </View>
            <TextComponent>{text}</TextComponent>
            {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
        </View>
    );
};


export default IsbnScanner;

import React, {FC, useContext, useEffect, useLayoutEffect, useState} from 'react';
import {Button, Modal, ScrollView, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Center} from '../../../components/center.component';
import {TextComponent} from '../../../components/text.component';
import {TextInputComponent} from '../../../components/textInput.component';
import {ThemeContext} from '../../../providers/theme.provider';
import {NativeStackScreenProps} from 'react-native-screens/native-stack';
import {AuthenticationNavigatorScreens} from '../../../navigators/authentication.navigator';
import {TabsScreens} from '../../../navigators/tabs.navigator';
import {Picker} from '@react-native-picker/picker';


type Props = NativeStackScreenProps<TabsScreens, "PostBook">

export const PostBookScreen: FC<Props> = ({navigation}) => {

    const {theme} = useContext(ThemeContext)

    const [selectedPrice, setSelectedPrice] = useState(0.00)
    const [selectedCondition, setSelectedCondition] = useState(0)

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "Post a book",
            headerRight: props => <Button title={"Pubblica"} onPress={() => null} color={props.tintColor}/>
        })
    }, [])

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: theme.spacing.LG
        },
        title: {
        },
        section: {
            marginTop: theme.spacing.MD
        },
        sectionHeader: {
            color: theme.colors.SECONDARY,
            marginBottom: theme.spacing.S
        },
        inputFooter: {
            color: theme.colors.SECONDARY
        }
    })

    return (
        <View style={{flex: 1}}>
            <ScrollView>
                <View style={styles.container}>
                    <TextComponent style={[theme.fonts.LARGE_TITLE, styles.title]}>Posta un libro</TextComponent>
                    <View style={styles.section}>
                        <TextComponent
                            style={[styles.sectionHeader, theme.fonts.SECTION_HEADER]}>IDENTIFICATIVO</TextComponent>
                        <TextInputComponent placeholder={"ISBN"}/>
                        <TextComponent style={[theme.fonts.CAPTION, styles.inputFooter]}>Solitamente di 10 o 13 cifre. E
                            il codice che identifica
                            ogni libro. Scrivilo oppure scansionalo premendo sul QRCode.</TextComponent>
                    </View>

                    <View style={styles.section}>
                        <TextComponent
                            style={[styles.sectionHeader, theme.fonts.SECTION_HEADER]}>DETTAGLI</TextComponent>
                        <TextInputComponent placeholder={"Titolo"}/>
                        <TextInputComponent placeholder={"Autore"}/>
                        <TextInputComponent placeholder={"Descrizione"}/>
                        <TextComponent style={[theme.fonts.CAPTION, styles.inputFooter]}>Descrivi il libro e le sue condizioni. Una descrizione
                            accurata ti da più possibilità di vendere.</TextComponent>
                    </View>

                    <View style={styles.section}>
                        <Picker selectedValue={selectedCondition} onValueChange={((itemValue, itemIndex) => {
                            setSelectedCondition(itemValue)
                            console.log(itemValue)
                        })}>
                            <Picker.Item label={"Nuovo"} value={0}/>
                            <Picker.Item label={"Usato come nuovo"} value={1}/>
                            <Picker.Item label={"Usato"} value={2}/>
                        </Picker>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

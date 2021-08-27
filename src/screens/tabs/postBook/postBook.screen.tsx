import React, {FC, useContext, useEffect, useLayoutEffect, useState} from 'react';
import {
    Button,
    Keyboard,
    KeyboardAvoidingView,
    Modal,
    PickerIOS, Platform,
    ScrollView,
    StyleSheet, TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Center} from '../../../components/center.component';
import {TextComponent} from '../../../components/text.component';
import {TextInputComponent} from '../../../components/textInput.component';
import {ThemeContext} from '../../../providers/theme.provider';
import {NativeStackScreenProps} from 'react-native-screens/native-stack';
import {AuthenticationNavigatorScreens} from '../../../navigators/authentication.navigator';
import {TabsScreens} from '../../../navigators/tabs.navigator';
import {Picker} from '@react-native-picker/picker';
import {ButtonComponent} from '../../../components/button.component';
import {Ionicons} from '@expo/vector-icons';
import IsbnScanner from "../../../components/isbnScanner.component";


type Props = NativeStackScreenProps<TabsScreens, "PostBook">

export const PostBookScreen: FC<Props> = ({navigation}) => {

    const {theme} = useContext(ThemeContext)

    const [isbn, setIsbn] = useState("")
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [description, setDescription] = useState("")

    const [selectedPrice, setSelectedPrice] = useState(0.00)
    const [selectedCondition, setSelectedCondition] = useState(0)


    const [isbnModal, setIsbnModal] = useState(false)

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "Post a book",
            headerRight: props => <Button title={"Pubblica"} disabled onPress={() => null} color={props.tintColor}/>
        })
    }, [])

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: theme.spacing.LG
        },
        title: {},
        section: {
            marginTop: theme.spacing.MD
        },
        sectionHeader: {
            color: theme.colors.SECONDARY,
            marginBottom: theme.spacing.S
        },
        inputFooter: {
            color: theme.colors.SECONDARY
        },
        imageContainer: {
            borderRadius: theme.spacing.LG,
            borderColor: theme.colors.FILL_TERTIARY,
            borderWidth: 1,
            padding: theme.spacing.LG,
            minHeight: 120
        },
        buttonImages: {
            color: theme.colors.ACCENT,
            marginLeft: theme.spacing.S
        },
        imagesDescription: {
            marginTop: theme.spacing.MD,
            color: theme.colors.SECONDARY
        }
    })





    return (
        <View style={{flex: 1}}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView>
                    <View style={styles.container}>
                        <TextComponent style={[theme.fonts.LARGE_TITLE, styles.title]}>Posta un
                            libro</TextComponent>
                        <View style={styles.section}>
                            <TouchableOpacity style={[styles.imageContainer]}
                                              onPress={() => alert("Carica foto")}>
                                    <Center>
                                        <View style={{flexDirection: "row", alignItems: "center"}}>
                                        <Ionicons name={"image"} color={theme.colors.ACCENT} size={24}/>
                                            <TextComponent style={[theme.fonts.HEADLINE, styles.buttonImages]}>Carica le
                                                foto</TextComponent>
                                        </View>
                                        <TextComponent style={[theme.fonts.CAPTION, styles.imagesDescription]}>Aggiungi
                                            fino a 5 foto.
                                            Avrai più possibità di vendere</TextComponent>
                                    </Center>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.section}>
                            <TextComponent
                                style={[styles.sectionHeader, theme.fonts.SECTION_HEADER]}>IDENTIFICATIVO</TextComponent>
                            <TextInputComponent
                                value={isbn}
                                placeholder={"ISBN"}
                                onChangeText={setIsbn}
                                leadingItem={
                                    <Ionicons name={"qr-code-outline"} color={theme.colors.ACCENT} size={25} onPress={()=>setIsbnModal(true)}/>
                                }
                            />
                            <TextComponent
                                style={[theme.fonts.CAPTION, styles.inputFooter]}>Solitamente di 10 o 13 cifre. E
                                il codice che identifica
                                ogni libro. Scrivilo oppure scansionalo premendo sul QRCode.</TextComponent>
                        </View>

                        <View style={styles.section}>
                            <TextComponent
                                style={[styles.sectionHeader, theme.fonts.SECTION_HEADER]}>DETTAGLI</TextComponent>
                            <TextInputComponent placeholder={"Titolo"}
                                                onChangeText={setTitle}
                                                value={title}
                            />
                            <TextInputComponent placeholder={"Autore"}
                                                onChangeText={setAuthor}
                                                value={author}
                            />
                            <TextInputComponent placeholder={"Descrizione"}
                                                onChangeText={setDescription}
                                                value={description}
                            />
                            <TextComponent
                                style={[theme.fonts.CAPTION, styles.inputFooter]}>Descrivi il libro e le sue
                                condizioni. Una descrizione
                                accurata ti da più possibilità di vendere.</TextComponent>
                        </View>

                        <View style={styles.section}>
                            <ButtonComponent>Pubblica</ButtonComponent>
                            <TextComponent style={[styles.inputFooter, theme.fonts.CAPTION]}>Al momento della
                                pubblicazione tutti gli annunci sono sottoposto a un rapido controllo standard per
                                assicurarci che rispettino le nostre Normative sulle vendite prima di diventare visibili
                                agli altri. Beni diversi dai libri non sono consentiti.</TextComponent>
                        </View>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
            <Modal presentationStyle={"pageSheet"} visible={isbnModal} >
                <Button title={"Annulla Scansione"} onPress={()=> setIsbnModal(false)}/>
                <IsbnScanner setIsbnModal={setIsbnModal} onIsbnScanned={setIsbn} />
            </Modal>
        </View>
    )
}

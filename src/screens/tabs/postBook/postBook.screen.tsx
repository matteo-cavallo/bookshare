import React, {FC, useContext, useLayoutEffect, useState} from 'react';
import {
    Button,
    Keyboard,
    Modal, SafeAreaView,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import {Center} from '../../../components/center.component';
import {TextComponent} from '../../../components/text.component';
import {TextInputComponent} from '../../../components/textInput.component';
import {ThemeContext} from '../../../providers/theme.provider';
import {NativeStackScreenProps} from 'react-native-screens/native-stack';
import {TabsScreens} from '../../../navigators/tabs.navigator';
import {ButtonComponent} from '../../../components/button.component';
import {Ionicons} from '@expo/vector-icons';
import IsbnScanner from "../../../components/isbnScanner.component";
import {PickerSelector} from "../../../components/pickerSelector.component";


type Props = NativeStackScreenProps<TabsScreens, "PostBook">

export const PostBookScreen: FC<Props> = ({navigation}) => {

    const {theme} = useContext(ThemeContext)

    const [isbn, setIsbn] = useState("")
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [description, setDescription] = useState("")

    const [conditions, setConditions] = useState("")
    const [selectedPrice, setSelectedPrice] = useState("")

    const [position,setPosition] = useState("")
    const [phone,setPhone] = useState("")

    const [isbnModal, setIsbnModal] = useState(false)

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "Post a book",
            headerLeft: props => <Button title={"Annulla"} onPress={navigation.goBack} color={props.tintColor} />,
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
        <SafeAreaView>
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
                                endItem={
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
                                                startItem={<Ionicons name={"book-outline"} size={theme.spacing.XL} color={theme.colors.SECONDARY} />}
                            />
                            <TextInputComponent placeholder={"Autore"}
                                                onChangeText={setAuthor}
                                                value={author}
                                                startItem={<Ionicons name={"person-circle-outline"} size={theme.spacing.XL} color={theme.colors.SECONDARY} />}
                            />
                            <TextInputComponent placeholder={"Descrizione"}
                                                onChangeText={setDescription}
                                                value={description}
                                                startItem={<Ionicons name={"help-circle-outline"} size={theme.spacing.XL} color={theme.colors.SECONDARY} />}
                            />
                            <TextComponent
                                style={[theme.fonts.CAPTION, styles.inputFooter]}>Descrivi il libro e le sue
                                condizioni. Una descrizione
                                accurata ti da più possibilità di vendere.</TextComponent>
                        </View>

                        <View style={styles.section}>
                            <TextComponent
                                style={[styles.sectionHeader, theme.fonts.SECTION_HEADER]}>ANNUNCIO</TextComponent>
                            {/*TODO: implement price validation*/}
                            <TextInputComponent placeholder={"Prezzo"}
                                                keyboardType={"decimal-pad"}
                                                onChangeText={setSelectedPrice}
                                                value={ selectedPrice}
                                                endItem={<Ionicons name={"logo-euro"} size={theme.spacing.LG} color={theme.colors.SECONDARY}/>}
                                                    />
                            {/*TODO: Abbellire in caso come da figma*/}
                            <PickerSelector
                                onValueChange={(value) => setConditions(value)}
                                placeholder={{label:"Seleziona lo stato di usura",value:"",inputLabel:"Condizione"}}
                                items={[
                                    {label: 'Nuovo', value: 'nuovo'},
                                    {label: 'Usato come nuovo', value: 'usato_come_nuovo'},
                                    {label: 'Usato', value: 'usato'},
                                    {label: 'Molto rovinato', value: 'molto_rovinato'},
                                ]}
                            />
                        </View>

                        <View style={styles.section}>
                            <TextComponent
                                style={[styles.sectionHeader, theme.fonts.SECTION_HEADER]}>Posizione</TextComponent>
                            <TextInputComponent placeholder={"Luogo"}
                                                onChangeText={setPosition}
                                                value={position}
                                                startItem={<Ionicons name={"locate-outline"} size={theme.spacing.XL} color={theme.colors.SECONDARY} />}
                            />
                        </View>

                        {/*TODO: implementare keyboard avoidance*/}
                        <View style={styles.section}>
                            <TextComponent
                                style={[styles.sectionHeader, theme.fonts.SECTION_HEADER]}>Contatti</TextComponent>
                            <TextInputComponent placeholder={"Telefono"}
                                                keyboardType={"phone-pad"}
                                                onChangeText={setPhone}
                                                value={phone}
                                                startItem={<Ionicons name={"call-outline"} size={theme.spacing.XL} color={theme.colors.SECONDARY} />}

                            />
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
        </SafeAreaView>
    )
}

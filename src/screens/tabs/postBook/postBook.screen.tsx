import React, {FC, useContext, useEffect, useLayoutEffect, useState} from 'react';
import {
    Alert,
    Button,
    Keyboard, Modal,
    SafeAreaView,
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
import {BookPost} from '../../../model/bookPost.model';
import 'react-native-get-random-values';
import {v4 as uuid} from 'uuid'
import {useFirebase, useFirestore} from 'react-redux-firebase';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../store/store.config';
import {UserModel} from '../../../model/user.model';

type Props = NativeStackScreenProps<TabsScreens, "PostBook">

export const PostBookScreen: FC<Props> = ({navigation}) => {

    const firestore = useFirestore()
    const dispatch = useDispatch()

    const auth = useSelector((state: RootState) => state.firebase.auth)

    const {theme} = useContext(ThemeContext)

    const [canPublish, setCanPublish] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    // Form Data
    const [isbn, setIsbn] = useState("")
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [description, setDescription] = useState("")

    const [conditions, setConditions] = useState("")
    const [selectedPrice, setSelectedPrice] = useState("")

    const [position, setPosition] = useState("")
    const [phone, setPhone] = useState("")

    const [isbnModal, setIsbnModal] = useState(false)

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "Post a book",
            headerLeft: props => <Button title={"Annulla"} onPress={navigation.goBack} color={props.tintColor}/>,
            //headerRight: props => <Button title={"Pubblica"} disabled={!canPublish} onPress={() => handlePublishBook()} color={props.tintColor}/>
        })
    }, [])


    function checkFormData() {
        setCanPublish(true)
    }

    function handlePublishBook() {
        Alert.alert("Confermi?", "Il tuo libro sarà visibile a tutti pubblicamente.", [
            {onPress: publishBook, text: "OK"},
            {text: "Annulla", style: "destructive"}
        ])
    }

    /**
     *  THis function handles submit of book
     */
    const publishBook = async () => {
        setIsLoading(true)
        // If check is valid

        const bookId = uuid() // Google Book else UUID
        const userId = auth.uid

        // Book creation
        const book: GoogleAPIBookVolume = {
            id: bookId,
            volumeInfo: {
                title: title,
                authors: author.split(",") || []
            }
        }

        try {
            // Saving book
            const bookDocPath = firestore.collection("books").doc(bookId)
            await firestore.set<GoogleAPIBookVolume>(bookDocPath.path, book)

            const postBook: BookPost = {
                bookId: bookId,
                userId: userId,
                condition: conditions,
                price: Number(selectedPrice),
                description: description,
                position: {
                    city: "Rome",
                    latitude: 41.9027835,
                    longitude: 12.4963655
                },
                phone: phone,
                creationDate: new Date(),
                lastEdit: new Date(),
            }

            // Saving Post Book
            const postRef = firestore.collection("bookPosts")
            const post = await firestore.add<BookPost>(postRef.path, postBook)

            console.log("Saved post with id: ", post.id)

            const profileDocRef = firestore.collection("users").doc(userId)
            // User ref
            firestore.get<UserModel>(profileDocRef.path).then(u => {
                const newListedBooks = u.data()?.listedBooks || []
                newListedBooks.push(post.id)

                firestore.update<UserModel>(profileDocRef.path, {
                    listedBooks: newListedBooks
                })
            })

        } catch (e) {
            console.log("Error saving book: ", e)
            Alert.alert("Attenzione", "C'è stato un problema con la richiesta. Provare più tardi.")
        } finally {
            setIsLoading(false)
            navigation.goBack()
        }
    }

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
                                    <Ionicons name={"qr-code-outline"} color={theme.colors.ACCENT} size={25}
                                              onPress={() => setIsbnModal(true)}/>
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
                                                startItem={<Ionicons name={"book-outline"} size={theme.spacing.XL}
                                                                     color={theme.colors.SECONDARY}/>}
                            />
                            <TextInputComponent placeholder={"Autore"}
                                                onChangeText={setAuthor}
                                                value={author}
                                                startItem={<Ionicons name={"person-circle-outline"}
                                                                     size={theme.spacing.XL}
                                                                     color={theme.colors.SECONDARY}/>}
                            />
                            <TextInputComponent placeholder={"Descrizione"}
                                                onChangeText={setDescription}
                                                value={description}
                                                startItem={<Ionicons name={"help-circle-outline"}
                                                                     size={theme.spacing.XL}
                                                                     color={theme.colors.SECONDARY}/>}
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
                                                value={selectedPrice}
                                                endItem={<Ionicons name={"logo-euro"} size={theme.spacing.LG}
                                                                   color={theme.colors.SECONDARY}/>}
                            />
                            {/*TODO: Abbellire in caso come da figma*/}
                            <PickerSelector
                                onValueChange={(value) => setConditions(value)}
                                placeholder={{
                                    label: "Seleziona lo stato di usura",
                                    value: "",
                                    inputLabel: "Condizione"
                                }}
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
                            <TextInputComponent placeholder={"Posizione"}
                                                onChangeText={setPosition}
                                                value={position}
                                                startItem={<Ionicons name={"locate-outline"} size={theme.spacing.XL}
                                                                     color={theme.colors.SECONDARY}/>}
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
                                                startItem={<Ionicons name={"call-outline"} size={theme.spacing.XL}
                                                                     color={theme.colors.SECONDARY}/>}

                            />
                        </View>

                        <View style={styles.section}>
                            <ButtonComponent onPress={handlePublishBook} loading={isLoading}>Pubblica</ButtonComponent>
                            <TextComponent style={[styles.inputFooter, theme.fonts.CAPTION]}>Al momento della
                                pubblicazione tutti gli annunci sono sottoposto a un rapido controllo standard per
                                assicurarci che rispettino le nostre Normative sulle vendite prima di diventare visibili
                                agli altri. Beni diversi dai libri non sono consentiti.</TextComponent>
                        </View>

                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>

            <Modal presentationStyle={"pageSheet"}  visible={isbnModal} animationType={"slide"} >
                <View style={{flex: 1}}>
                    <IsbnScanner setIsbnModal={setIsbnModal} onIsbnScanned={setIsbn}/>
                    <SafeAreaView>
                        <Button title={"Annulla Scansione"} onPress={() => setIsbnModal(false)}/>
                    </SafeAreaView>
                </View>
            </Modal>
        </SafeAreaView>
    )
}

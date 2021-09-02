import React, {FC, useContext, useEffect, useLayoutEffect, useState} from 'react';
import {
    ActivityIndicator,
    Alert,
    Button, DeviceEventEmitter,
    Keyboard,
    Modal,
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
import 'react-native-get-random-values';
import {useAppDispatch, useAppSelector} from '../../../store/store.config';
import {PostNewBookActions} from '../../../store/postBook/postBook.actions';
import {BookConditions, NewBookModel} from '../../../model/newBook.model';
import {ToggleComponent} from '../../../components/toggle.component';
import {HomeActions} from '../../../store/home/home.actions';
import {NavigationLinkComponent} from "../../../components/navigationLink.component";
import {ON_APPLY_EVENT_EMITTER, OnApplyEventProps} from "../profile/settings/account/position/position.screen";
import {BookSharePosition} from "../../../model/position";
import {useNavigation} from "@react-navigation/native";
import {UserActions} from "../../../store/user/user.actions";

type Props = NativeStackScreenProps<TabsScreens, "PostBook">

export const PostBookScreen: FC<Props> = ({navigation}) => {

    const dispatch = useAppDispatch()
    const {theme} = useContext(ThemeContext)

    const rootNavigation = useNavigation()

    // Selectors
    const googleBookData = useAppSelector(state => state.newBook.googleBook)
    const isLoading = useAppSelector(state => state.newBook.isLoading)
    const userPosition = useAppSelector(state => state.user.user?.defaultPosition)

    // UI
    const [canPublish, setCanPublish] = useState(true)
    const [isbnModal, setIsbnModal] = useState(false)
    const [isbnNotAvailable, setIsbnNotAvailable] = useState(false)

    // Form Data
    const [isbn, setIsbn] = useState("")
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [description, setDescription] = useState("")
    const [conditions, setConditions] = useState<BookConditions>()
    const [price, setPrice] = useState("0")
    const [position, setPosition] = useState<BookSharePosition>()
    const [phone, setPhone] = useState("")


    /**
     * Navigation Options
     */
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "Post a book",
            headerLeft: props => <Button title={"Annulla"} onPress={navigation.goBack} color={props.tintColor}/>,
            //headerRight: props => <Button title={"Pubblica"} disabled={!canPublish} onPress={() => handlePublishBook()} color={props.tintColor}/>
        })
    }, [])

    useEffect(()=>{
        dispatch(UserActions.fetchUser())
    },[])

    useEffect(()=>{
        if(userPosition){
            setPosition(userPosition)
        }
    },[userPosition])

    async function checkData(): Promise<void> {
        try {
            if(isbn.length == 0 && !isbnNotAvailable){
                throw Error("Il codice ISBN è necessario")
            }
            if (title.length == 0) {
                throw Error("Il titolo non può essere vuoto")
            }
            if (price.length == 0 || Number(price) < 0) {
                throw Error("Immettere un prezzo")
            }
            return Promise.resolve()
        } catch (e) {
            return Promise.reject(e)
        }
    }

    async function handlePublishBook() {
        checkData()
            .then(() => {
                Alert.alert("Confermi?", "Il tuo libro sarà visibile a tutti pubblicamente.", [
                    {text: "OK", onPress: publishBook},
                    {text: "Annulla", style: "destructive"}
                ])
            })
            .catch(e => {
                Alert.alert("Attenzione", e.message)
            })
    }

    // Images links
    const imageLinks = googleBookData?.volumeInfo.imageLinks

    function publishBook() {
        const newBook: NewBookModel = {
            googleBookId: googleBookData?.id || null,
            isbn: isbn || null,
            title,
            description,
            price: Number(price) || 0,
            position: position,
            authors: author.split(",") || [],
            condition: conditions || BookConditions.NEW,
            phoneNumber: {
                countryCode: '39',
                number: phone
            },
            mainImage: imageLinks?.smallThumbnail || imageLinks?.thumbnail || imageLinks?.small || imageLinks?.medium || imageLinks?.large || imageLinks?.extraLarge || null
        }

        // Dispatching action to upload the new book
        dispatch(PostNewBookActions.postNewBook(newBook))
            .unwrap()
            .then(result => {
                console.log("Book posted successfully.")
                dispatch(HomeActions.fetchFeed())
                navigation.navigate("HomeNavigator")
            })
            .catch(e => {
                console.log("Book hasn't been posted.", e.message)
                Alert.alert("Problema con il caricamento", e.message)
            })
    }

    function handleDeleteGoogleBook() {
        setTitle("")
        setAuthor("")
        setIsbn("")
        dispatch(PostNewBookActions.deleteGoogleBook())
    }


    useEffect(() => {
        if (isbnNotAvailable) {
            handleDeleteGoogleBook()
        }
    }, [isbnNotAvailable])

    /**
     * Handling Google book autocompletion
     */
    useEffect(() => {
        if (isbn.length >= 10 && isbn.length <= 15) {
            dispatch(PostNewBookActions.fetchBookByIsbn(isbn))
        }
    }, [isbn])

    /**
     * Auto completion of Google Books info
     */
    useEffect(() => {
        if (googleBookData) {
            setTitle(googleBookData.volumeInfo.title || "Nessun titolo disponibile")
            setAuthor(googleBookData.volumeInfo.authors?.join(", ") || "Nessun autore disponibile")
            //setDescription(googleBookData.volumeInfo.description || "Nessuna descrizione disponibile")
        }
    }, [googleBookData])

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
            marginBottom: theme.spacing.MD
        },
        inputFooter: {
            color: theme.colors.SECONDARY,
            marginBottom: theme.spacing.MD
        },
        imageContainer: {
            borderRadius: theme.spacing.LG,
            borderColor: theme.colors.FILL_TERTIARY,
            borderWidth: 1,
            padding: theme.spacing.LG,
            minHeight: 120,
            marginBottom: theme.spacing.MD
        },
        buttonImages: {
            color: theme.colors.ACCENT,
            marginLeft: theme.spacing.S
        },
        imagesDescription: {
            marginTop: theme.spacing.MD,
            color: theme.colors.SECONDARY
        },
        toggle: {}
    })

    //Listener for the position widget callback
    useEffect(()=>{
        DeviceEventEmitter.addListener(ON_APPLY_EVENT_EMITTER, (params:OnApplyEventProps) =>
            handleOnPositionApply(params.position,params.goBack));

        return () => {
            DeviceEventEmitter.removeAllListeners(ON_APPLY_EVENT_EMITTER)
        };
    },[])

    const handleOnPositionApply = (newPosition:BookSharePosition,goBack:()=>void) =>{
        console.log("NEW POS : ",newPosition)
        setPosition(newPosition)
        goBack()
    }

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

                        {
                            /**
                             * ISBN SECTION
                             */
                        }
                        <View style={styles.section}>
                            <TextComponent
                                style={[styles.sectionHeader, theme.fonts.SECTION_HEADER]}>IDENTIFICATIVO</TextComponent>
                            {
                                googleBookData && <View style={{
                                    paddingVertical: theme.spacing.LG,
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                }}>
                                    <View style={{flex: 1, flexShrink: 1}}>
                                        <TextComponent style={theme.fonts.SECTION_HEADER}>Libro
                                            scansionato</TextComponent>
                                        <TextComponent>{title}</TextComponent>
                                        <TextComponent style={{color: theme.colors.SECONDARY}}>{author}</TextComponent>
                                    </View>
                                    <TouchableOpacity onPress={handleDeleteGoogleBook}>
                                        <Ionicons name={"trash-outline"} size={24} style={{padding: theme.spacing.LG}}/>
                                    </TouchableOpacity>
                                </View>
                            }
                            {
                                !isbnNotAvailable &&
                                <View>
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
                                        style={[theme.fonts.CAPTION, styles.inputFooter]}>Solitamente di 10 o 13 cifre.
                                        E
                                        il codice che identifica
                                        ogni libro. Scrivilo oppure scansionalo premendo sul QRCode.</TextComponent>
                                </View>
                            }

                            <ToggleComponent text={"Codice ISBN non disponibile"} onValueChange={setIsbnNotAvailable}
                                             value={isbnNotAvailable} style={styles.toggle}/>
                        </View>

                        {
                            /**
                             * DETTAGLI
                             */
                        }
                        {
                            isbnNotAvailable &&
                            <View style={styles.section}>
                                <TextComponent
                                    style={[styles.sectionHeader, theme.fonts.SECTION_HEADER]}>DETTAGLI</TextComponent>
                                <TextInputComponent placeholder={"Titolo"}
                                                    onChangeText={setTitle}
                                                    value={title}
                                                    startItem={<Ionicons name={"book-outline"}
                                                                         size={theme.spacing.XL}
                                                                         color={theme.colors.SECONDARY}/>}
                                />
                                <TextInputComponent placeholder={"Autore"}
                                                    onChangeText={setAuthor}
                                                    value={author}
                                                    startItem={<Ionicons name={"person-circle-outline"}
                                                                         size={theme.spacing.XL}
                                                                         color={theme.colors.SECONDARY}/>}
                                />
                                <TextComponent
                                    style={[theme.fonts.CAPTION, styles.inputFooter]}>Descrivi il libro e le sue
                                    condizioni. Una descrizione
                                    accurata ti da più possibilità di vendere.</TextComponent>
                            </View>
                        }


                        <View style={styles.section}>
                            <TextComponent
                                style={[styles.sectionHeader, theme.fonts.SECTION_HEADER]}>ANNUNCIO</TextComponent>
                            {/*TODO: implement price validation*/}
                            <TextInputComponent placeholder={"Prezzo"}
                                                keyboardType={"decimal-pad"}
                                                onChangeText={setPrice}
                                                value={price}
                                                endItem={<Ionicons name={"logo-euro"} size={theme.spacing.LG}
                                                                   color={theme.colors.SECONDARY}/>}
                                                startItem={<TextComponent
                                                    style={{color: theme.colors.SECONDARY}}>Prezzo: </TextComponent>}
                            />
                            <PickerSelector
                                onValueChange={(value) => setConditions(value)}
                                placeholder={{
                                    label: "Seleziona lo stato di usura",
                                    value: undefined,
                                    inputLabel: "Condizione"
                                }}
                                items={[
                                    {label: 'Nuovo', value: BookConditions.NEW},
                                    {label: 'Usato come nuovo', value: BookConditions.AS_NEW},
                                    {label: 'Usato', value: BookConditions.USED},
                                    {label: 'Molto rovinato', value: BookConditions.RUINED},
                                ]}
                            />
                            <TextInputComponent
                                placeholder={"Scrivi qui una descrizione del libro di almeno 15 caratteri."}
                                onChangeText={setDescription}
                                value={description}
                                startItem={<Ionicons name={"clipboard-outline"}
                                                     size={theme.spacing.XL}
                                                     color={theme.colors.SECONDARY}/>}
                                multiline={true}
                                style={{
                                    minHeight: 100,
                                    marginVertical: theme.spacing.MD
                                }}
                            />
                        </View>

                        <View style={styles.section}>
                            <TextComponent
                                style={[styles.sectionHeader, theme.fonts.SECTION_HEADER]}>Posizione</TextComponent>
                            <NavigationLinkComponent
                                onPress={()=>rootNavigation.navigate("Position")}
                                startItem={
                                    <Ionicons name={"navigate-circle-outline"} size={theme.icons.XS}/>
                                } >{position ? `Posizione: ${position.address}`:"Seleziona una posizione" } </NavigationLinkComponent>
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
                            <ButtonComponent onPress={handlePublishBook} loading={isLoading}
                                             disabled={!canPublish}>Pubblica</ButtonComponent>
                            <TextComponent style={[styles.inputFooter, theme.fonts.CAPTION]}>Al momento della
                                pubblicazione tutti gli annunci sono sottoposto a un rapido controllo standard per
                                assicurarci che rispettino le nostre Normative sulle vendite prima di diventare
                                visibili
                                agli altri. Beni diversi dai libri non sono consentiti.</TextComponent>
                        </View>

                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>

            <Modal presentationStyle={"pageSheet"} visible={isbnModal} animationType={"slide"}>
                <View style={{flex: 1}}>
                    <IsbnScanner setIsbnModal={setIsbnModal} onIsbnScanned={setIsbn}/>
                    <SafeAreaView>
                        <Button title={"Annulla Scansione"} onPress={() => setIsbnModal(false)}/>
                    </SafeAreaView>
                </View>
            </Modal>

            {
                isLoading &&
                <Center style={{position: "absolute", flex: 1, bottom: 0, top: 0, right: 0, left: 0}}>
                    <View style={{
                        width: 80,
                        height: 80,
                        backgroundColor: theme.colors.FILL_LOADING,
                        position: "relative",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: theme.spacing.LG
                    }}>
                        <ActivityIndicator size={"large"} color={theme.colors.PRIMARY}/>
                    </View>
                </Center>
            }

        </SafeAreaView>
    )
}

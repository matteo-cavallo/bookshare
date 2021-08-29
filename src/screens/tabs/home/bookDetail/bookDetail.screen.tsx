import React, {FC, useContext, useEffect, useState} from 'react';
import {ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from 'react-native-screens/native-stack';
import {AuthenticationNavigatorScreens} from '../../../../navigators/authentication.navigator';
import {HomeStackParams} from '../../../../navigators/home/home.navigator';
import {TextComponent} from '../../../../components/text.component';
import {BookPost} from '../../../../model/bookPost.model';
import {FBFirestore} from '../../../../firebase/firebase.config';
import {FirestoreCollection} from '../../../../firebase/collections';
import {SplashScreen} from '../../../splashscreen/splashscreen.screen';
import {Center} from '../../../../components/center.component';
import {ThemeContext} from '../../../../providers/theme.provider';
import {Ionicons} from '@expo/vector-icons';
import {TextInputComponent} from '../../../../components/textInput.component';


type Props = NativeStackScreenProps<HomeStackParams, "BookPostDetail">

export const BookDetailScreen: FC<Props> = ({route, navigation}) => {

    const {theme} = useContext(ThemeContext)

    const {bookId} = route.params

    const [book, setBook] = useState<BookPost>()
    const [bookInfo, setBookInfo] = useState<GoogleAPIBookVolume>()


    // UI
    const [offset, setOffset ] = useState(0)

    function formattedAuthors(): string {
        if (!bookInfo?.volumeInfo.authors || bookInfo.volumeInfo.authors.length == 0 || bookInfo.volumeInfo.authors[0] == "") {
            return "Autore sconosciuto"
        }
        return bookInfo.volumeInfo.authors.join(", ")
    }

    useEffect(() => {
        FBFirestore
            .collection(FirestoreCollection.bookPost)
            .doc(bookId)
            .get()
            .then(doc => {
                if (doc.exists) {
                    setBook(doc.data() as BookPost)
                }
            })
    }, [bookId])

    useEffect(() => {
        if (book) {
            FBFirestore
                .collection(FirestoreCollection.books)
                .doc(book?.bookId)
                .get()
                .then(snap => {
                    setBookInfo(snap.data() as GoogleAPIBookVolume)
                })
        }
    }, [book])

    useEffect(() => {
        console.log(offset)
    },[offset])


    function getImageOffset() {
        return offset > 0 ? 0 : offset
    }

    const imageHeight = 250
    function getImageHeight(){
        return offset > 0 ? imageHeight : imageHeight - offset
    }

    const styles = StyleSheet.create({
        image: {
            height: imageHeight,
            backgroundColor: theme.colors.FILL_TERTIARY,
            padding: theme.spacing.S,
            flexDirection: "row",
            justifyContent: "flex-end",
            borderBottomRightRadius: theme.spacing.XL,
            borderBottomLeftRadius: theme.spacing.XL,
        },
        scrollView: {
        },
        container: {
            padding: theme.spacing.LG,
        },
        closeButton: {
            padding: theme.spacing.MD
        },
        header: {
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: theme.spacing.S
        },
        author: {
            color: theme.colors.SECONDARY
        },
        sectionHeader: {
            marginTop: theme.spacing.LG,
            color: theme.colors.SECONDARY,
            marginBottom: theme.spacing.MD
        }
    })

    if (!book || !bookInfo) {
        return (
            <Center>
                <ActivityIndicator/>
            </Center>
        )
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.image}>
                <Ionicons name={"close-circle-outline"} style={styles.closeButton} size={34}
                          onPress={() => navigation.goBack()}/>
            </View>
            <ScrollView style={styles.scrollView}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <TextComponent
                            style={theme.fonts.HEADLINE}>{bookInfo.volumeInfo.title || "Nessun titolo"}</TextComponent>
                        <TextComponent style={theme.fonts.HEADLINE}>€{book.price}</TextComponent>
                    </View>
                    <TextComponent style={[styles.author]}>{formattedAuthors()}</TextComponent>
                    <TextComponent
                        style={[theme.fonts.SECTION_HEADER, styles.sectionHeader]}>Descrizione</TextComponent>
                    <TextComponent>{book.description}</TextComponent>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

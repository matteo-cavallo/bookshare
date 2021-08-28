import React, {FC, useContext, useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {BookPost} from '../../../../model/bookPost.model';
import {TextComponent} from '../../../../components/text.component';
import {FirestoreReducer} from 'redux-firestore';
import {ThemeContext} from '../../../../providers/theme.provider';
import {FBFirestore} from '../../../../firebase/firebase.config';
import {useNavigation} from '@react-navigation/native';
import {HomeStackParams} from '../../../../navigators/home/home.navigator';
import {NativeStackScreenProps} from 'react-native-screens/native-stack';


type Props = {
    book: BookPost,
}

export const BookItem: FC<Props> = ({book}) => {

    const {theme} = useContext(ThemeContext)

    const navigation = useNavigation()

    const [bookInfo, setBookInfo] = useState<GoogleAPIBookVolume>()


    useEffect(() => {

        FBFirestore
            .collection("books")
            .doc(book.bookId)
            .get()
            .then(snap => {
                setBookInfo(snap.data() as GoogleAPIBookVolume)
            })
    }, [book])

    const styles = StyleSheet.create({
        container: {
            margin: theme.spacing.S
        },
        image: {
            backgroundColor: theme.colors.FILL_TERTIARY,
            height: 150,
            borderRadius: theme.spacing.MD,
            marginBottom: theme.spacing.S
        },
        price: {
            fontWeight: "bold"
        },
        body: {
            flexDirection: "row",
            justifyContent: "space-between",
            flexWrap: "wrap-reverse"
        }
    })

    return (
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate("BookPostDetail", {bookId: book.uid || ""})}>
            <View style={styles.image}>
            </View>
            <View style={styles.body}>
                <TextComponent>{bookInfo?.volumeInfo.title || "Nessun titolo"}</TextComponent>
                <TextComponent style={styles.price}>{`${book.price}€` || ""}</TextComponent>
            </View>
        </TouchableOpacity>
    )
}

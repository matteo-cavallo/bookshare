import React, {FC, useContext, useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {BookPost} from '../../../../model/bookPost.model';
import {TextComponent} from '../../../../components/text.component';
import {ThemeContext} from '../../../../providers/theme.provider';
import {FBFirestore} from '../../../../firebase/firebase.config';
import {useNavigation} from '@react-navigation/native';
import {HomeStackParams} from '../../../../navigators/home/home.navigator';
import {NativeStackScreenProps} from 'react-native-screens/native-stack';
import {Ionicons} from '@expo/vector-icons';
import {Center} from '../../../../components/center.component';


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
            height: 150,
            borderRadius: theme.spacing.MD,
            marginBottom: theme.spacing.S,
            justifyContent: "center",
            alignItems: "center"
        },
        price: {
            fontWeight: "bold",
            fontSize: theme.fonts.CAPTION.fontSize
        },
        body: {
            // flexDirection: "row",
            // justifyContent: "space-between",
            // flexWrap: "wrap-reverse"
        },
        skeleton:{
            height: 40,
            backgroundColor: theme.colors.FILL_TERTIARY,
            borderRadius: theme.spacing.MD
        },
        book:{
            backgroundColor: "#AAA",
            width: '70%',
            borderRadius: theme.spacing.XS,
            shadowColor: theme.colors.SECONDARY,
            shadowOpacity: 0.3,
            shadowRadius: 8
        }
    })

    const position = (city: string | undefined) => {

        if(!city){
            return null
        }

        return (
            <View style={{flexDirection: "row", alignItems: "center", marginBottom: theme.spacing.XS}}>
                <Ionicons name={"pin"} color={theme.colors.SECONDARY}/>
                <TextComponent style={[theme.fonts.CAPTION,{marginLeft: theme.spacing.XS, color: theme.colors.SECONDARY},]}>{city}</TextComponent>
            </View>
        )
    }

    const itemBody = () => {
       return (
           <View style={styles.body}>
               {position(book.position.city || undefined)}
               <TextComponent>{bookInfo?.volumeInfo.title || "Nessun titolo"}</TextComponent>
               <TextComponent style={styles.price}>{`${book.price}€` || ""}</TextComponent>
           </View>
       )
    }

    return (
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate("BookPostDetail", {bookId: book.uid || ""})}>
            <View style={styles.image}>
                <Center style={styles.book}>
                    <TextComponent style={[theme.fonts.TITLE, {color: "#CCC"}]}>{bookInfo?.volumeInfo.title[0] || "B"}</TextComponent>
                </Center>
            </View>
            {
                bookInfo ? itemBody() : <View style={styles.skeleton}></View>
            }

        </TouchableOpacity>
    )
}

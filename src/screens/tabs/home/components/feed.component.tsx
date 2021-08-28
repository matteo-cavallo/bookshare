import React, {FC, useContext, useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {TextComponent} from '../../../../components/text.component';
import {ThemeContext} from '../../../../providers/theme.provider';
import {HomeStackParams} from '../../../../navigators/home/home.navigator';
import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from 'react-native-screens/native-stack';
import {AuthenticationNavigatorScreens} from '../../../../navigators/authentication.navigator';
import {BookList} from './booksList.component';
import {BookPost} from '../../../../model/bookPost.model';
import {FBFirestore} from '../../../../firebase/firebase.config';


export const Feed = () => {

    const {theme} = useContext(ThemeContext)

    const [books, setBooks] = useState<BookPost[]>([])

    useEffect(() => {
        FBFirestore
                .collection("bookPosts")
                .limit(9)
                .get()
                .then(snap => {
                    setBooks(snap.docs.map(b => {
                        return {
                            uid: b.id,
                            ...b.data()
                        } as BookPost
                    }))
                })
    }, [])


    return (
        <View>
            <TextComponent style={theme.fonts.LARGE_TITLE}>Feed</TextComponent>
            <BookList books={books}/>
        </View>
    )
}

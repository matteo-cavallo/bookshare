import {BookPost} from '../../../../model/bookPost.model';
import React, {FC} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {FirestoreReducer} from 'redux-firestore';
import {TextComponent} from '../../../../components/text.component';
import {isLoaded} from 'react-redux-firebase';
import {BookItem} from './bookItem.components';

interface Props {
    books: BookPost[]
}

export const BookList: FC<Props> = ({books}) => {

    const styles = StyleSheet.create({
        row: {
            flexDirection: 'row',
            flexWrap: 'wrap'
        },
        item: {
            width: '50%',
        }
    })

    if (!books) {
        return (
            <View>
                <ActivityIndicator/>
            </View>
        )
    }

    return (
        <View style={styles.row}>
            {
                books.map((book, index) =>
                    <View style={styles.item}>
                        <BookItem key={index} book={book}/>
                    </View>)
            }
        </View>
    )
}

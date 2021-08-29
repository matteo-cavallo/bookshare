import {BookPost} from '../../../../model/bookPost.model';
import React, {FC, useState} from 'react';
import {ActivityIndicator, StyleSheet, TouchableOpacity, View, Animated} from 'react-native';
import {FirestoreReducer} from 'redux-firestore';
import {TextComponent} from '../../../../components/text.component';
import {isLoaded} from 'react-redux-firebase';
import {BookItem} from './bookItem.components';

interface Props {
    books: BookPost[]
}

export const BookList: FC<Props> = ({books}) => {

    const [grid, setGrid] = useState(true)

    const styles = StyleSheet.create({
        row: {
            flexDirection: 'row',
            flexWrap: 'wrap'
        },
        item: {
            width: grid ? '50%' : '100%',
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
        <View>
            <View style={styles.row}>
                {
                    books.map((book, index) =>
                        <View style={styles.item} key={book.uid}>
                            <BookItem book={book}/>
                        </View>)
                }
            </View>
        </View>
    )
}

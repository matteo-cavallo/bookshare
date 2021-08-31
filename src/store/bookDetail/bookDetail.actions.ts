import {createAsyncThunk} from '@reduxjs/toolkit';
import {bookPostConverter, FBFirestore} from '../../firebase/firebase.config';
import {FBCollections} from '../../firebase/collections';
import {BookPost} from '../../model/bookPost.model';

const prefix = "bookDetails/"

const FETCH_BOOK = prefix + "fetchBook"

const fetchBook = createAsyncThunk<BookPost, { uid: string }>(FETCH_BOOK, async (arg) => {

    const {uid} = arg

    return FBFirestore
        .collection(FBCollections.bookPost)
        .withConverter(bookPostConverter)
        .doc(uid)
        .get()
        .then(doc => {
            if (doc.exists) {
                const data = doc.data()
                if(data){
                    return data
                }
            }
            throw Error("Document doesn not exists")
        })
        .catch(e => {
            throw Error(e)
        })
})

export const BookDetailActions = {
    fetchBook
}

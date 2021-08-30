import {createAsyncThunk} from '@reduxjs/toolkit';
import {bookPostConverter, FBFirestore} from '../../firebase/firebase.config';
import {FBCollections} from '../../firebase/collections';
import {BookPost} from '../../model/bookPost.model';

const prefix = "home/"

const FETCH_FEED =  prefix + "fetchFeed"


const fetchFeed = createAsyncThunk<BookPost[], void>(FETCH_FEED, async args => {
    return await FBFirestore.collection(FBCollections.bookPost)
        .orderBy("creationDate", "desc")
        .limit(8)
        .where("active", "==", true)
        .withConverter(bookPostConverter)
        .get()
        .then(querySnapshot => {
            return querySnapshot.docs.map(doc => doc.data());
        })
})

export const HomeActions = {
    fetchFeed
}

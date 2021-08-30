import {createAsyncThunk} from '@reduxjs/toolkit';
import {bookPostConverter, FBFirestore} from '../../firebase/firebase.config';
import {FBCollections} from '../../firebase/collections';

const prefix = "home/"

const FETCH_FEED =  prefix + "fetchFeed"


const fetchFeed = createAsyncThunk(FETCH_FEED, async args => {
    await FBFirestore.collection(FBCollections.bookPost)
        .orderBy("creationDate", "desc")
        .limit(8)
        .where("active", "==", true)
        .withConverter(bookPostConverter)
        .get()
        .then(querySnapshot => {
            const docs = querySnapshot.docs.map(doc => doc.data())
            console.log(docs)
        })
        .catch(e => {
            console.log(e.message)
        })
})

export const HomeActions = {
    fetchFeed
}

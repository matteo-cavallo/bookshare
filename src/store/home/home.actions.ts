import {createAsyncThunk} from '@reduxjs/toolkit';
import {bookPostConverter, FBFirestore} from '../../firebase/firebase.config';
import {FBCollections} from '../../firebase/collections';
import {BookPost} from '../../model/bookPost.model';
import {RootState} from '../store.config';

const prefix = "home/"

const FETCH_FEED =  prefix + "fetchFeed"
const FETCH_MORE_DATA_FEED =  prefix + "fetchMoreData"


const fetchFeed = createAsyncThunk<BookPost[], void>(FETCH_FEED, async (arg) => {
    return FBFirestore.collection(FBCollections.bookPost)
        .withConverter(bookPostConverter)
        .where("active", "==", true)
        .orderBy("creationDate", "desc")
        .limit(6)
        .get()
        .then(querySnapshot => {
            console.log("Fetched: ", querySnapshot.docs.map(snap => snap.id))
            return querySnapshot.docs.map(doc => doc.data());
        })
        .catch(e => {
            throw Error(e)
        })
})


const fetchMoreDataFeed = createAsyncThunk<BookPost[], void>(FETCH_MORE_DATA_FEED, async (arg, thunkAPI) => {


    const state = thunkAPI.getState() as RootState
    const key = state.home.lastDocRef

    if (key == null){
        throw Error("No data to be fetched")
    }

    return FBFirestore.collection(FBCollections.bookPost)
        .withConverter(bookPostConverter)
        .where("active", "==", true)
        .orderBy("creationDate", "desc")
        .startAfter(key)
        .limit(2)
        .get()
        .then(querySnapshot => {
            console.log("Fetched more data: ", querySnapshot.docs.map(snap => snap.id))
            return querySnapshot.docs.map(doc => doc.data());
        })
        .catch(e => {
            throw Error(e)
        })
}, {
    condition: (arg, api) => {
        const state = api.getState() as RootState
        if(state.home.lastDocRef == null){
            return false
        }
    }
})

export const HomeActions = {
    fetchFeed,
    fetchMoreDataFeed
}

import {createAsyncThunk} from '@reduxjs/toolkit';
import {BookPost} from '../../model/bookPost.model';
import {GoogleBookAPIService} from '../../services/googleBookAPI.service';
import {RootState} from '../store.config';
import {FBAuth, FBFirestore, userConverter} from '../../firebase/firebase.config';
import {FBCollections} from '../../firebase/collections';
import {UserModel} from '../../model/user.model';
import firebase from 'firebase';

const prefix = "postNewBook/"

const POST_NEW_BOOK = prefix + "postNewBook"
const FETCH_BOOK_INFO_ISBN = prefix + "fetchBookByIsbn"

const postNewBook = createAsyncThunk<void, BookPost>(POST_NEW_BOOK, async (arg, thunkAPI) => {

    // Grab user from context
    const currentUserId = FBAuth.currentUser?.uid
    if (!currentUserId) {
        throw Error("Utente corrente non disponibile")
    }

    // Preparing Data
    arg.userId = currentUserId
    arg.creationDate = new Date()
    arg.lastEdit = new Date()

    try {
        // Fire the transaction
        return await FBFirestore.runTransaction(async transaction => {
            // Saving the new post
            const newPostDoc = await FBFirestore.collection(FBCollections.bookPost).add(arg)

            // Getting the User
            const userDocRef = await FBFirestore.collection(FBCollections.users).doc(currentUserId).withConverter(userConverter)
            return transaction.get(userDocRef).then(userDoc => {
                if (!userDoc.exists) {
                    throw Error("User does not exists")
                }

                // Add post ref to User Account
                const postedBooks = userDoc?.data()?.postedBooks || []
                transaction.set(userDocRef, {
                    postedBooks: [...postedBooks, newPostDoc.id],
                },{merge: true})
            })
        })
    } catch (e) {
        throw Error(e.message)
    }

})

const fetchBookByIsbn = createAsyncThunk<GoogleAPIBookVolume, string>(FETCH_BOOK_INFO_ISBN, async isbn => {
    return await GoogleBookAPIService.getBookByISBN(isbn)
}, {
    // This Condition will prevent multiple call to API if state is loading
    condition: (arg, api) => {
        const state = api.getState() as RootState

        if (state.newBook.isLoading) {
            return false
        }
    }
})

export const PostNewBookActions = {
    postNewBook,
    fetchBookByIsbn
}

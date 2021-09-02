import {createAsyncThunk} from '@reduxjs/toolkit';
import {bookPostConverter, FBAuth, FBFirestore, FieldValue, userConverter} from '../../firebase/firebase.config';
import {FBCollections} from '../../firebase/collections';
import {BookPost} from '../../model/bookPost.model';
import {genericConverter} from '../../hooks/usePaginatedData.hook';
import {UserModel} from '../../model/user.model';

const prefix = "bookDetails/"

const FETCH_BOOK = prefix + "fetchBook"
const FETCH_USER = prefix + "fetchUser"
const SAVE_POST = prefix + "savePost"

const savePost = createAsyncThunk<void, { postId: string, save: boolean }>(SAVE_POST, arg => {

    const currentUserId = FBAuth.currentUser?.uid

    if (!currentUserId) {
        throw Error("Current user is not found")
    }

    return FBFirestore.runTransaction(transaction => {
        const userRef = FBFirestore.collection(FBCollections.users).doc(currentUserId).withConverter(userConverter)
        const postRef = FBFirestore.collection(FBCollections.bookPost).doc(arg.postId).withConverter(bookPostConverter)
        return transaction.get(userRef).then(userDoc => {
            if (arg.save) {
                transaction.update(userRef, {
                    savedPosts: FieldValue.arrayUnion(arg.postId)
                })
                transaction.update(postRef, {
                    saves: FieldValue.increment(1)
                })
            } else {
                transaction.update(userRef, {
                    savedPosts: FieldValue.arrayRemove(arg.postId)
                })
                transaction.update(postRef, {
                    saves: FieldValue.increment(-1)
                })
            }
        })
    })
})

const fetchUser = createAsyncThunk<UserModel, { uid?: string }>(FETCH_USER, async arg => {

    if (!arg.uid) {
        throw Error("User UID is not provided")
    }

    return FBFirestore
        .collection(FBCollections.users)
        .withConverter(genericConverter<UserModel>())
        .doc(arg.uid)
        .get()
        .then(doc => {
            if (doc.exists) {
                const data = doc.data()
                if (data) {
                    return data
                }
            }
            throw Error("User does not exists")
        })
        .catch(e => {
            throw e
        })
})


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
                if (data) {
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
    fetchBook,
    fetchUser,
    savePost
}

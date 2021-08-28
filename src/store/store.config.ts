import {applyMiddleware, combineReducers, configureStore, createStore, Reducer} from '@reduxjs/toolkit';
import {UIReducer, UIStoreState} from './uiStore/uistore.reducer';
import {FirebaseReducer, firebaseReducer} from 'react-redux-firebase';
import {FirestoreReducer, firestoreReducer} from 'redux-firestore';
import {postBookReducer, PostBookState} from './postBook/postBook.reducer';
import thunk from 'redux-thunk';
import {UserModel} from '../model/user.model';
import {BookPost} from '../model/bookPost.model';

interface Schema {
    books: GoogleAPIBookVolume,
    bookPosts: BookPost
}

interface Store {
    firebase: FirebaseReducer.Reducer<UserModel, Schema>
    firestore: FirestoreReducer.Reducer<Schema>
    postBook: PostBookState
}

const rootReducer = combineReducers<Store>({
        // React-Redux-Firebase
        firebase:  firebaseReducer,
        firestore: firestoreReducer,

        // Other reducers
    postBook: postBookReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type RootState = ReturnType<typeof rootReducer>

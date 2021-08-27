import {combineReducers, configureStore, createStore} from '@reduxjs/toolkit';
import {UIReducer, UIStoreState} from './uiStore/uistore.reducer';
import {FirebaseReducer, firebaseReducer} from 'react-redux-firebase';
import {FirestoreReducer, firestoreReducer} from 'redux-firestore';

interface Profile {
    name: string;
    email: string;
    lastName: string;
}


export interface Book {
    name: string;
    code: string;
}

interface Schema {
    books: Book
}

interface Store {
    firebase: FirebaseReducer.Reducer<Profile, Schema>;
    firestore: FirestoreReducer.Reducer<Schema>
}

const rootReducer = combineReducers<Store>({
        // React-Redux-Firebase
        firebase:  firebaseReducer,
        firestore: firestoreReducer,

        // Other reducers
})

export const store = createStore(rootReducer)

export type RootState = ReturnType<typeof rootReducer>

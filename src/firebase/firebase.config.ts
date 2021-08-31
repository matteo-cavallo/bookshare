// Initialize Firebase
import firebase from 'firebase';
import 'firebase/auth'
import 'firebase/firestore'
import FirestoreDataConverter = firebase.firestore.FirestoreDataConverter;
import {UserModel} from '../model/user.model';
import {BookPost} from '../model/bookPost.model';



export const firebaseConfig = {
    apiKey: "AIzaSyBh0Gd7tzj820Wpvi33DcmuFzVpN8Nc4Bo",
    authDomain: "bookshare-4d2f4.firebaseapp.com",
    projectId: "bookshare-4d2f4",
    storageBucket: "bookshare-4d2f4.appspot.com",
    messagingSenderId: "194653713104",
    appId: "1:194653713104:web:76ef63326bff6118f3a4d5"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}else {
    firebase.app(); // if already initialized, use that one
}


export const FBAuth = firebase.auth()
export const FBFirestore = firebase.firestore()


export const userConverter: FirestoreDataConverter<UserModel> = {
    fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions): UserModel {
        return snapshot.data() as UserModel
    },
    toFirestore(modelObject: UserModel): firebase.firestore.DocumentData {
        return modelObject
    }
}

export const bookPostConverter: FirestoreDataConverter<BookPost> = {
    fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions): BookPost {
        const data = snapshot.data() as BookPost
        data.uid = snapshot.id
        return data
    },
    toFirestore(modelObject: BookPost): firebase.firestore.DocumentData {
        return modelObject
    }
}


export type FirebaseUser = firebase.User
export type UserCredential = firebase.auth.UserCredential
export type DocumentData = firebase.firestore.DocumentData
export type DocumentSnapshot = firebase.firestore.DocumentSnapshot
export type QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot
export type SnapshotOptions = firebase.firestore.SnapshotOptions
export type OrderByDirection = firebase.firestore.OrderByDirection

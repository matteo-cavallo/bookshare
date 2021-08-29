// Initialize Firebase
import firebase from 'firebase';
import 'firebase/auth'
import 'firebase/firestore'
import FirestoreDataConverter = firebase.firestore.FirestoreDataConverter;
import {UserModel} from '../model/user.model';


export type FirebaseUser = firebase.User
export type UserCredential = firebase.auth.UserCredential

export const firebaseConfig = {
    apiKey: "AIzaSyBh0Gd7tzj820Wpvi33DcmuFzVpN8Nc4Bo",
    authDomain: "bookshare-4d2f4.firebaseapp.com",
    projectId: "bookshare-4d2f4",
    storageBucket: "bookshare-4d2f4.appspot.com",
    messagingSenderId: "194653713104",
    appId: "1:194653713104:web:76ef63326bff6118f3a4d5"
};


firebase.initializeApp(firebaseConfig);

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

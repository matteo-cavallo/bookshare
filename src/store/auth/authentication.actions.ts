import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import {FBAuth, FBFirestore, FirebaseUser, userConverter, UserCredential} from '../../firebase/firebase.config';
import {FBCollections} from '../../firebase/collections';

const prefix = "authentication/"

const ADD_USER = prefix + "addUser"
const ANONYMOUS_AUTH = prefix + "anonymousAuth"
const LOGOUT = prefix + "logout"
const LOGIN_EMAIL = prefix + "loginWithEmail"
const SIGNUP_EMAIL = prefix + "signUpEmail"

const setUser = createAction<FirebaseUser | null>(ADD_USER)

/**
 * Anonymous Authentication
 */
const anonymousAuthentication = createAsyncThunk(ANONYMOUS_AUTH, async arg => {
    return await FBAuth.signInAnonymously()
})

/**
 * Login with Email
 */
type LoginWithEmailArgs = {
    email: string
    password: string
}
const loginWithEmail = createAsyncThunk<UserCredential, LoginWithEmailArgs>(LOGIN_EMAIL, async arg => {
    const {email, password} = arg
    return await FBAuth.signInWithEmailAndPassword(email, password)
})

/**
 * Sign Up with Email and Password
 */
type SignUpWithEmailArgs = {
    email: string
    password: string
}
const signUpWithEmailAndPassword = createAsyncThunk<void, SignUpWithEmailArgs>(SIGNUP_EMAIL, async arg => {
    const {email, password} = arg

    try {
        // Registration
        const user = await FBAuth.createUserWithEmailAndPassword(email, password)

        // Creating account
        const userDocRef = FBFirestore.collection(FBCollections.users)
            .doc(user.user?.uid)
            .withConverter(userConverter)
        await userDocRef
            .set({
                email: user.user?.email || "",
                postedBooks: [],
            })
        console.log("Account created. Id: ", user.user?.uid)
    } catch (e) {
        throw Error(e.message)
    }
})

/**
 *  Sign out
 */
const signOut = createAsyncThunk(LOGOUT, async arg => {
    return await FBAuth.signOut()
})

export const AuthenticationActions = {
    setUser,
    anonymousAuthentication,
    loginWithEmail,
    signOut,
    signUpWithEmailAndPassword
}

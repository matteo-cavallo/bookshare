import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import {FBAuth, FirebaseUser, UserCredential} from '../../firebase/firebase.config';

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
    return await FBAuth.signInWithEmailAndPassword(email,password)
})

/**
 * Sign Up with Email and Password
 */
type SignUpWithEmailArgs = {
    email: string
    password: string
}
const signUpWithEmailAndPassword = createAsyncThunk<UserCredential, SignUpWithEmailArgs>(SIGNUP_EMAIL, async arg => {
    const {email, password} = arg
    return await FBAuth.createUserWithEmailAndPassword(email, password)
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

import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import {User} from 'model/user.model';
import {authService} from 'services/auth.service';
const prefix = "authentication/"

export const AUTH_ACTIONS = {
    reset: prefix + "reset",
    addUser: prefix + "addUser",
    logout: prefix + "logout",
    loginWithEmail: prefix + "loginWithEmail",
    signUpEmail: prefix + "signUpEmail",
}

const setUser = createAction<User | null>(AUTH_ACTIONS.addUser)
const resetState = createAction(AUTH_ACTIONS.reset)

/**
 * Login with Email
 */
type LoginWithEmailArgs = {
    email: string
    password: string
}
const loginWithEmail = createAsyncThunk<User, LoginWithEmailArgs>(AUTH_ACTIONS.loginWithEmail, async arg => {
    return await authService.loginWithEmail()

})

/**
 * Sign Up with Email and Password
 */
type SignUpWithEmailArgs = {
    email: string
    password: string
}
const signUpWithEmailAndPassword = createAsyncThunk<void, SignUpWithEmailArgs>(AUTH_ACTIONS.signUpEmail, async arg => {
    await authService.signUpWithEmailAndPassword()
})

/**
 *  Sign out
 */
const signOut = createAsyncThunk(AUTH_ACTIONS.logout, async arg => {
})

export const AuthenticationActions = {
    setUser,
    loginWithEmail,
    signOut,
    signUpWithEmailAndPassword,
    resetState
}

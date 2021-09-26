import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import {Profile} from 'model/profile.model';
import {authService} from 'services/auth.service';
import {
    LoginWithEmailArgs,
    LoginWithEmailResponse,
    LoginWithPersistenceArgs,
    SignUpWithEmailArgs
} from 'store/auth/types';
const prefix = "authentication/"

export const AUTH_ACTIONS = {
    reset: prefix + "reset",
    addUser: prefix + "addUser",
    logout: prefix + "logout",
    loginWithEmail: prefix + "loginWithEmail",
    loginWithPersistence: prefix + "loginWithPersistence",
    signUpEmail: prefix + "signUpEmail",
}

const setUser = createAction<Profile | undefined>(AUTH_ACTIONS.addUser)
const resetState = createAction(AUTH_ACTIONS.reset)

const loginWithEmail = createAsyncThunk<LoginWithEmailResponse, LoginWithEmailArgs>(AUTH_ACTIONS.loginWithEmail, async arg => {
    const payload = await authService.loginWithEmail()
    await authService.saveProfilePersistence(payload.token,payload.profile)
    return payload
})

const loginWithPersistence = createAsyncThunk<LoginWithPersistenceArgs, void>(AUTH_ACTIONS.loginWithPersistence, async arg => {
    return  await authService.retrieveProfilePersistence()
})

const signUpWithEmailAndPassword = createAsyncThunk<void, SignUpWithEmailArgs>(AUTH_ACTIONS.signUpEmail, async arg => {
    await authService.signUpWithEmailAndPassword()
})

const signOut = createAsyncThunk(AUTH_ACTIONS.logout, async arg => {
    await authService.removeProfilePersistence()
})

export const AuthenticationActions = {
    setUser,
    loginWithEmail,
    signOut,
    signUpWithEmailAndPassword,
    resetState,
    loginWithPersistence
}

import {createReducer} from '@reduxjs/toolkit';
import {AuthenticationActions} from './authentication.actions';
import {Profile} from 'model/profile.model';

interface AutenticationState {
    profile?: Profile
    isSplashScreen: boolean
    isLoading: boolean
    token?: string
}

const initialState: AutenticationState = {
    isSplashScreen: true,
    isLoading: false,
}

export const authenticationReducer = createReducer(initialState, builder => {

    builder.addCase(AuthenticationActions.setUser, (state, action) => {
        state.profile = action.payload
    })
    builder.addCase(AuthenticationActions.resetState, state => {
        state.isLoading = false
    })

    /**
     * Sign In with Email
     */

    builder.addCase(AuthenticationActions.loginWithEmail.fulfilled, (state, action) => {
        state.isLoading = false
        state.profile = action.payload.profile
        state.token = action.payload.token
    })

    builder.addCase(AuthenticationActions.loginWithEmail.pending, (state) => {
        state.isLoading = true
    })

    builder.addCase(AuthenticationActions.loginWithEmail.rejected, (state) => {
        state.isLoading = false
    })


    /**
     * Sign Up With email
     */
    builder.addCase(AuthenticationActions.signUpWithEmailAndPassword.fulfilled, (state) => {
        state.isLoading = false
    })

    builder.addCase(AuthenticationActions.signUpWithEmailAndPassword.pending, (state) => {
        state.isLoading = true
    })

    builder.addCase(AuthenticationActions.signUpWithEmailAndPassword.rejected, (state) => {
        state.isLoading = false
    })

    /**
     * Sign Up With email Persistence
     */
    builder.addCase(AuthenticationActions.loginWithPersistence.fulfilled, (state,action) => {
        const {profile,token} = action.payload
        if(profile && token){
            state.profile = profile
            state.token = token
        }
        state.isSplashScreen = false
        state.isLoading = false
    })

    builder.addCase(AuthenticationActions.loginWithPersistence.pending, (state) => {
        state.isLoading = true
        state.isSplashScreen = true
    })

    builder.addCase(AuthenticationActions.loginWithPersistence.rejected, (state) => {
        state.isLoading = false
        state.isSplashScreen = false
    })
    /**
     * Sign out
     */
    builder.addCase(AuthenticationActions.signOut.fulfilled, (state) => {
        state.isLoading = false
        state.profile = undefined
        state.token = undefined
    })

    builder.addCase(AuthenticationActions.signOut.pending, (state) => {
        state.isLoading = true
    })

    builder.addCase(AuthenticationActions.signOut.rejected, (state) => {
        state.isLoading = false
        state.profile = undefined
        state.token = undefined
    })
})

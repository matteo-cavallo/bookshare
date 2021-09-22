import {createReducer} from '@reduxjs/toolkit';
import {AuthenticationActions} from './authentication.actions';
import {User} from 'model/user.model';

interface AutenticationState {
    user: User | null
    isLoading: boolean
}

const initialState: AutenticationState = {
    user: null,
    isLoading: false
}

export const authenticationReducer = createReducer(initialState, builder => {

    builder.addCase(AuthenticationActions.setUser, (state, action) => {
        state.user = action.payload
    })
    builder.addCase(AuthenticationActions.resetState, state => {
        state.isLoading = false
    })

    /**
     * Sign In with Email
     */

    builder.addCase(AuthenticationActions.loginWithEmail.fulfilled, (state) => {
        state.isLoading = false
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
})

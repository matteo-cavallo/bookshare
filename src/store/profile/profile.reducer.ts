import {createReducer} from '@reduxjs/toolkit';
import {User} from 'model/profile.model';
import {ProfileActions} from "store/profile/profile.actions";

interface UserState {
    user?: User;
    isLoading: boolean;
    isError: boolean;
}

const initialState: UserState = {
    isLoading: false,
    isError: false,
}

export const profileReducer = createReducer(
    initialState,
    builder => {
        builder.addCase(ProfileActions.fetchProfile.pending, state => {
            state.isLoading = true
            state.isError = false
        })
        builder.addCase(ProfileActions.fetchProfile.rejected,(state, action) => {
            state.isError = true
            state.isLoading = false
        })
        builder.addCase(ProfileActions.fetchProfile.fulfilled, (state, action) => {
            state.isLoading = false
            state.isError = false
            state.user = action.payload
        })
        //Update User
        builder.addCase(ProfileActions.updateProfile.pending, state => {
            console.log("load")
            state.isLoading = true
            state.isError = false
        })
        builder.addCase(ProfileActions.updateProfile.rejected,(state, action) => {
            console.log("rej")
            state.isError = true
            state.isLoading = false
        })
        builder.addCase(ProfileActions.updateProfile.fulfilled, (state, action) => {
            console.log("full")
            state.isLoading = false
            state.isError = false
        })

    }
)

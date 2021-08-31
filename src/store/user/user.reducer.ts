import {createReducer} from '@reduxjs/toolkit';
import {UserModel} from '../../model/user.model';
import {UserActions} from "./user.actions";

interface UserState {
    user?: UserModel;
    isLoading: boolean;
    isError: boolean;
}

const initialState: UserState = {
    isLoading: false,
    isError: false,
}

export const userReducer = createReducer(
    initialState,
    builder => {
        builder.addCase(UserActions.fetchUser.pending,state => {
            state.isLoading = true
            state.isError = false
        })
        builder.addCase(UserActions.fetchUser.rejected,(state,action) => {
            state.isError = true
            state.isLoading = false
        })
        builder.addCase(UserActions.fetchUser.fulfilled, (state,action) => {
            state.isLoading = false
            state.isError = false
            state.user = action.payload
        })
        //Update User
        builder.addCase(UserActions.updateUser.pending,state => {
            console.log("load")
            state.isLoading = true
            state.isError = false
        })
        builder.addCase(UserActions.updateUser.rejected,(state,action) => {
            console.log("rej")
            state.isError = true
            state.isLoading = false
        })
        builder.addCase(UserActions.updateUser.fulfilled, (state,action) => {
            console.log("full")
            state.isLoading = false
            state.isError = false
        })

    }
)

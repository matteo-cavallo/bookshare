import {createReducer} from '@reduxjs/toolkit';
import {UserModel} from '../../model/user.model';
import {UserActions} from './user.actions';

interface UserState {
    user?: UserModel;
    isLoading: boolean;
    isError: boolean
}

const initialState: UserState = {
    isLoading: false,
    isError: false
}

export const userReducer = createReducer(
    initialState,
    builder => {
        builder.addCase(UserActions.fetchUser.fulfilled,(state, action) => {
            state.isLoading = false
            state.isError = false
            state.user = action.payload
            console.log("Fetch user - Fullfill")
        })
        builder.addCase(UserActions.fetchUser.pending, state => {
            state.isLoading = true
            state.isError = false
            console.log("Fetch user - Pending")
        })
        builder.addCase(UserActions.fetchUser.rejected, state => {
            state.isLoading = false
            state.isError = true
            console.log("Fetch user - Rejected")
        })

    }
)

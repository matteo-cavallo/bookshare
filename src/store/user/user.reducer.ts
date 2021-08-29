import {createReducer} from '@reduxjs/toolkit';
import {UserModel} from '../../model/user.model';

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

    }
)

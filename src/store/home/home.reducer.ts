import {createReducer} from '@reduxjs/toolkit';
import {BookPost} from '../../model/bookPost.model';

interface HomeState {
    isLoading: boolean
    isError: boolean

    feed: BookPost[]
}

const initialState: HomeState = {
    isLoading: false,
    isError: false,
    feed: []
}

export const homeReducer = createReducer(initialState, builder => {


})

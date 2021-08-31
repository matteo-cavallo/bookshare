import {createReducer} from '@reduxjs/toolkit';
import {BookPost} from '../../model/bookPost.model';

interface BookDetailState {
    isLoading: boolean
    isError: boolean
    book: BookPost | null
}

const initialState: BookDetailState = {
    isLoading: false,
    isError: false,
    book: null
}

export const bookDetailReducer = createReducer(initialState, builder => {
    
})

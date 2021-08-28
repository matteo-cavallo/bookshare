import {createReducer} from '@reduxjs/toolkit';
import {BookPost} from '../../model/bookPost.model';
import {PostBookScreen} from '../../screens/tabs/postBook/postBook.screen';
import {PostBookActions} from './postBook.actions';

export interface PostBookState {
    book?: BookPost
    isLoading: boolean
    isError: boolean
}

const initialState: PostBookState = {
    isLoading: false,
    isError: false
}

export const postBookReducer = createReducer(initialState, builder => {

    builder.addCase(PostBookActions.publishBook.pending,state => {
        state.isLoading = true
        state.isError = false
    })

    builder.addCase(PostBookActions.publishBook.fulfilled, state => {
        state.isLoading = false
        state.isError = false
    })

})

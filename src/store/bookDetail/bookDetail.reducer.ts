import {createReducer} from '@reduxjs/toolkit';
import {BookPost} from '../../model/bookPost.model';
import {BookDetailActions} from './bookDetail.actions';

interface BookDetailState {
    isLoading: boolean
    isError: boolean
    book?: BookPost
}

const initialState: BookDetailState = {
    isLoading: false,
    isError: false,
}

export const bookDetailReducer = createReducer(initialState, builder => {

    builder.addCase(BookDetailActions.fetchBook.pending, state => {
        state.isLoading = true
        state.isError = false
    })
    builder.addCase(BookDetailActions.fetchBook.rejected, state => {
        state.isLoading = false
        state.isError = true
    })
    builder.addCase(BookDetailActions.fetchBook.fulfilled, (state, action)=> {
        state.isLoading = false
        state.isError = false
        state.book = action.payload
    })

})

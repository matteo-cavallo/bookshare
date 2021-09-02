import {createReducer} from '@reduxjs/toolkit';
import {BookPost} from '../../model/bookPost.model';
import {BookDetailActions} from './bookDetail.actions';
import {UserModel} from '../../model/user.model';

interface BookDetailState {
    isLoading: boolean
    isError: boolean
    book?: BookPost
    user?: UserModel
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

    builder.addCase(BookDetailActions.fetchUser.pending, state => {
        state.isLoading = true
        state.isError = false
    })
    builder.addCase(BookDetailActions.fetchUser.rejected, state => {
        state.isLoading = false
        state.isError = true
    })
    builder.addCase(BookDetailActions.fetchUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.user = action.payload
    })

})

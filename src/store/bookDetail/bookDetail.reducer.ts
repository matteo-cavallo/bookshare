import {createReducer} from '@reduxjs/toolkit';
import {Post} from 'model/post.model';
import {BookDetailActions} from './bookDetail.actions';
import {User} from 'model/user.model';

interface BookDetailState {
    isLoading: boolean
    isError: boolean
    post?: Post
    user?: User
}

const initialState: BookDetailState = {
    isLoading: false,
    isError: false,
}

export const bookDetailReducer = createReducer(initialState, builder => {

    builder.addCase(BookDetailActions.fetchPost.pending, state => {
        state.isLoading = true
        state.isError = false
    })
    builder.addCase(BookDetailActions.fetchPost.rejected, state => {
        state.isLoading = false
        state.isError = true
    })
    builder.addCase(BookDetailActions.fetchPost.fulfilled, (state, action)=> {
        state.isLoading = false
        state.isError = false
        state.post = action.payload
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

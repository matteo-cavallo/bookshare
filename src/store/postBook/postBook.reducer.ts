import {createReducer} from '@reduxjs/toolkit';
import {BookPost} from '../../model/bookPost.model';
import {PostNewBookActions} from './postBook.actions';

interface PostNewBookState {
    book?: BookPost
    googleBook?: GoogleAPIBookVolume
    isLoading: boolean
}

const initialState: PostNewBookState = {
    isLoading: false,
}

export const postNewBookReducer = createReducer(initialState, builder => {

    builder.addCase(PostNewBookActions.fetchBookByIsbn.pending, state => {
        state.isLoading = true
    })
    builder.addCase(PostNewBookActions.fetchBookByIsbn.fulfilled, (state, action) => {
        state.googleBook = action.payload
        state.isLoading = false
    })
    builder.addCase(PostNewBookActions.fetchBookByIsbn.rejected, state => {
        console.log("Error fetching book by ISBN")
        state.isLoading = false
    })
})

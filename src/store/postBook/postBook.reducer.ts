import {createReducer} from '@reduxjs/toolkit';
import {Post} from 'model/post.model';
import {PostNewBookActions} from './postBook.actions';

interface PostNewBookState {
    book?: Post
    googleBook: GoogleAPIBookVolume | null
    isLoading: boolean
}

const initialState: PostNewBookState = {
    isLoading: false,
    googleBook: null
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
        state.googleBook = null
    })


    builder.addCase(PostNewBookActions.deleteGoogleBook, state => {
        state.googleBook = null
    })
})

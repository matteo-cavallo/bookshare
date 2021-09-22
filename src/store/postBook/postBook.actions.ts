import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import {GoogleBookAPIService} from '../../services/googleBookAPI.service';
import {RootState} from '../store.config';
import {Book} from 'model/book.model';
import {bookService} from 'services/book.service';

const prefix = "postNewBook/"

export const POST_BOOK_ACTIONS = {
    postNewBook: prefix + "postNewBook",
    fetchBookByIsbn: prefix + "fetchBookByIsbn",
    deleteGoogleBook: prefix + "deleteGoogleBook"
}

const deleteGoogleBook = createAction(POST_BOOK_ACTIONS.deleteGoogleBook)

const postNewBook = createAsyncThunk<void, Book>(POST_BOOK_ACTIONS.postNewBook, async (arg, thunkAPI) => {
    await bookService.saveBook()
})

const fetchBookByIsbn = createAsyncThunk<GoogleAPIBookVolume, string>(POST_BOOK_ACTIONS.fetchBookByIsbn, async isbn => {
    return await GoogleBookAPIService.getBookByISBN(isbn)
}, {
    // This Condition will prevent multiple call to API if state is loading
    condition: (arg, api) => {
        const state = api.getState() as RootState
        if (state.newBook.isLoading) {
            return false
        }
    }
})

export const PostNewBookActions = {
    postNewBook,
    fetchBookByIsbn,
    deleteGoogleBook
}

import {createAsyncThunk} from '@reduxjs/toolkit';
import {BookPost} from '../../model/bookPost.model';
import {GoogleBookAPIService} from '../../services/googleBookAPI.service';
import {RootState} from '../store.config';

const prefix = "postNewBook/"

const POST_NEW_BOOK = prefix + "postNewBook"
const FETCH_BOOK_INFO_ISBN = prefix + "fetchBookByIsbn"

const postNewBook = createAsyncThunk<void, BookPost>(POST_NEW_BOOK, (arg, thunkAPI) => {

})

const fetchBookByIsbn = createAsyncThunk<GoogleAPIBookVolume, string>(FETCH_BOOK_INFO_ISBN, async isbn => {
    return await GoogleBookAPIService.getBookByISBN(isbn)
},{
    // This Condition will prevent multiple call to API if state is loading
    condition: (arg, api) => {
        const state = api.getState() as RootState

        if(state.newBook.isLoading){
            return false
        }
    }
})

export const PostNewBookActions = {
    postNewBook,
    fetchBookByIsbn
}

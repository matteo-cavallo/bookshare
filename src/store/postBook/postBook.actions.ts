import {createAsyncThunk} from '@reduxjs/toolkit';
import {BookPost} from '../../model/bookPost.model';
import {useFirestore} from 'react-redux-firebase';
import {useState} from 'react';

interface PublishBookParams {
    book: GoogleAPIBookVolume,
    post: BookPost
}

const publishBook = createAsyncThunk<void, PublishBookParams>("publishBook", async (arg, thunkAPI) => {
    const {book, post} = arg



    console.log("CIAO: ")

})


export const PostBookActions = {
    publishBook
}

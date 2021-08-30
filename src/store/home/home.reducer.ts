import {createReducer} from '@reduxjs/toolkit';
import {BookPost} from '../../model/bookPost.model';
import {HomeActions} from './home.actions';

interface HomeState {
    isLoading: boolean
    isError: boolean

    feed: BookPost[]
}

const initialState: HomeState = {
    isLoading: false,
    isError: false,
    feed: []
}

export const homeReducer = createReducer(initialState, builder => {

    builder.addCase(HomeActions.fetchFeed.pending, state => {
        state.isError = false
        state.isLoading = true
    })
    builder.addCase(HomeActions.fetchFeed.rejected, state => {
        state.isError = true
        state.isLoading = false
    })
    builder.addCase(HomeActions.fetchFeed.fulfilled, (state, action) => {
        state.feed = action.payload
        state.isLoading = false
        state.isError = false
    })
})

import {createReducer} from '@reduxjs/toolkit';
import {BookPost} from '../../model/bookPost.model';
import {HomeActions} from './home.actions';

interface HomeState {
    isLoading: boolean
    isError: boolean

    isLoadingMoreData: boolean,
    feed: BookPost[]
    lastDocRef: string | null
}

const initialState: HomeState = {
    isLoading: false,
    isError: false,

    isLoadingMoreData: false,
    feed: [],
    lastDocRef: null
}

export const homeReducer = createReducer(initialState, builder => {

    builder.addCase(HomeActions.fetchFeed.pending, state => {
        state.isError = false
        state.isLoading = true
    })
    builder.addCase(HomeActions.fetchFeed.rejected, (state, action) => {
        state.isError = true
        state.isLoading = false
        console.log("Error fetching feed. ", action.error.message)
    })
    builder.addCase(HomeActions.fetchFeed.fulfilled, (state, action) => {
        console.log("Home feed fetched")
        state.feed = action.payload
        state.isLoading = false
        state.isError = false

        state.lastDocRef = state.feed[state.feed.length - 1].creationDate || null
    })

    builder.addCase(HomeActions.fetchMoreDataFeed.pending, state => {
        console.log("Fetching more data...")
        state.isLoadingMoreData = true
    })
    builder.addCase(HomeActions.fetchMoreDataFeed.rejected, state => {
        console.log("Error fetching more data.")
        state.isLoadingMoreData = false
    })
    builder.addCase(HomeActions.fetchMoreDataFeed.fulfilled, (state, action) => {

        if (action.payload.length == 0) {
            state.lastDocRef = null
        } else {
            state.feed = [...state.feed, ...action.payload]
            state.lastDocRef = state.feed[state.feed.length - 1].creationDate || null

        }
        state.isLoadingMoreData = false
    })
})

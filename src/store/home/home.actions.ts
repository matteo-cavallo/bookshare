import {createAsyncThunk} from '@reduxjs/toolkit';
import {postService} from 'services/post.service';
import {Post} from 'model/post.model';

const prefix = "home/"

export const HOME_ACTIONS = {
    fetchFeed: prefix + "fetchFeed",
    fetchMoreDataFeed: prefix + "fetchMoreData"
}

const fetchFeed = createAsyncThunk<Post[], void>(HOME_ACTIONS.fetchFeed, async (arg) => {
    return await postService.fetchFeed()
})


const fetchMoreDataFeed = createAsyncThunk<Post[], void>(HOME_ACTIONS.fetchMoreDataFeed, async (arg, thunkAPI) => {
    return await postService.fetchFeed()
})

export const HomeActions = {
    fetchFeed,
    fetchMoreDataFeed
}

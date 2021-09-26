import {createAsyncThunk} from "@reduxjs/toolkit";
import {Profile} from 'model/profile.model';
import {userService} from 'services/user.service';

const prefix = "profile/"

const FETCH_PROFILE = prefix + "fetchProfile"
const UPDATE_PROFILE = prefix + "updateProfile"

const fetchProfile = createAsyncThunk<Profile,void>(FETCH_PROFILE, async (args)=>{
    return await userService.fetchUser()
})

const updateProfile = createAsyncThunk<void,Partial<Profile>>(UPDATE_PROFILE, async (draftProfile, thunkAPI)=>{
    await userService.fetchUser()
})


export const ProfileActions = {
    fetchProfile,
    updateProfile,
}
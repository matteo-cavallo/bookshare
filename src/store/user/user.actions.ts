import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import {UserModel} from "../../model/user.model";
import {FBAuth, FBFirestore, userConverter} from "../../firebase/firebase.config";
import {FBCollections} from "../../firebase/collections";

const prefix = "user/"

const FETCH_USER = prefix + "fetchUser"
const UPDATE_USER = prefix + "updateUser"

const fetchUser = createAsyncThunk<UserModel,void>(FETCH_USER, async (args)=>{

    const userId = FBAuth.currentUser?.uid

    console.log("User id: ", userId)
    if(!userId){
        throw Error("User not found!")
    }


    return FBFirestore
        .collection(FBCollections.users)
        .withConverter(userConverter)
        .doc(userId)
        .get()
        .then(snapshot => {
            if(snapshot.exists){
                const data = snapshot.data()
                if(data){
                    return data
                }
            }
            throw Error("User does not exists")
        })
        .catch(e => {
            throw Error(e)
        })
})

const updateUser = createAsyncThunk<void,UserModel>(UPDATE_USER, async (draftUser)=>{

    const userId = FBAuth.currentUser?.uid

    console.log("User id: ", userId)
    if(!userId){
        throw Error("User not found!")
    }

    return FBFirestore.collection(FBCollections.users)
        .withConverter(userConverter)
        .doc(userId)
        .set(draftUser,{merge:true})
})


export const UserActions = {
    fetchUser,
    updateUser
}
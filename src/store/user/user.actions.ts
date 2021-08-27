import {createAsyncThunk} from '@reduxjs/toolkit';
import {FBAuth, FBFirestore} from '../../firebase/firebase.config';
import {UserModel} from '../../model/user.model';

const prefix = 'user/'

const createUser = createAsyncThunk(prefix + "createUser", (async (arg, {dispatch}) => {

    // Grab local user from Authentication Context
    const user = FBAuth.currentUser
    if (!user) {
        throw Error("User not found.")
    }

    const docRef = FBFirestore.collection("users").doc(user.uid)
    await docRef
        .set({
            email: user.email || "",
            firstName: "Nome",
            lastName: "Cognome"
        })
        .then(() => {
            console.log("User created")
        })
        .catch(() => {
            console.log("Error creating user")
        })
    dispatch(fetchUser)
}))

const fetchUser = createAsyncThunk<UserModel>(prefix + 'fetchUser', async (arg, {dispatch}) => {

    // Grab local user from Authentication Context
    const user = FBAuth.currentUser
    if (!user) {
        throw Error("User not found.")
    }

    return {
        email: "email"
    }
})

export const UserActions = {
    fetchUser
}

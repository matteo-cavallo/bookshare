import {createAsyncThunk} from '@reduxjs/toolkit';
import {FBAuth} from '../../firebase/firebase.config';
import {UserModel} from '../../model/user.model';
import {db} from '../../firebase/utils/db';

const prefix = 'user/'

const initializeNewUser = createAsyncThunk(prefix + "initializeUser", async (arg, {dispatch}) => {

    const user = FBAuth.currentUser
    if(!user) {
        throw Error("User not found")
    }

    await db.users.add({
        email: user.email || "",
        firstName: "Nome",
        lastName: "Cognome"
    })

    dispatch(fetchUser)
})

const fetchUser = createAsyncThunk<UserModel>(prefix + 'fetchUser', async (arg, {dispatch}) => {

    // Grab local user from Authentication Context
    const user = FBAuth.currentUser
    if (!user) {
        throw Error("User not found.")
    }

    // Fetch User from Firestore
    const doc = await db.users.doc(user.uid).get()

    if (doc.exists) {
        // User exists
        return doc.data() as UserModel
    } else {
        // User doesn't have an account on Firestore. Must create one.
        console.log("User does not have an account.")
        dispatch(initializeNewUser())
        throw Error("User not found")
    }
})

export const UserActions = {
    fetchUser
}

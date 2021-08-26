import {createAsyncThunk} from '@reduxjs/toolkit';
import {FBAuth, FBFirestore} from '../../firebase/firebase.config';
import {UserModel} from '../../model/user.model';
import {UserService} from '../../services/user.service';

const prefix = 'user/'

const createUser = createAsyncThunk(prefix + "createUser", (async (arg, {dispatch}) => {

    // Grab local user from Authentication Context
    const user = FBAuth.currentUser
    if (!user) {
        throw Error("User not found.")
    }

    const docRef = FBFirestore.collection("users").doc(user.uid)
    await docRef.withConverter(UserService.converter)
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
    dispatch(fetchUser())
}))

const fetchUser = createAsyncThunk<UserModel>(prefix + 'fetchUser', async (arg, {dispatch}) => {

    // Grab local user from Authentication Context
    const user = FBAuth.currentUser
    if (!user) {
        throw Error("User not found.")
    }

    const docRef = FBFirestore.collection("users").doc(user.uid)
    const doc = await docRef.withConverter(UserService.converter).get()

    if(doc.exists){
        // User already exists
        const userData = doc.data()
        if(userData !== undefined){
            return userData
        } else {
            throw Error("Document exists but it is badly formatted")
        }
    } else {
        // User must be created
        dispatch(createUser())
        throw Error("Creating the user.")
    }
})

export const UserActions = {
    fetchUser
}

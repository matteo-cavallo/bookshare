import {Profile} from 'model/profile.model';
import * as SecureStore from 'expo-secure-store';
import {LoginWithEmailResponse, LoginWithPersistenceArgs} from 'store/auth/types';
import {profileStub} from 'model/stub/profile.stub';



const SPLASH_SCREEN_TIMEOUT = 1500

const loginWithEmail = async () =>{
    return new Promise<LoginWithEmailResponse>((resolve, reject) =>{
        const timer = setTimeout(()=>{
            resolve({token: 'my_secret_token',profile: profileStub} as LoginWithEmailResponse)
        },1000)
    })
}

const signUpWithEmailAndPassword = async () =>{
    return new Promise<Profile>((resolve, reject) =>{
        const timer = setTimeout(()=>{
            resolve({} as Profile)
        },1000)
    })
}

const retrieveProfilePersistence = async() :Promise<LoginWithPersistenceArgs> =>{
    const token = await SecureStore.getItemAsync('secure_token');
    const profileString = await SecureStore.getItemAsync('profile');
    let profile:Profile | undefined
    if(profileString){
        profile = JSON.parse(profileString)
    }

    return new Promise<LoginWithPersistenceArgs>((resolve, reject) =>{
        const timer = setTimeout(()=>{
            resolve({token,profile}  as LoginWithPersistenceArgs)
        },SPLASH_SCREEN_TIMEOUT) // set the default splashScreenTimout

    })
}

const saveProfilePersistence = async(token:string,profile:Profile) =>{
    await SecureStore.setItemAsync('secure_token',token);
    await SecureStore.setItemAsync('profile',JSON.stringify(profile));
}

const removeProfilePersistence = async() =>{
    await SecureStore.deleteItemAsync('secure_token');
    await SecureStore.deleteItemAsync('profile');
}



export const authService = {
    loginWithEmail,
    signUpWithEmailAndPassword,
    retrieveProfilePersistence,
    saveProfilePersistence,
    removeProfilePersistence
}
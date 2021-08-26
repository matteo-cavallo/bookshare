import React, {createContext, FC, useEffect, useState} from 'react';
import firebase from 'firebase';
import {FBAuth} from '../firebase/firebase.config';
import Auth = firebase.auth.Auth;
import {Alert} from 'react-native';
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;

type AuthProps = {
    loading: boolean;
    user: firebase.User | null;
    logout: () => void;
    loginWithEmail: (email: string, password: string, completion: (success: boolean) => void) => void;
    signUpWithEmail: (email: string, password: string, completion: (success: boolean) => void) => void;
}

export const AuthContext = createContext<AuthProps>({
    loading: true,
    user: null,
    logout,
    loginWithEmail: _ => {},
    signUpWithEmail: _ => {}
})

function logout() {
    FBAuth.signOut()
        .then(() => {
            console.log("User is logged out.")
        })
}


export const AuthProvider: FC = ({children}) => {
    const [user, setUser] = useState<firebase.User | null>(null)
    const [loading, setLoading] = useState(true)

    /**
     * Current User changes listener
     */
    useEffect(() => {

        // This function listens to all changes of the user authentication.
        return FBAuth.onAuthStateChanged((user) => {
            console.log("useAuthentication - User: ", user?.uid || "null")
            if (user) {
                // User is signed in
                setUser(user)
                setLoading(false)
            } else {
                // User is signed out
                setUser(null)
                loginAnonymously()
            }
        });
    }, [])


    /**
     * Function used to link an anonymous account with a new provided user
     * @param credential
     * @param cb
     */
    function linkWithCredential(credential: firebase.auth.AuthCredential, cb: (result: boolean) => void) {

        // Grab current user from context
        // It should be ALWAYS present at this point
        // If it is null there is an important BUG to fix
        const user = FBAuth.currentUser

        if (user !== null) {
            user.linkWithCredential(credential)
                .then((newUser) => {
                    console.log("Anonymous account successfully upgraded", newUser);
                    cb(true)
                })
                .catch((error) => {
                console.log("Error upgrading anonymous account", error.message);
                Alert.alert("Problema con la registrazione", error.message)
                cb(false)
            });
        } else {
            Alert.alert("Problema con la registrazione", "Prova ad effettuare la registrazione nuovamente..")
            console.log("auth.provider.tsx : BUG with linkWithCredential function")
        }
    }

    /**
     * Sign Up Function
     * @param email
     * @param password
     * @param completion
     */
    function signUpWithEmail(email: string, password:string, completion: (result: boolean) => void){
        // Should link anonymous user with new Email provider
        const credential = firebase.auth.EmailAuthProvider.credential(email, password);
        linkWithCredential(credential, completion)
    }

    /**
     * Login with Email and Password
     * @param email
     * @param password
     * @param completion
     */
    function loginWithEmail(email: string, password: string, completion: (result: boolean) => void) {
        //setLoading(true)
        FBAuth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                //setLoading(false)
                completion(true)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                Alert.alert("Errore con il login", errorMessage)
                completion(false)
            });
    }

    function loginAnonymously() {
        setLoading(true)
        FBAuth.signInAnonymously()
            .then(() => {
                // User logged
                setLoading(false)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("There is an error logging anonymously. Error: ", errorMessage)
            });
    }

    return (
        <AuthContext.Provider value={{
            loading,
            user,
            logout,
            signUpWithEmail,
            loginWithEmail
        }}>
            {children}
        </AuthContext.Provider>
    )
}

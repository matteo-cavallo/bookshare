import React, {createContext, FC, useEffect, useState} from 'react';
import firebase from 'firebase';
import {FirebaseAuth} from '../firebase/firebase.config';

type AuthProps = {
    loading: boolean;
    user: firebase.User | null;
    logout: () => void;
}

export const AuthContext = createContext<AuthProps>({
    loading: true,
    user: null,
    logout
})

function logout() {
    FirebaseAuth.signOut()
        .then(() => {
            console.log("User is logged out.")
        })
}

export const AuthProvider: FC = ({children}) => {
    const [user, setUser] = useState<firebase.User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        // This function listens to all changes of the user authentication.
        return FirebaseAuth.onAuthStateChanged((user) => {
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
    },[])

    function loginAnonymously() {
        setLoading(true)
        FirebaseAuth.signInAnonymously()
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
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}

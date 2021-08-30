import React, {createContext, FC, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {AuthenticationActions} from '../store/auth/authentication.actions';
import {FBAuth} from '../firebase/firebase.config';

export const AuthContext = createContext(null)

export const AuthenticationProvider: FC = ({children}) => {
    const dispatch = useDispatch()

    useEffect(() => {
        // This function listens to all changes of the user authentication.
        return FBAuth.onAuthStateChanged((user) => {
            console.log("Authentication state changed:  ", user?.uid || "Not authenticated")
            if (user) {
                dispatch(AuthenticationActions.setUser(user))
            } else {
                dispatch(AuthenticationActions.setUser(null))
                dispatch(AuthenticationActions.anonymousAuthentication())
            }
        });
    }, [])

    return (
         <AuthContext.Provider value={null}>
            {children}
        </AuthContext.Provider>
    )
}

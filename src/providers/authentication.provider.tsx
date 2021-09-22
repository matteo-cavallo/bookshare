import React, {createContext, FC, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';

export const AuthContext = createContext(null)

export const AuthenticationProvider: FC = ({children}) => {
    const dispatch = useDispatch()

    useEffect(() => {

    }, [])

    return (
         <AuthContext.Provider value={null}>
            {children}
        </AuthContext.Provider>
    )
}

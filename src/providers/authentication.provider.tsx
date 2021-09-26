import React, {createContext, FC, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {AuthenticationActions} from 'store/auth/authentication.actions';

export const AuthContext = createContext(null)

export const AuthenticationProvider: FC = ({children}) => {
    const dispatch = useDispatch()

    useEffect( () => {
        dispatch(AuthenticationActions.loginWithPersistence())
    }, [])

    return (
         <AuthContext.Provider value={null}>
            {children}
        </AuthContext.Provider>
    )
}

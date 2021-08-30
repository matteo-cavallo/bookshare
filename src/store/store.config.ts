import {
    applyMiddleware,
    combineReducers,
    configureStore,
    createStore,
    Reducer
} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import {userReducer} from './user/user.reducer';
import {authenticationReducer} from './auth/authentication.reducer';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {postNewBookReducer} from './postBook/postBook.reducer';
import {homeReducer} from './home/home.reducer';

export const store = configureStore({
    reducer: {
        user: userReducer,
        auth: authenticationReducer,
        newBook: postNewBookReducer,
        home: homeReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        immutableCheck: {
            ignoredPaths: ["auth.user"]
        },
        serializableCheck: {
            ignoredActions: [
                "authentication/addUser",
                "authentication/anonymousAuth/fulfilled",
                "authentication/loginWithEmail/fulfilled",
                "authentication/signUpEmail/fulfilled"
            ],
            ignoredPaths: ["auth.user", "payload.user"]
        }
    })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

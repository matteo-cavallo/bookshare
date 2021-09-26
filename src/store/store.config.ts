import {
    applyMiddleware,
    combineReducers,
    configureStore,
    createStore,
    Reducer
} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import {profileReducer} from 'store/profile/profile.reducer';
import {authenticationReducer} from './auth/authentication.reducer';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {postNewBookReducer} from './postBook/postBook.reducer';
import {homeReducer} from './home/home.reducer';
import {bookDetailReducer} from './bookDetail/bookDetail.reducer';

export const store = configureStore({
    reducer: {
        user: profileReducer,
        auth: authenticationReducer,
        newBook: postNewBookReducer,
        home: homeReducer,
        bookDetail: bookDetailReducer
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

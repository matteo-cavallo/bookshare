import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {UIReducer} from './uiStore/uistore.reducer';
import {userReducer} from './user/user.reducer';

export const store = configureStore({
    reducer: combineReducers({
        ui: UIReducer,
        user: userReducer
    })
})

export type RootState = ReturnType<typeof store.getState>

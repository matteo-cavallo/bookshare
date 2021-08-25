import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {UIReducer} from './uiStore/uistore.reducer';

export const store = configureStore({
    reducer: combineReducers({
        ui: UIReducer
    })
})

export type RootState = ReturnType<typeof store.getState>

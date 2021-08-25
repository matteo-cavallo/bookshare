import {createReducer} from '@reduxjs/toolkit';
import {UIActions} from './uistore.actions';
import {useNavigation} from '@react-navigation/native';

type UIStoreState = {
    showLoginModal: boolean;
}

const initialState: UIStoreState = {
    showLoginModal: true
}

export const UIReducer = createReducer(initialState, builder => {
    builder.addCase(UIActions.showLogin, state => {
        const navigation = useNavigation()

        state.showLoginModal = true
    })
    builder.addCase(UIActions.hideLogin, state => {
        state.showLoginModal = false
    })
})


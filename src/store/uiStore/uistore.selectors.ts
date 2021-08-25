import {RootState} from '../store.config';

const showLoginModal = (state: RootState) => state.ui.showLoginModal


export const UISelector = {
    showLoginModal
}

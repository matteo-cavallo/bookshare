import {createAction} from '@reduxjs/toolkit';

const prefix = "ui/"

const showLogin = createAction(
    prefix + "showLogin"
)

const hideLogin = createAction(
    prefix + "hideLogin"
)


export const UIActions = {
    showLogin,
    hideLogin
}

import {RootState} from '../store.config';

const getUser = (state: RootState) => state.user.user
const isLoading = (state: RootState) => state.user.isLoading
const isError = (state: RootState) => state.user.isError

const getFullName = (state: RootState) => {
    const firstName = state.user.user?.firstName
    const lastName = state.user.user?.lastName

    if (!firstName && !lastName) {
        return null
    } else {
        return `${firstName || ""} ${lastName || ""}`
    }
}

export const UserSelectors = {
    getUser,
    isLoading,
    isError,
    getFullName
}

import {Profile} from 'model/profile.model';

export type LoginWithEmailArgs = {
    email: string
    password: string
}

export type LoginWithPersistenceArgs = {
    token?: string
    profile?: Profile
}


export type SignUpWithEmailArgs = {
    email: string
    password: string
}

export type LoginWithEmailResponse = {
    token: string,
    profile: Profile
}
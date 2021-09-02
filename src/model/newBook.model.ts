import {BookSharePosition} from "./position";

export interface NewBookModel {
    googleBookId: string | null
    isbn: string | null
    title: string
    authors: string[]
    description: string
    price: number
    condition: BookConditions
    position: BookSharePosition
    phoneNumber: PhoneNumber
    mainImage: string | null
    images?: string[]
}

export interface PhoneNumber {
    countryCode: string
    number: string
}

export const enum BookConditions {
    NEW = "NEW",
    AS_NEW = "AS_NEW",
    USED = "USED",
    RUINED = "RUINED"
}

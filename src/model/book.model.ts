import {BookSharePosition} from "./bookSharePosition.model";
import {Post} from 'model/post.model';

export interface Book {
    googleBookId: string | null
    isbn: string | null
    title: string
    authors: string[]
    description: string
    price: number
    condition: BookCondition
    position: BookSharePosition | null
    phoneNumber: string
    sold:boolean
    sellingPost?: Post
}

export const enum BookCondition {
    NEW = "NEW",
    AS_NEW = "AS_NEW",
    USED = "USED",
    RUINED = "RUINED",
}

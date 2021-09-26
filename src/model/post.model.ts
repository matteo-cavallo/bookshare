import {Book} from './book.model';
import {BookSharePosition} from "./bookSharePosition.model";
import {Profile} from 'model/profile.model';

export interface Post {
    // Id
    uid?: string
    owner?: Profile

    // Contents
    title: string
    description: string
    price: number
    position: BookSharePosition | null
    phoneNumber: string | null
    mainImage: string | null
    images?: string[]
    books: Book[]

    // Status
    active: boolean
    creationDate?: Date

}

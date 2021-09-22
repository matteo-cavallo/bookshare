
// Listed Book
import { PhoneNumber} from './book.model';
import {BookSharePosition} from "./bookSharePosition.model";

export interface Post {
    // Id
    uid?: string
    owner: string
    googleBookId: string | null

    // Contents
    title: string
    description: string
    price: number
    condition: string
    position: BookSharePosition | null
    phoneNumber: PhoneNumber | null
    mainImage: string | null
    images?: string[]

    // Status
    active: boolean
    sold: boolean

    // Metadata
    creationDate: string
    lastEdit: string
    saves?: number
}

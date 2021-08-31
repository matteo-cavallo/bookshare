
// Listed Book
import {BookPosition, PhoneNumber} from './newBook.model';

export interface BookPost {
    // Id
    uid?: string
    owner: string
    googleBookId: string | null

    // Contents
    title: string
    description: string
    price: number
    condition: string
    position: BookPosition | null
    phoneNumber: PhoneNumber | null
    mainImage: string | null
    images?: string[]

    // Status
    active: boolean
    sold: boolean

    // Metadata
    creationDate: string
    lastEdit: string
}

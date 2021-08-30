
// Listed Book
import {PhoneNumber} from './newBook.model';

export interface BookPost {
    uid?: string
    userId?: string

    title?: string
    description: string
    price: number
    condition: string
    position: Position | null
    phoneNumber: PhoneNumber | null

    googleBookId: string | null

    active: boolean
    creationDate: Date
    lastEdit: Date
}

interface Position {
    city?: string
    latitude: number
    longitude: number
}

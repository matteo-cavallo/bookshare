
// Listed Book
import {PhoneNumber} from './newBook.model';

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
    position: Position | null
    phoneNumber: PhoneNumber | null

    // Status
    active: boolean
    sold: boolean

    // Metadata
    creationDate: string
    lastEdit: string
}

interface Position {
    city?: string
    latitude: number
    longitude: number
}

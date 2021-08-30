
// Listed Book
import {PhoneNumber} from './newBook.model';

export interface BookPost {
    // Id
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
    creationDate: Date
    lastEdit: Date
}

interface Position {
    city?: string
    latitude: number
    longitude: number
}


// Listed Book
export interface BookPost {
    uid?: string
    userId?: string

    title: string
    description: string
    price: number
    condition: string
    position?: Position
    phone: string

    bookId: string | null

    active: boolean
    creationDate?: Date
    lastEdit?: Date
}

interface Position {
    city?: string
    latitude: number
    longitude: number
}

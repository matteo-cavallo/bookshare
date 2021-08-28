
// Listed Book
export interface BookPost {
    userId: string;
    bookId: string;

    description: string;
    price: number;
    condition: string;
    position: Position;
    phone: string;
}

interface Position {
    city: string;
    latitude: number;
    longitude: number;
}

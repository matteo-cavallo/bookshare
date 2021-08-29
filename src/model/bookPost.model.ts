
// Listed Book
import firebase from 'firebase';
import FieldValue = firebase.firestore.FieldValue;

export interface BookPost {
    uid?: string;
    userId: string;
    bookId: string;

    description: string;
    price: number;
    condition: string;
    position: Position;
    phone: string;
    creationDate?: Date;
    lastEdit?: Date;
}

interface Position {
    city: string;
    latitude: number;
    longitude: number;
}

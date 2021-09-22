import {BookSharePosition} from "./bookSharePosition.model";
import {PhoneNumber} from "./book.model";

export interface User {
    uid?: string;
    email: string;

    firstName?: string;
    lastName?: string;
    birthday?: string;
    phoneNumber?: PhoneNumber;
    defaultPosition?: BookSharePosition


    postedBooks: string[]
    savedPosts?: string[]
}

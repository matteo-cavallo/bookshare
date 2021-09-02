import {BookSharePosition} from "./position";
import {PhoneNumber} from "./newBook.model";

export interface UserModel {
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

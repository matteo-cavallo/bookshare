import {BookSharePosition} from "./bookSharePosition.model";

export interface Profile {
    id?: string;
    email: string;

    firstName?: string;
    lastName?: string;
    birthday?: string;
    phoneNumber?: string;
    defaultPosition?: BookSharePosition;
    active: boolean;

    posts: []
    books: []
    savedPosts?: []
}

import {BookSharePosition} from "./position";

export interface UserModel {
    uid?: string;
    email: string;

    firstName?: string;
    lastName?: string;
    birthday?: string;

    defaultPosition?: BookSharePosition

    postedBooks: string[]
}

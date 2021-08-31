
export interface UserModel {
    uid?: string;
    email: string;

    firstName?: string;
    lastName?: string;
    birthday?: string;

    postedBooks: string[]
}

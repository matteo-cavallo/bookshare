
export interface UserModel {
    uid: string;
    email: string;

    firstName?: string;
    lastName?: string;

    listedBooks: string[]
}

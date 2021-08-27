import {BookModel} from "./book.model";
import {UserModel} from "./user.model";

//TODO: da controllare
export interface BookPostModel {
    user: UserModel,
    book: BookModel,
    status: string,
    price: string;
    position: string;
    phone: string;
}

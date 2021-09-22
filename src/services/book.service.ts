import {Book} from 'model/book.model';

const fetchBook = async () =>{
    return new Promise<Book>((resolve, reject) =>{
        const timer = setTimeout(()=>{

        },1000)
        resolve({} as Book)
    })
}

const saveBook = async () =>{
    return new Promise<Book>((resolve, reject) =>{
        const timer = setTimeout(()=>{

        },1000)
        resolve({} as Book)
    })
}



export const bookService = {
    fetchBook,
    saveBook
}

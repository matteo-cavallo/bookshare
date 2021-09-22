import {User} from 'model/user.model';

const loginWithEmail = async () =>{
    return new Promise<User>((resolve, reject) =>{
        const timer = setTimeout(()=>{

        },1000)
        resolve({} as User)
    })
}


const signUpWithEmailAndPassword = async () =>{
    return new Promise<User>((resolve, reject) =>{
        const timer = setTimeout(()=>{

        },1000)
        resolve({} as User)
    })
}

export const authService = {
    loginWithEmail,
    signUpWithEmailAndPassword
}
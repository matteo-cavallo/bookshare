import {User} from 'model/user.model';

const fetchUser = async () =>{
    return new Promise<User>((resolve, reject) =>{
        const timer = setTimeout(()=>{

        },1000)
        resolve({} as User)
    })
}



export const userService = {
    fetchUser
}

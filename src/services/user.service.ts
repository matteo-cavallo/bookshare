import {Profile} from 'model/profile.model';

const fetchUser = async () =>{
    return new Promise<Profile>((resolve, reject) =>{
        const timer = setTimeout(()=>{

        },1000)
        resolve({} as Profile)
    })
}



export const userService = {
    fetchUser
}

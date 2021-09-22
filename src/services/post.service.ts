import {Post} from 'model/post.model';

const fetchPost = async () =>{
    return new Promise<Post>((resolve, reject) =>{
        const timer = setTimeout(()=>{

        },1000)
        resolve({} as Post)
    })
}

const fetchFeed = async () =>{
    return new Promise<Post[]>((resolve, reject) =>{
        const timer = setTimeout(()=>{

        },1000)
        resolve({} as Post[])
    })
}

const savePost = async () =>{
    return new Promise((resolve, reject) =>{
        const timer = setTimeout(()=>{

        },1000)
        resolve({})
    })
}

export const postService = {
    fetchPost,
    savePost,
    fetchFeed
}

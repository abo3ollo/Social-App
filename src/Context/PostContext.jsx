import axios from "axios";
import { createContext } from "react";

export let PostContext = createContext()

 export function PostContextProvider(props) {

    function getPosts() {
        axios.get("https://linked-posts.routemisr.com/posts?limit=50" , {
            headers :{
                token : localStorage.getItem("userToken")
            }
        }).then((res)=>{
            console.log(res.data.posts);
            
        }).catch((err)=>{
            console.log(err);
            
        })
        
    }


    return <PostContext.Provider value={{getPosts}}>
        {props.children}
    </PostContext.Provider>
    
}
import {  createContext, useState } from 'react'


export let UserContext = createContext()


export function UserContextProvider({ children }) {

    let [userLogin, setUserLogin] = useState(localStorage.getItem("userToken"))


    return <UserContext.Provider value={{ userLogin, setUserLogin }}>
        {children}
    </UserContext.Provider>


}

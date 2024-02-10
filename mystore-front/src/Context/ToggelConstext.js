import { createContext, useState } from "react";

export const toggel=createContext(false)

export default function ToggelProvider({children}){
    let [isToggled, setIsToggle] = useState(false)
    let ToggelUpdate=()=>{setIsToggle(prev=>!prev)}
    return (
        <toggel.Provider value={{ isToggled ,ToggelUpdate}}>
            {children}
        </toggel.Provider>
    )
}
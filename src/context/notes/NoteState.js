import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState =  (props) =>{

    const s1 = {
        "name" : "Bimal",
        "class" : "1b"
    }
    const [state, setState] = useState(s1);
    const update = () =>{
        setTimeout(() =>{
            setState({
                "name" : "Rahul",
                "class" : "1c"             
            })
        },2000)
    }
    return (
        <NoteContext.Provider value={{state, update}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
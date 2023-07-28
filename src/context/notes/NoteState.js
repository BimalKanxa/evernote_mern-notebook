import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000"

  const notesInitial = []

  const [notes, setNotes] = useState(notesInitial)

//fetch all notes

const getNotes = async() => {

  const response = await fetch(`${host}/api/notes/fetchallnotes`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRiY2NkNjA1NzBhZDM4ZmM5MzMzNTdjIn0sImlhdCI6MTY5MDEwMjYzNX0.zMuancIkc9HXEmFxdEeflRIXmacTfRhhSvKzIicv6aM"
    },
  });
  // const json = response.json();
  const json = await response.json()
    console.log(json)
    setNotes(json)
}


//fetch all notes ends

  //Add a Note
  const addNote = async(title, description, tags) => {

    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRiY2NkNjA1NzBhZDM4ZmM5MzMzNTdjIn0sImlhdCI6MTY5MDEwMjYzNX0.zMuancIkc9HXEmFxdEeflRIXmacTfRhhSvKzIicv6aM"
      },
      body: JSON.stringify({title, description, tags})
    });
    // const json = response.json();

    console.log("adding a new note")
    const note = {
      "_id": "64b45e41450026c19707a9412d73",
      "user": "64bccd60570ad38fc933357c",
      "title": title,
      "description": description,
      "tags": tags,
      "date": "2023-07-24T09:28:48.131Z",
      "__v": 0
    };
    setNotes(notes.concat(note))
  }

  //Delete a Note
  const deleteNote = async(id) => {
    // console.log("deleting the note" + id)
    //API Call 
    
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRiY2NkNjA1NzBhZDM4ZmM5MzMzNTdjIn0sImlhdCI6MTY5MDEwMjYzNX0.zMuancIkc9HXEmFxdEeflRIXmacTfRhhSvKzIicv6aM"
      },
     
    });
    const json = response.json(); 
    console.log(json)    //call ends
     
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)

  }
  //Edit a Note
  const editNote = async (id, title, description, tags) => {
    //API call

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRiY2NkNjA1NzBhZDM4ZmM5MzMzNTdjIn0sImlhdCI6MTY5MDEwMjYzNX0.zMuancIkc9HXEmFxdEeflRIXmacTfRhhSvKzIicv6aM"
      },
      body: JSON.stringify({title, description,tags})
    });
    const json = response.json();

    // logic to edit in client side
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tags = tags;
      }
    }
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;
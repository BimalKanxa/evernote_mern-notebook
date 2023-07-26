import React from 'react'
import { useContext } from 'react'
import noteContext from '../context/notes/NoteContext'
import { useEffect } from 'react'
const About = () => {
  const a = useContext(noteContext)
  useEffect(() => {
    a.update()
    //eslint-disable-next-line
  },[])
  return (
    <div>This is About {a.state.name}</div>
  )
}

export default About
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
//Can treat our svg asset as a component! whoa!
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'
import { Link } from 'react-router-dom'


const NotePage = ({ match }) => {
  
  //let noteId = match.params.id <-- previously from older version
  const { id, favorite } = useParams()
  //value null until a value is added in
  let [note, setNote] = useState(null)

  useEffect(() => {
    getNote()
  }, [id])

  //fetching the specific note id of the page
  let getNote = async () => {
    //return in the case making a new note
      if (id === 'new') return

      let response = await fetch(`/api/notes/${id}`)
      let data = await response.json()
      setNote(data)
  }

  let createNote = async () => {
    fetch(`/api/notes/create`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    })    
  }

  //Update notes (specifically after hitting the back arrow)
  let updateNote = async () => {
    fetch(`/api/notes/${id}/update`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    })    
  }

  let deleteNote = async () => {
    fetch(`/api/notes/${id}/delete`, {
      method: "DELETE",
      'headers': {
        'Content-Type': 'application/json'
      }
    })
  }

  let handleSubmit = () => {
    //Check if there is nothing inside the note
    if(id !== 'new' && note.body === '') {
      deleteNote()
    } else if (id !== 'new') {
      updateNote()
    } else if (id === 'new' && note.body !== null) {
      createNote()
    }
  }

  let handleChange = (value) => {
      setNote(note => ({ ...note, 'body': value}))
      console.log('Handle Change:', note)
  }

  let toggleFavorite = (note) => {
    let fav = note.favorite
    console.log(note.favorite)
  }

  //allow for entry into textarea
  //My svg react component, linking back to the home "/" page
  //update the state on every change send call to back end to update
  return (
    <div className="note">
        <div className="note-header">
            <h3>
              <Link to='/'>  
                <ArrowLeft onClick={handleSubmit}/>
              </Link>
            </h3>
            {id !== 'new' ? (
              <Link to='/'>
               <button onClick={deleteNote}>Delete</button>
              </Link>
            ) : (
              <Link to='/'>
                <button onClick={handleSubmit}>Save</button>
              </Link>
            )}
            <button onClick={toggleFavorite}>&#x2764;</button>
            
        </div>
        <textarea onChange={(e) => { handleChange(e.target.value) }} value={note?.body}></textarea>
    </div>
  )
}

export default NotePage
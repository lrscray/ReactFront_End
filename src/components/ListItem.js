import React from 'react'
//importing link to from react-router-dom to create links. 
//Similar to a tag in plain javascript
import { Link } from 'react-router-dom'
import { ReactComponent as FaveIcon } from  '../assets/check.svg'

let getTime = (note) => {
  return new Date(note.update).toLocaleDateString()
}

let getTitle = (note) => {
  let title = note.body.split('\n')[0]
  if (title.length > 45) {
    return title.slice(0, 45)
  }
  return title
}

let getContent = (note) => {
  let title = getTitle(note)
  let content = note.body.replaceAll('\n', ' ')
  content = content.replaceAll(title, '')

  if (content.length > 45) {
    return content.slice(0, 45) + ' . . .'
  } else {
    return content
  }
}

//These links do not neet onClick event handling
const ListItem = ({ note }) => {
  return (
    <Link to={`/note/${note.id}`}>
      <div className = "notes-list-item" >
        {note.favorite === true ? (<h3>{getTitle(note)} &#x2764;</h3>
        ) : (
          <h3>{getTitle(note)}</h3>
        )}
        <p><span>{getTime(note)}</span>{getContent(note)}</p>
      </div>
        
    </Link>
  )
}

export default ListItem
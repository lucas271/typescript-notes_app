import { Note } from '../../types/note'
import './styles/style.scss'
import React, { useState, FormEvent } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { AppThunkDispatch, RootState } from '../../services/store'
import { deleteNoteThunk, editNoteThunk, handleDone, NotesType } from '../../services/features/notes/notesSlice'
import NoteForm from '../noteForm/NoteForm'
import { Button, Card, CardContent, CardHeader, Checkbox, CircularProgress } from '@mui/material'
import { Delete, Edit } from '@mui/icons-material'

interface Props {
  note: Note;
  setShowError: React.Dispatch<React.SetStateAction<boolean>>
}

const SingleNote: React.FC<Props> = ({ note, setShowError }) => {
  const [isForm, setIsForm] = useState<boolean>(false)
  const noteSelector = useSelector<RootState, NotesType>(state => state.notesSlice)
  const date = new Date(note.date)
  const dispatch = useDispatch<AppThunkDispatch>()

  const createDate = (): string => {
    if (!date) return ''
    return (`
      ${
        date.getDate() < 10 ? '0' : ''
      }${date.getDate()}/${
  date.getMonth() < 10 ? '0' : ''
  }${date.getMonth()}/${date.getFullYear()},
      ${
        date.getHours() < 10 ? '0' : ''
      }${date.getHours()}H 
      ${
        date.getMinutes() < 10 ? '0' : ''
      }${date.getMinutes()}M 
  `)
  }

  const handleDelete = ():void => {
    dispatch(deleteNoteThunk({ noteId: note._id, title: note.title, text: note.text }))
    setShowError(true)
  }
  const handleForm = (e: FormEvent<HTMLFormElement>, title: string, text: string, setTitle: React.Dispatch<React.SetStateAction<string>>, setText:React.Dispatch<React.SetStateAction<string>>):void => {
    e.preventDefault()
    if (!title) return alert('field TITLE is EMPTY')
    if (!text) return alert('field TEXT is EMPTY')

    dispatch(editNoteThunk({ noteId: note._id, title, text }))
    setTitle('')
    setText('')
    setShowError(true)
    setIsForm(!isForm)
  }
  const handleIsDoneChange = (): void => {
    dispatch(handleDone({ noteId: note._id }))
    setShowError(true)
  }
  return (
    <>
      <Card className={`note ${isForm && 'new_note'}`}>

        {noteSelector.loading && noteSelector.notes[0]?._id === note?._id
          ? <CircularProgress />
          : !isForm
              ? <>
                <CardHeader action={
                  <div className="note_header">
                    <Button onClick={() => setIsForm(!isForm)}>
                      <Edit />
                    </Button>
                    <Button onClick={handleDelete}>
                      <Delete />
                    </Button>
                  </div>
                } subheader={createDate()}/>
                <CardContent className="note_details">
                  <h2>{note.title}</h2>
                  <p>{note.text}</p>
                </CardContent>
                <footer className='card_footer'>
                  <label htmlFor='is_done'>Done?</label>
                  <Checkbox id='is_done' onChange={handleIsDoneChange} color={note.done ? 'success' : 'default'} checked={note.done}/>
                </footer>
              </>
              : <NoteForm handleForm={handleForm} isForm={isForm} setIsForm={setIsForm}/>
          }

      </Card>
    </>
  )
}

export default SingleNote

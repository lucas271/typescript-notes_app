import { AiOutlineSearch } from 'react-icons/ai'

import './styles/style.scss'
import React, { FormEvent, useEffect, useState } from 'react'
import { Note } from '../../models/note'
import SingleNote from '../../components/singleNote/SingleNote'

import { useDispatch, useSelector } from 'react-redux'
import { AppThunkDispatch, RootState } from '../../services/store'
import { createNoteThunk, NotesType } from '../../services/features/notes/notesSlice'
import NoteForm from '../../components/noteForm/NoteForm'

const HomePage = () => {
  const [searchNote, setSearchNote] = useState<string>('')
  const [done, setDone] = useState<boolean>(false)
  const [isForm, setIsForm] = useState<boolean>(false)
  const [showError, setShowError] = useState<boolean>(false)

  useEffect(() => {
    console.log('a')
    setTimeout(() => {
      setShowError(false)
    }, 10000)
  }, [showError])

  const dispatch = useDispatch<AppThunkDispatch>()

  // eslint-disable-next-line no-unused-vars
  const noteSelector = useSelector<RootState, NotesType>(state => state.notesSlice)

  const user = JSON.parse(String(localStorage.getItem('user')))
  const Notes = user?.notes

  if (!user) location.replace('/userAuth')

  const handleForm = (e: FormEvent<HTMLFormElement>, title: string, text: string, setTitle: React.Dispatch<React.SetStateAction<string>>, setText:React.Dispatch<React.SetStateAction<string>>): void => {
    e.preventDefault()

    if (!title) return alert('field TITLE is EMPTY')
    if (!text) return alert('field TEXT is EMPTY')

    dispatch(createNoteThunk({ title, text }))
    setTitle('')
    setText('')
    setIsForm(!isForm)
    setShowError(true)
  }

  const notesFilter = (notes: Note[]): Note[] => {
    console.log(notes)
    return notes.filter((note) => note.done === done).filter((note) =>note.title.includes(searchNote) || note.text.includes(searchNote))
  }

  return (
    <>
      {noteSelector?.errors.length > 0 && showError
        ? <div className='error_container'><span className='error'>{noteSelector.errors.map((error) => <p>{error}</p>)}</span></div>
        : ''}
      <div className="home_container">
        <div className="search_bar">
          <input
            type="text"
            placeholder="Search Note"
            onChange={(e) => setSearchNote(e.target.value)}
            value={searchNote}
          />
          <AiOutlineSearch className="search_icon" />
        </div>
        <div className="filter_by_type">
          <label htmlFor="done">Done</label>
          <input
            type="checkbox"
            id="done"
            checked={done}
            onChange={() => setDone(!done)}
          />
        </div>
        <main className="notes_container">
          <div className='note new_note'>
            {!isForm
              ? <>
              <button onClick={() => setIsForm(!isForm)}>
                +
              </button>
            </>
              : <NoteForm handleForm={handleForm} isForm={isForm} setIsForm={setIsForm}/>
            }
          </div>
          {Notes && notesFilter(Notes).map((note, index) => {
            return <SingleNote note={note} key={note._id || index} setShowError={setShowError}/>
          })}
        </main>
      </div>
    </>
  )
}

export default HomePage

import React, { FormEvent, useState } from 'react'
import './styles/style.scss'
import { Button, TextField } from '@mui/material'
import { ArrowBack } from '@mui/icons-material'

interface NoteFormProps {
  handleForm: (
    e: FormEvent<HTMLFormElement>,
    title: string, text: string,
    setTitle: React.Dispatch<React.SetStateAction<string>>,
    setText:React.Dispatch<React.SetStateAction<string>>)
    => void,
  isForm:boolean,
  setIsForm: React.Dispatch<React.SetStateAction<boolean>>,
  isCreate?: boolean
}
const NoteForm = ({ handleForm, isForm, setIsForm, isCreate = false }: NoteFormProps) => {
  const [title, setTitle] = useState<string>('')
  const [text, setText] = useState<string>('')

  return <>
      <Button className='back_btn' onClick={() => setIsForm(!isForm)}><ArrowBack/></Button>
      <form action="" className={`new_note_form ${isCreate && 'different_note'}`} onSubmit={(e) => handleForm(e, title, text, setTitle, setText)}>
        <h3>{isCreate ? 'create Your item here' : 'Edit your item here'}</h3>
        <div className='note_input_container'>
          <label htmlFor="title">Title</label>
          <TextField type="text" id='title' onChange={(e) => setTitle(e.target.value)} value={title}/>
        </div>
        <div className='note_input_container'>
          <label htmlFor="content">Text</label>
          <TextField type="text" id='content' onChange={(e) => setText(e.target.value)} value={text}/>
        </div>
        <Button className='send' variant="contained">Send</Button>
      </form>

    </>
}

export default NoteForm

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
  setIsForm: React.Dispatch<React.SetStateAction<boolean>>
}
const NoteForm = ({ handleForm, isForm, setIsForm }: NoteFormProps) => {
  const [title, setTitle] = useState<string>('')
  const [text, setText] = useState<string>('')

  return <>
      <Button className='back_btn' onClick={() => setIsForm(!isForm)}><ArrowBack/></Button>
      <form action="" className='new_note_form' onSubmit={(e) => handleForm(e, title, text, setTitle, setText)}>
        <label htmlFor="title">Title</label>
        <TextField type="text" id='title' onChange={(e) => setTitle(e.target.value)} value={title}/>
        <label htmlFor="content">Text</label>
        <TextField type="text" id='content' onChange={(e) => setText(e.target.value)} value={text}/>
        <button className='send'>Send</button>
      </form>
    </>
}

export default NoteForm

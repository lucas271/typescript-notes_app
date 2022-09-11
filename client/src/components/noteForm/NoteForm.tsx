import React, { FormEvent, useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'
import './styles/style.scss'

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
      <span className='back_btn' onClick={() => setIsForm(!isForm)}><BiArrowBack/></span>
      <form action="" className='new_note_form' onSubmit={(e) => handleForm(e, title, text, setTitle, setText)}>
        <label htmlFor="">Title</label>
        <input type="text" onChange={(e) => setTitle(e.target.value)} value={title}/>
        <label htmlFor="">Text</label>
        <input type="text" onChange={(e) => setText(e.target.value)} value={text}/>
        <button className='send'>Send</button>
      </form>
    </>
}

export default NoteForm

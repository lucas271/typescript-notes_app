import { Note } from "../../models/note"
import './styles/style.scss'
import {AiOutlineEdit} from 'react-icons/ai'
import {BsTrash} from 'react-icons/bs'

interface Props{
    note: Note,
    notes: Note[] 
}

const SingleNote: React.FC<Props> = ({notes, note}) => {
    return <>
        <div className='note'>
            <header className="note_header">
                <div className="note_icons">
                    <span><AiOutlineEdit/></span>
                    <span><BsTrash/></span>
                </div>
                <span className="date">{`
                    ${note.date.getDate() < 10 ?'0': ''}${note.date.getDate()}/${note.date.getMonth() < 10 ? '0': ''}${note.date.getMonth()}/${note.date.getFullYear()},
                    ${note.date.getHours() < 10 ? '0' : ''}${note.date.getHours()}H 
                    ${note.date.getMinutes() < 10 ? '0' : ''}${note.date.getMinutes()}M 
                `}
                </span>
            </header>
            <article className="note_details">
                <h2>{note.title}</h2>
                <p>{note.text}</p>
            </article>

        </div>
    </> 
}

export default SingleNote
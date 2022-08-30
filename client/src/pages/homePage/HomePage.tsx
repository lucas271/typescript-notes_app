import {AiOutlineSearch} from 'react-icons/ai'

import './styles/style.scss'
import {Note} from '../../models/note'
import SingleNote from '../../components/singleNote/SingleNote'
import { useState } from 'react'

const Notes: Note[]= [
    {
        title: 'yatar aviões ',
        text: 'matar aviões as 2 da manha com uma faca de caça',
        date: new Date(),
        done: true,
        id: 'odkoaskdbzsoa'
    },
    {
        title: 'matar aviões ',
        text: 'matar aviões as 2 da manha com uma faca de caça',
        date: new Date(),
        done: false,
        id: 'odsadkoakghcvbskdoa'

    },
    {
        title: 'matar aviões ',
        text: 'matar aviões as 2 da manha com uma faca de caça',
        date: new Date(),
        done: false,
        id: 'odkoasdac321zskdoa'
    },
    {
        title: 'matar aviões ',
        text: 'matar aviões as 2 da manha com uma faca de caça',
        date: new Date(),
        done: true,
        id: 'odkosda21asfakdoa'
    },
    {
        title: 'matar aviões ',
        text: 'matar aviões as 2 da manha com uma faca de caça',
        date: new Date(),
        done: false,
        id: 'odkoasdaczsdaskdoa'
    },
    {
        title: 'matar aviões ',
        text: 'matar aviões as 2 da manha com uma faca de caça',
        date: new Date(),
        done: true,
        id: 'odzxckosda21askdoa'
    },
    {
        title: 'matar aviões ',
        text: 'matar aviões as 2 da manha com uma faca de caça',
        date: new Date(),
        done: false,
        id: 'odko654asdaczskdoa'
    },
]

const HomePage: React.FC = () => {
    const [searchNote, setSearchNote] = useState<string>('')
    const [done, setDone] = useState<boolean>(false)

    const notesFilter = (notes: Note[]): Note[] => {
        return notes.filter(note => note.done === done)
        .filter(note => note.title.includes(searchNote) || note.text.includes(searchNote))
    }

    return <>
        <div className='home_container'>
            <div className='search_bar'>
                <input type="text" placeholder='Search Note' onChange={(e) => setSearchNote(e.target.value)} value={searchNote}/>
                <AiOutlineSearch className='search_icon'/>
            </div>
            <div className='filter_by_type'>
                <label htmlFor="done">Done</label>
                <input type="checkbox" id='done' checked={done} onChange={(() => setDone(!done))}/>
            </div>
            <main className='notes_container'>
                {notesFilter(Notes).map(note => {
                    return <SingleNote notes={Notes} note={note} key={note.id}/>
                })}
            </main>    
        </div>    
    </>
}

export default HomePage
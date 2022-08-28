import {AiOutlineSearch} from 'react-icons/ai'

import './styles/style.scss'
import {Note} from '../../models/note'
import SingleNote from '../../components/singleNote/SingleNote'

const Notes: Note[]= [
    {
        title: 'matar aviões ',
        text: 'matar aviões as 2 da manha com uma faca de caça',
        date: new Date(),
        color: 'yellow',
        done: true
    },
    {
        title: 'matar aviões ',
        text: 'matar aviões as 2 da manha com uma faca de caça',
        date: new Date(),
        color: 'yellow',
        done: false

    },
    {
        title: 'matar aviões ',
        text: 'matar aviões as 2 da manha com uma faca de caça',
        date: new Date(),
        color: 'yellow',
        done: false
    },
    {
        title: 'matar aviões ',
        text: 'matar aviões as 2 da manha com uma faca de caça',
        date: new Date(),
        color: 'yellow',
        done: true
    }
]

const HomePage: React.FC = () => {
    return <>
        <div className='home_container'>
            <div className='search_bar'>
                <input type="text" placeholder='Search Note'/>
                <AiOutlineSearch className='search_icon'/>
            </div>
            <main className='notes_container'>
                {Notes.map(note => {
                    return <SingleNote notes={Notes} note={note}/>
                })}
            </main>    
        </div>    
    </>
}

export default HomePage
import {BiLogOut, BiLogIn} from 'react-icons/bi'
import './styles/style.scss'
import { Link } from 'react-router-dom'

const Navbar: React.FC = () => {
    const user: boolean = true

    return <>

        <header className='navbar_container'>
            <nav className='navbar'>
                <h1><Link to='/'>Notes App</Link> </h1>
                {
                user 
                ? 
                <BiLogOut className='icon'> <Link to='/'></Link> </BiLogOut> 
                : 
                <BiLogIn className='icon'><Link to='/userAuth'/></BiLogIn>
                }
            </nav>
        </header>

    </>
}

export default Navbar
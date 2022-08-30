import { Link, useLocation } from "react-router-dom"
import {CgSmileSad} from 'react-icons/cg'
import './styles/style.scss'

const Page404: React.FC = () => {

    const location = useLocation()
    console.log(location)
    return <>
        <article className="page404_container">
            <CgSmileSad className="icon"/>
            <h2>404 error</h2>
            <p>It was not possible to find the path: {location.pathname}</p>
            <Link to='/' className="go_home">Go back to home</Link>
        </article>
    </>
}

export default Page404
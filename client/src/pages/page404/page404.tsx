import { Link, useLocation } from 'react-router-dom'
import { CgSmileSad } from 'react-icons/cg'
import './styles/style.scss'
import { Button, Container, Paper } from '@mui/material'

const Page404 = () => {
  const location = useLocation()
  return (
    <Container className='page404_container'>

      <Paper elevation={3} className='content'>
        <article>
          <CgSmileSad className="icon" />
          <h2>404 error</h2>
          <p>It was not possible to find the path: {location.pathname}</p>
        </article>
        <Button variant='contained'>
          <Link to="/" className="go_home">
            Go back to home
          </Link>
        </Button>
      </Paper>
    </Container>
  )
}

export default Page404

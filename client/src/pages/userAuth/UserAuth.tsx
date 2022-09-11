import { motion } from 'framer-motion'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import LoginComponent from '../../components/LoginComponent'
import RegisterComponent from '../../components/RegisterComponent'
import { UserType } from '../../services/features/user/userSlicer'
import { RootState } from '../../services/store'
import './styles/style.scss'

const UserAuth = () => {
  const user = useSelector<RootState, UserType>(state => state.userSlice)
  const [isLogin, setIsLogin] = useState<boolean>(true)
  const isUser = localStorage.getItem('user')

  const handleIsLoginChange = (): void => {
    setIsLogin(!isLogin)
  }

  const validation = (username:string, password:string, repeatPassword?:string): string[] => {
    if (!username || !password) return ['Empty fields']

    if (password.length > 20) return ['password cannot be longer than 20 chars']
    if (password.length < 6) return ['password cannot be smaller than 20 chars']

    // validation for register
    if (typeof repeatPassword !== 'string') return []
    if (repeatPassword !== password) return ['passwords must match']
    return []
  }

  if (isUser) location.replace('/')

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 1 } }}
      exit={{ opacity: 0 }}
      className="auth_container"
    >

      {isLogin
        ? <LoginComponent user={user} validation={validation} handleIsLoginChange={handleIsLoginChange}/>
        : <RegisterComponent user={user} validation={validation} handleIsLoginChange={handleIsLoginChange}/>
      }
    </motion.div>
  )
}

export default UserAuth

import React, { FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUserThunk, resetErrors, UserType } from '../services/features/user/userSlicer'
import { AppThunkDispatch } from '../services/store'
import { CircularProgress } from '@mui/material'

interface Props{
  user: UserType,
  validation: (username:string, password: string) => string[],
  handleIsLoginChange: () => void
}

// styles done in page/UserAuth due to commum styles with LoginComponent

const LoginComponent = ({ user, validation, handleIsLoginChange }: Props) => {
  const [password, setPassword] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [errors, setErrors] = useState<string[]>([])

  const dispatch = useDispatch<AppThunkDispatch>()

  const handleLoginForm = (e: FormEvent<HTMLFormElement>):void => {
    setErrors([])
    resetErrors()
    e.preventDefault()
    const errorsArray = validation(username, password)
    if (errorsArray.length > 0) return setErrors(errorsArray)
    dispatch(loginUserThunk({ username, password }))
  }

  return <div className="auth_form_container auth_form_container_left">
    {(user?.errors.length > 0 || errors.length > 0) && <div className='errors_container'>
      {user?.errors && user.errors.map(error => {
        return <span key={error} className='error'>{error}</span>
      })}
      {errors && errors.map(error => {
        return <span key={error} className='error'>{error}</span>
      })}
    </div>}

    {!user.loading
      ? <>
        <h2>Logar</h2>

        <form action="" className="auth_form" onSubmit={(e) => handleLoginForm(e)}>
          <div>
            <label htmlFor="">Usuário:</label>
            <input
              className="input_field"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>
          <div>
            <label htmlFor="">Senha:</label>
            <input
              className="input_field"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <button className="form_btn">Entrar</button>
        </form>
        <p className="form_change">
          Não tem uma conta? <span onClick={handleIsLoginChange}>registre!</span>
        </p>
    </>
      : <div style={{ margin: 'auto' }}><CircularProgress size={110}/></div>
    }
  </div>
}

export default LoginComponent

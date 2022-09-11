import React, { FormEvent, useState } from 'react'
import { createUserThunk, UserType } from '../services/features/user/userSlicer'
import { AppThunkDispatch } from '../services/store'
import { useDispatch } from 'react-redux'

interface Props{
  user: UserType,
  validation: (username:string, password: string, repeatPassword: string) => string[],
  handleIsLoginChange: () => void
}

// styles done in page/UserAuth due to commum styles with LoginComponent

const RegisterComponent = ({ user, validation, handleIsLoginChange }: Props) => {
  const [password, setPassword] = useState<string>('')
  const [repeatPassword, setRepeatPassword] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [errors, setErrors] = useState<string[]>([])
  const dispatch = useDispatch<AppThunkDispatch>()

  const handleRegisterForm = (e: FormEvent<HTMLFormElement>):void => {
    const errorsArray = validation(username, password, repeatPassword)
    e.preventDefault()
    if (errorsArray.length > 0) return setErrors(errorsArray)
    dispatch(createUserThunk({ username, password, repeatPassword }))
  }

  console.log(user)
  return <div className="auth_form_container auth_form_container_right">

    {(user?.errors.length > 0 || errors.length > 0) && <div className='errors_container'>
      {user?.errors && user.errors.map(error => {
        return <span key={error} className='error'>{error}</span>
      })}
      {errors && errors.map(error => {
        return <span key={error} className='error'>{error}</span>
      })}
    </div>}

    {!user?.loading
      ? <>
        <h2>Registrar</h2>

        <form action="" className="auth_form" onSubmit={(e) => handleRegisterForm(e)}>
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
          <div>
            <label htmlFor="">Repetir senha: </label>
            <input
              className="input_field"
              type="password"
              onChange={(e) => setRepeatPassword(e.target.value)}
              value={repeatPassword}
            />
          </div>
          <button className="form_btn">Cadastrar</button>
        </form>
        <p className="form_change">
          Tem uma conta? <span onClick={handleIsLoginChange}>Logue!</span>
        </p>
    </>
      : <h2>loading</h2>
    }
  </div>
}

export default RegisterComponent

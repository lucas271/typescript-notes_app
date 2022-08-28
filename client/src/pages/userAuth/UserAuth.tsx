import { motion } from "framer-motion"
import { useState } from "react"
import { Navigate } from "react-router-dom"
import './styles/style.scss'

const UserAuth = ({user}: {user: boolean}) => {
    const [password, setPassword] = useState<string>('')
    const [repeatPassword, setRepeatPassword] = useState<string>('')
    const [username, setUsername] = useState<string>('')

    const [isLogin, setIsLogin] = useState<boolean>(true)


    const handleIsLoginChange = ():void => {
        setPassword('')
        setRepeatPassword('')
        setUsername('')
        setIsLogin(!isLogin)
    }

    //handle logged user
    if(!user) <Navigate to='/'/>

    return <motion.div 
    initial={{opacity: 0}} 
    animate={{opacity: 1, transition: {duration: 1}}} 
    exit={{opacity: 0}}
    className='auth_container'
    >
        {isLogin ? 
        
        //sign in
        <div className='auth_form_container auth_form_container_left'>
            <h2>Logar</h2>
            <form action="" className="auth_form">
                <div>
                    <label htmlFor="">Usuário:</label>
                    <input className="input_field" type="text" onChange={(e) => setUsername(e.target.value)} value={username}/>
                </div>

                <div>
                    <label htmlFor="">Senha:</label>
                    <input className="input_field" type="text" onChange={(e) => setPassword(e.target.value)} value={password}/>
                </div>
                <button className="form_btn">Entrar</button>
            </form>
            <p>Não tem uma conta? <span onClick={handleIsLoginChange}>Cadastre-se</span></p>
        </div>
        : 

        //sign up
        <div className="auth_form_container auth_form_container_right">
            <h2>Registrar</h2>
            <form action="" className="auth_form">
                <div>
                    <label htmlFor="">Usuário:</label>
                    <input className="input_field" type="text" onChange={(e) => setUsername(e.target.value)} value={username}/>
                </div>
                <div>
                    <label htmlFor="">Senha:</label>
                    <input className="input_field" type="text" onChange={(e) => setPassword(e.target.value)} value={password}/>
                </div>
                <div>
                    <label htmlFor="">Repetir senha: </label>
                    <input className="input_field" type="text" onChange={(e) => setRepeatPassword(e.target.value)} value={repeatPassword}/>
                </div>
                <button className="form_btn">Cadastrar</button>
            </form>
            <p className="form_change">
                Tem uma conta? <span onClick={handleIsLoginChange}>Logue!</span>
            </p>

        </div>
        }
    </motion.div>
}

export default UserAuth
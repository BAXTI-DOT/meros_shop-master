import { useMutation } from "@apollo/client"
import { useEffect, useState } from "react"
import { LOGIN } from './Query'
import { useLogin } from '../Context/Authentication'
import { Redirect } from "react-router"
import { Link } from 'react-router-dom'

const Login = () => {

    const [ disabled, setDisabled ] = useState(true)
    const [ number, setNumber ] = useState("")
    const [ password, setPassword ] = useState("")

    const [ token, setToken ] = useLogin()

    const [ login, { loading, error } ] = useMutation(LOGIN, {
        errorPolicy: "all",
        update: (cache, data) => {
            if(data) setToken(data.data.login)
        }
    })

    useEffect(() => {
        number.length <= 0 || password.length <= 0 ? setDisabled(true) : setDisabled(false)
    }, [number, password])

    const handleSubmit = e => {
        e.preventDefault()

        login({
            variables: {
                number,
                password
            }
        })

    }

    if(token) return <Redirect to="/cabinet" />

    return (
        <form onSubmit={handleSubmit}>
            <div className="form">
                <div className="inputs">
                    <h2>Log in</h2>
                    { loading && <>loading</> }
                    { error && <>{error.message}</> }
                    <label>Number</label>
                    <input onKeyUp={e => setNumber(e.target.value)} type="tel" className="auth-input" placeholder="998(...)"/> 
                    <label>Password</label>
                    <input onKeyUp={e => setPassword(e.target.value)} type="password" className="auth-input" placeholder="Password"/> 
                    <button disabled={disabled} style={ disabled ?  {"transparent": "white"} : { "backgroundColor": "blue"}} type="submit" className="btn btn-dark">Login</button>
                    <button className="btn btn-light">
                        <Link to="/register">
                            Register
                        </Link>  
                    </button>
                </div>
           </div> 
        </form>
    )
}

export default Login

import { useMutation } from "@apollo/client"
import { useEffect, useState } from "react"
import { REGISTER } from './Query'
import { useLogin } from '../Context/Authentication'
import { Redirect } from "react-router"

const Authorization = () => {

    const [ disabled, setDisabled ] = useState(true)
    const [ name, setName ] = useState("")
    const [ number, setNumber ] = useState("")
    const [ password, setPassword ] = useState("")

    const [ token, setToken ] = useLogin()

    const [ register, { loading, error } ] = useMutation(REGISTER, {
        errorPolicy: "all",
        update: (cache, data) => {
            if(data) setToken(data.data.register)
        }
    })

    useEffect(() => {
        name.length <= 0 || number.length <= 0 ? setDisabled(true) : setDisabled(false)
    }, [name, number])

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(name, number)

        register({
			variables: {
				name,
				number,
				password
			}
		})
    }

    if(token) return <Redirect to="/cabinet" />

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="form">
                    <div className="inputs">
                        <h2>Register</h2>
                        { loading && <>loading</> }
                        { error && <>{error.message}</>}
                        <label>Name</label>
                        <input onKeyUp={e => setName(e.target.value)} type="text" className="auth-input" placeholder="Name"/> 
                        <label>Phone number</label>
                        <input onKeyUp={e => setNumber(e.target.value)} type="number" className="auth-input" placeholder="Number"/> 
                        <label>Password</label>
                        <input onKeyUp={e => setPassword(e.target.value)} type="text" className="auth-input" placeholder="Password"/>
                        <button disabled={disabled} type="submit" style={ disabled ? {"backgroundColor": "gery", "marginBottom": "50px", "marginTop": "50px"} : { "backgroundColor": "blue", "marginBottom": "50px", "marginTop": "50px"}} className="btn btn-dark">Register</button> 
                    </div>
                    Есть аккаунт? <a href="/login">Войти</a>
                </div> 
            </form>
        </>
    )
}

export default Authorization

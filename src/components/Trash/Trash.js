import React from 'react'
import TrashOfor from './TrashOfor'
import TrashSide from './TrashSide'
import { useLogin } from '../Context/Authentication'
import { Redirect } from 'react-router'

const Trash = () => {

    const [ token ] = useLogin()

    if(!token) return < Redirect to="/login" />

    return (
        <div className="container">
            <div className="cabinet-line">
                <a href="/">Главная / </a>
                <a href="/korzina">Корзина</a>
            </div>
            <h2 className="h2">Корзина</h2>
            <div className="korzinka">
                <TrashSide/>
                <TrashOfor/>
            </div>
        </div>
    )
}

export default Trash

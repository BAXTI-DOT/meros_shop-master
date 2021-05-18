import React from 'react'
import CabinetInput from './CabinetInput'
import CabinetMap from './CabinetMap'
import CabinetSide from './CabinetSide'
import MyDatas from './MyDatas'
import { useLogin } from '../Context/Authentication'
import { Redirect } from 'react-router'

const Cabinet = () => {

    const [ token ] = useLogin()

    if(!token) return <Redirect to="/login" />

    return (
        <div className="container">
            <div className="cabinet-line">
                <a href="/">Главная / </a>
                <a href="/cabinet">Личный кабинет</a>
            </div>
            <div className="cabinet1">
            <CabinetSide/>
            <div className="cabinet">
            <MyDatas/>
            <div className="cabinet-flex">
            <CabinetInput/>
            <CabinetMap/>
            </div>
            </div>
            </div>
        </div>
    )
}

export default Cabinet

import { useState } from 'react'
import CabinetDash from '../Modals/CabinetDash'
import profile from './img/portrait_black_24dp.svg'
import profileSvg from './img/profile-svg.svg'
import { DATA } from './Query'
import { useQuery } from '@apollo/client'

const CabinetSide = () => {

    const { data, loading, error } = useQuery(DATA)

    const [show, setShow] = useState(false)

    return (
        <>
        { loading && <>loading</> }
        { error && <>error</> }
        {
            data &&
            <div className="cabinet-side">
                <img src={ data.cabinet.image ? data.cabinet.image : profile} height="120" alt=""/>
                <div className="cabinet-side1">
                    <h2>{data.cabinet.name}</h2>
                    <button className="primary-text button-dash" onClick={()=>setShow(true)}>Изменить профиль</button>
                    <h4>Покупки</h4>
                    <a href="/cabinet" className="grey-text">Заказы</a>
                    <a href="/cabinet" className="grey-text">Купленные товары</a>
                    <a href="/cabinet" className="grey-text">Регулярные доставки</a>
                    <a href="/cabinet" className="grey-text">Возвраты</a>
                    <a href="/cabinet" className="grey-text">Цифровые товары</a>
                    <a href="/cabinet" className="grey-text">Для меня</a>
                </div>
            </div>
        }
        
        <CabinetDash show={show} onClose={()=>{setShow(false)}} profile={profileSvg}/>
        </>
    )
}

export default CabinetSide

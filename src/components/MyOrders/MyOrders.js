import React, { useEffect, useState } from 'react'
import { useLogin } from '../Context/Authentication'
import { useQuery } from '@apollo/client'
import { REGIONS, STATES } from './Query'
import axios from 'axios'

const MyOrders = () => {

    const [ token ] = useLogin()
    const [ cartSum, setCartSum ] = useState("")
    const [ cartProducts, setCartProducts ] = useState([])
    const [ stateID, setStateID ] = useState("")
    const [ regionID, setRegionID ] = useState("")
    const [ address, setAddress ] = useState("")
    const [ name, setName ] = useState("")
    const [ number, setNumber ] = useState("")
    const [ disabled, setDisabled ] = useState(true)

    const { data: states, loading: stateLoading, error: stateError } = useQuery(STATES)

    const { data: regions, loading: regionLoading, error: regionsError } = useQuery(REGIONS, {
        variables: { stateID }
    })

    useEffect(() => {
        stateID.length <= 0 ||
        regionID.length <= 0 ||
        address.length <= 0 ||
        name.length <= 0 ||
        number.length <= 0 ? 
        setDisabled(true) : setDisabled(false)
    }, [
        stateID,
        regionID,
        address,
        name,
        number
    ])

    useEffect(() => {
        ;(async() => {
            axios.get('https://meros-master.herokuapp.com/cart', {
                headers: {
                    Authorization: `${token}`
                }
             }
            ).then((response) => {
                if(response.data.sum) {
                    setCartSum(response.data.sum.sum)
                }
            }).catch((err) => {
                console.log(err)
            })
        })()
    }, [token])

    useEffect(() => {
        ;(async() => {
            axios.get('https://meros-master.herokuapp.com/cart', {
                headers: {
                    Authorization: `${token}`
                }
             }
            ).then((response) => {
                if(response.data) {
                    setCartProducts([...response.data.cartProducts])
                }
            }).catch((err) => {
                console.log(err)
            })
        })()
    }, [token])

    const handleOrder = () => {
        ;(async() => {
            try {
                const res = await axios.post('https://meros-master.herokuapp.com/new-order',  { data: {
                    cartProducts,
                    cartSum,
                    info: {
                        stateID,
                        regionID,
                        address,
                        name,
                        number
                    },
                }} , {
                    headers: {
                        Authorization: `${token}`
                    }
                })
                // enqueueSnackbar(res.data.message, { variant })
                console.log(res)
            } catch(err) {
                console.log(err.response)
            }
        })()
    }

    return (
        <div className="container">
            {
                cartSum &&
                <>
                    <div className="cabinet-line">
                        <a href="/">Главная /</a>
                        <a href="/korzina">Корзина</a>
                    </div>
                    <h2 className="h2">Оформление</h2>
                    <div className="korzinka">
                        <div className="order-inputs1">
                        <div className="order-inputs">
                            <div className="first-order-input">
                                <label>Shaxar yoki viloyat tanlang</label>
                                <select onChange={(e) => setStateID(e.target.value)} className="auth-input">
                                    <option value style={{"display": "none"}}>Shaxar</option>
                                    { stateLoading && <>stateLoading</> }
                                    { stateError && <>stateError</> }
                                    {
                                        states && states.allStates.map((e, i) => (
                                            <option value={e.id} key={i}>{e.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="first-order-input">
                                <label>Tuman</label>
                                <select onChange={(e) => setRegionID(e.target.value)} className="auth-input">
                                    <option value style={{"display": "none"}}>Tuman</option>
                                    { regionLoading && <>regionLoading</> }
                                    { regionsError && <>regionsError</> }
                                    {
                                        regions && regions.byStateID.map((e, i) => (
                                            <option value={e.id} key={i}>{e.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            </div>
                            <div className="first-order-input"> 
                                <label>Адрес</label>
                                    <input onKeyUp={e => setAddress(e.target.value)} type="text" className="auth-input" placeholder="пример: Ташкентская область, Бектемирский район, улица ..."/>
                                </div>
                            <div className="order-inputs">
                                <div className="first-order-input"> 
                                    <label>ФИО получателя</label>
                                    <input onKeyUp={e => setName(e.target.value)} type="text" className="auth-input" placeholder="Имя фамилия"/>
                                </div>
                                <div className="first-order-input"> 
                                    <label>Номер телефона</label>
                                    <input onKeyUp={e => setNumber(e.target.value)} type="text" className="auth-input" placeholder="+998 9..."/>
                                </div>
                            </div>  
                        </div>
                        <div className="trash-ofor">
                            {
                                cartSum &&
                                <>
                                    <div className="content-trash-ofor">
                                        <div className="content-product-price">
                                            <div className="content-price">
                                            <div className="price">Стоимость:</div>
                                            <div className="price">Доставка:</div>
                                            </div>
                                            <div className="price-cost">
                                                <h5 className="grey-text">{cartSum} UZS</h5>
                                                <h5 className="grey-text">20000 UZS</h5>
                                            </div>
                                        </div>
                                        <hr/>
                                        <div className="content-opshiy">
                                            <h3>{cartSum} UZS</h3>
                                        </div>
                                    </div>
                                    <button disabled={disabled} style={ disabled ? {"backgroundColor": "grey"} : { "backgroundColor": "blue"}} onClick={handleOrder} className="btn btn-primary">
                                        Оформить заказ
                                    </button>
                                </>
                            }
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default MyOrders

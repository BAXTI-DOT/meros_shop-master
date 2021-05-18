import Logo from './img/Group 53.svg'
import Katalog from './img/Katalog.svg'
import Times from './img/Times.svg'
import Search from './img/Search.svg'
import Categ from './img/Categ.svg'
import Profile from './img/Profile.svg'
import Star from './img/Star.svg'
import Savat from './img/Savat.svg'
import {Fragment, useEffect, useState} from 'react'
import AllCateg from '../Modals/AllCateg'
import KatalogModal from '../Modals/Katalog'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { useLogin } from '../Context/Authentication'
import { useQuery } from '@apollo/client'
import { SEARCH } from './Query'

const MiddleNav = () => {
    const [show,setShow] = useState(false);
    const [katalogShow,setKatalogShow] = useState(false);
    const [ token ] = useLogin()
    const [ cartProducts, setCartProducts ] = useState([])

    const { data } = useQuery(SEARCH)

    useEffect(() => {
        ;(async() => {
            if(token) {
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
            }
        })()
    }, [token,cartProducts])

    return (
        <Fragment>
            <div className="MiddleNav">
            <div className="logo">
                <Link to="/">
                <img src={Logo} alt=""/>
                </Link>
            </div>
            <div className="catalog-button">
                <button className={katalogShow === true ? 'btn katalog-btn-showed' : `btn btn-primary`} onClick={()=>{setKatalogShow(true)}}><img src={katalogShow === false ? Katalog : Times} alt=""/> Каталог</button>
            </div>
            <div className="search">
                <input id="list" list="options" type="text" placeholder="Поиск по товаром..." className="search-input"/>
                    <datalist  id="options">
                        {
                            data && data.search.map((e, i) => (
                                <option id={e.id} key={i} value={e.name}>{e.name}</option>
                            ))
                        }
                    </datalist>
                <button className="btn-light-sm search-button" onClick={()=>{setShow(true)}}>Все категории <img src={Categ} alt=""/></button>
                <button className="btn btn-primary-sm"><img src={Search} alt=""/></button>
            </div>
            <div className="icons">
                <img src={Profile} alt=""/><Link to="/cabinet">Войти</Link> 
                <img src={Star} alt=""/><Link to="/forward">Избранное</Link> 
                {
                    token &&
                    <div className="count1"><span className="count">{cartProducts.length}</span></div>
                }
                <img src={Savat} alt=""/><Link to="/korzina">Корзина</Link> 
            </div>
            </div>
            <AllCateg show={show} onClose={()=>{setShow(false)}}/>
            <KatalogModal show={katalogShow} onClose={()=>{setKatalogShow(false)}}/>
        </Fragment>
    )
}

export default MiddleNav

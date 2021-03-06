import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLogin } from '../Context/Authentication';
import { Link } from 'react-router-dom'

const TrashOfor = () => {

    const [ token ] = useLogin()
    const [ cartSum, setCartSum ] = useState("")

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

    return (
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
                    <button className="btn btn-primary">
                        <Link style={{color: "white", textDecoration: "none"}} to="/myOfor">
                            Оформить заказ
                        </Link>
                    </button>
                </>
            }
        </div>
    )
}

export default TrashOfor

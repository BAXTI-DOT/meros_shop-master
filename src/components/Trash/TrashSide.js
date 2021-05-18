import React, { Fragment, useEffect, useState } from 'react'
import { useLogin } from '../Context/Authentication'
import { Redirect } from 'react-router'
import axios from 'axios'
import img from './img/outline_delete_black_24dp.png'
import { useSnackbar } from 'notistack'

const TrashSide = () => {

    const [ token ] = useLogin()

    const [ cartProducts, setCartProducts ] = useState([])
    const [ variant ] = useState("success")

    const { enqueueSnackbar } = useSnackbar()

    const style = {
        "outline": "none",
        "backgroundColor": "transparent",
        "borderColor": "transparent"
    }

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

    const btn1 = (id) => {
        const findProduct = cartProducts.find((e) => e.product_id === id)
        if(findProduct.product_count === 1) {
            // setCartProducts(cartProducts.filter((e) => e.product_id !== id))
        } else {
            axios.post('https://meros-master.herokuapp.com/updateMinus', {
                data: {
                    id
                }
            })
            setCartProducts(
                cartProducts.map((e) => e.product_id === id ? { ...findProduct, product_count: findProduct.product_count - 1}: e)
            )
        }
    }

    const btn2 = (id) => {
        const findProduct = cartProducts.find((e) => e.product_id === id)

        if(findProduct) {
            axios.post('https://meros-master.herokuapp.com/updatePlus', {
                data: {
                    id
                }
            })
            setCartProducts(
                cartProducts.map((e) => e.product_id === id ? { ...findProduct, product_count: findProduct.product_count + 1}: e)
            )
        } else {
            setCartProducts([...cartProducts, { ...findProduct, product_count: 1}])
        }
    }

    const handleDelete = (productID) => {
        console.log(productID)
        ;(async() => {
            try {
                const res = await axios.post('https://meros-master.herokuapp.com/deleteCart',  { data: {
                    productID
                }} , {
                    headers: {
                        Authorization: `${token}`
                    }
                })
                enqueueSnackbar(res.data.message, { variant })
            } catch(err) {
                // console.log(err.response)
            }
        })()
    }

    if(!token ) return <Redirect to="/login" />

    return (
        <Fragment>
            <div className="trash-for">
                <hr/>
                {
                    cartProducts && cartProducts.map((e, i) => (
                        <div key={i} className="trash-product">
                            <div className="rectangle">
                                <img src={e.image_link} alt="" />
                            </div>
                            <div className="single-product-trash">
                                <p>{e.product_name}</p>
                                <p>{e.product_price * e.product_count}</p>
                            </div>
                            <div className="counter-content">
                                <button onClick={() => btn1(e.product_id)}>-</button>
                                <span>{e.product_count}</span>
                                <button onClick={() => btn2(e.product_id)} value={e}>+</button>
                            </div>
                            <div className="trash-icon">
                                <button style={style} onClick={() => handleDelete(e.product_id)}>
                                    <img src={img} alt="" />
                                </button>
                            </div>
                        </div>
                    ))

                }
            </div>
        </Fragment>
    )
}

export default TrashSide

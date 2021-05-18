import visibility from '../img/others/visibility.svg'
import star from '../img/others/star.svg'
import trash from '../img/others/trash.svg'
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_FORWARD, ADD_TO_CART } from '../../Query'
import { useSnackbar } from 'notistack'
import { Link } from 'react-router-dom'
 
const Product = ({ Stars, products, token }) => {

    const [ variant ] = useState('success')
    const [ variant1 ] = useState('warning')

    const { enqueueSnackbar } = useSnackbar()

    const [ cart ] = useMutation(ADD_TO_CART, {
        errorPolicy: "all",
        update: (cache, data) => {
            if(data && data.data.addToCart.status === "200") {
                enqueueSnackbar("Savatga qoshildi", { variant })
            }
            
            if(data && data.data.addToCart.status === "400") {
                enqueueSnackbar("Xatolik yuz berdi", { variant: variant1 })
            }
        }
    })

    const [ forward, { error: forwardError } ] = useMutation(ADD_FORWARD, {
        errorPolicy: "all",
        update: (cache, data) => {
            console.log(data)
            if(data && data.data.addToForwards.status === "200") {
                enqueueSnackbar("Forwardga qoshildi", { variant })
            }
            
            if(data && data.data.addToForwards.status === "BOR") {
                enqueueSnackbar("Forwardda bor", { variant: variant1 })
            }
        }
    })
    
    const handleForward = (productID) => {
        if(token) {
            forward({
                variables: {
                    productID
                }
            })
        }
        else {
            enqueueSnackbar('Registratsia yoki login qiling', { variant: variant1 })
        }
    }

    const handleCart = (productID) => {
        if(token) {
            cart({
                variables: {
                    productID,
                    productCount: 1
                }
            })
        }
        else {
            enqueueSnackbar('Registratsia yoki login qiling', { variant: variant1 })
        }
    }
    
    const style = {
        "border": "none",
        "background": "none",
        "outline": "none"
    }

    return (
        <div className="product-list">
            <div className="first-list">
                { forwardError && <>forwardError</> }
                {
                    products && products.map((e, i) => (
                        <div key={i} className="product-preview hi-product">
                            <div className="img-preview">
                                <div>
                                    <div className="img1">
                                        <img src={e.image} alt="" />
                                    </div>
                                    <div className="img-icons">
                                        <Link to={`/products/${e.id}`}>
                                            <button style={style}><img src={visibility} alt="" className="icon-img"/></button>
                                        </Link>
                                        <button onClick={() => handleForward(e.id)} style={style}><img src={star} alt="" className="icon-img"/></button>
                                        <button onClick={() => handleCart(e.id, e.name, e.price, e.image)} style={style}><img src={trash} alt="" className="icon-img"/></button>
                                    </div>
                                </div>
                            </div>
                            {
                                e.sale &&
                                <span>- { e.sale} %</span>
                            }
                            <p>{e.category}</p>
                            <img src={Stars} alt="" className="stars"/>
                            <h2 style={{"color": "black"}}>{e.name}</h2>
                            <h2>{e.price.length === 4 ? 
                                e.price.replace(/^(.{1})(.*)$/, "$1 $2"):
                                e.price.length === 4 ? 
                                e.price.replace(/^(.{2})(.*)$/, "$1 $2") 
                                : e.price.length === 4 ? e.price.replace(/^(.{3})(.*)$/, "$1 $2"):
                                e.price} сум</h2>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Product

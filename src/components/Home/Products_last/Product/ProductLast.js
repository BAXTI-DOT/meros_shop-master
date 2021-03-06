import visibility from '../../Products/img/others/visibility.svg'
import star from '../../Products/img/others/star.svg'
import trash from '../../Products/img/others/trash.svg'
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { useSnackbar } from 'notistack'
import { ADD_FORWARD, ADD_TO_CART } from '../../Query'
import { Link } from 'react-router-dom'

const ProductLast = ({ Stars, saleProducts, token }) => {

    const [ variant ] = useState('success')
    const [ variant1 ] = useState('warning')

    const { enqueueSnackbar } = useSnackbar()

    const [ forward, { error: forwardError } ] = useMutation(ADD_FORWARD, {
        errorPolicy: "all",
        update: (cache, data) => {
            if(data && data.data.addToForwards.status === "200") {
                enqueueSnackbar("Forwardga qoshildi", { variant })
            }
            
            if(data && data.data.addToForwards.status === "BOR") {
                enqueueSnackbar("Forwardda bor", { variant: variant1 })
            }
        }
    })

    const [ cart, { error: cartError } ] = useMutation(ADD_TO_CART, {
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
        <div className="product-list1">
            <div className="first-list">
                { cartError && <>cartError</> }
                { forwardError && <>forwardError</> } 
                {
                    saleProducts && saleProducts.map((e, i) => (
                        <div key={i} className="product-preview product-preview1">
                            <div className="img-preview">
                                <div className="img1">
                                    <img src={e.image} alt="" /></div>
                                    <div className="img-icons">
                                    <Link to={`/products/${e.id}`}>
                                        <button style={style}><img src={visibility} alt="" className="icon-img"/></button>
                                    </Link>
                                    <button onClick={() => handleForward(e.id)} style={style}><img src={star} alt="" className="icon-img"/></button>
                                    <button onClick={() => handleCart(e.id)} style={style}><img src={trash} alt="" className="icon-img"/></button>
                                </div>
                            </div>
                            {
                                e.sale &&
                                <span> - {e.sale} %</span>
                            }
                            <p>{e.category}</p>
                            <img src={Stars} alt="" className="stars"/>
                            <h2>{e.name}</h2>
                            <h2>{e.price} ??????</h2>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default ProductLast

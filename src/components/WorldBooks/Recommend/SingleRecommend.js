import { Fragment, useState } from 'react'
import visibility from './img/visibility.svg'
import star from './img/star.svg'
import trash from './img/trash.svg'
import { useSnackbar } from 'notistack'
import { useMutation } from '@apollo/client'
import { ADD_FORWARD } from '../Query'
import { ADD_TO_CART } from '../../Home/Query'

const SingleRecommend = ({ Stars, recommended, token }) => {

    const [ variant ] = useState('success')
    const [ variant1 ] = useState('warning')

    const { enqueueSnackbar } = useSnackbar()

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
    
    const handleSee = (productID) => {
        window.location.href = `/products/${productID}`
    }
    
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
        <Fragment>
            <div className="first-list recommend-list1">
                { cartError && <>cartError</> }    
                { forwardError && <>forwardError</> }
                {
                    recommended && recommended.map((e, i) => (
                        <div className="product-preview" key={e.id}>
                            <div className="img-preview">
                                <div className="img">
                                    <img src={e.image} alt="" className="Quran"/></div>
                                <div className="img-icons">
                                    <button onClick={() => handleSee(e.id)} style={style}><img src={visibility} alt="" className="icon-img"/></button>
                                    <button onClick={() => handleForward(e.id)} style={style}><img src={star} alt="" className="icon-img"/></button>
                                    <button onClick={() => handleCart(e.id)} style={style}><img src={trash} alt="" className="icon-img"/></button>
                                </div>
                            </div>
                            {
                                e.sale &&
                                <span>{e.sale}</span>
                            }
                            <p>{e.category}</p>
                            <img src={Stars} alt="" className="stars"/>
                            <h2>{e.name}</h2>
                            <h2>{e.price}</h2>
                            <button className="btn btn-primary product-btn">Add to cart</button>
                        </div>
                    ))
                }
            </div>
        </Fragment>
    )
}

export default SingleRecommend

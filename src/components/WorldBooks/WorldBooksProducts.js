import visibility from '../Home/Products/img/others/visibility.svg'
import star from '../Home/Products/img/others/star.svg'
import trash from '../Home/Products/img/others/trash.svg'
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { useSnackbar } from 'notistack'
import { ADD_FORWARD } from './Query'
import { ADD_TO_CART } from '../Home/Query'

const WorldBooksProducts = ({ filteredProducts, subcategoryProducts, detailToSubcategory, token }) => {

    const [ variant ] = useState('success')
    const [ variant1 ] = useState('warning')

    const { enqueueSnackbar } = useSnackbar()

    const [ forward, { loading: forwardLoading, error: forwardError } ] = useMutation(ADD_FORWARD, {
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
        <div className="worldbook-products">
            <>
                { cartError && <>cartError</> }
                { forwardLoading && <>forwardLoading</> }
                { forwardError && <>forwardError</> }
                {
                    detailToSubcategory.length === 0 &&

                        subcategoryProducts && subcategoryProducts.subcategoryProducts.map((e, i) => (
                            <div key={i} className="product-preview1 world-product-single">
                                <div className="img-preview">
                                    <div className="img">
                                        <img src={e.image} alt="" /></div>
                                    <div className="img-icons">
                                    <button onClick={() => handleSee(e.id)} style={style}>
                                        <img src={visibility} alt="" className="icon-img"/>
                                    </button>
                                    <button onClick={() => handleForward(e.id)} style={style}>
                                        <img src={star} alt="" className="icon-img"/>
                                    </button>
                                    <button onClick={() => handleCart(e.id)} style={style}>
                                        <img src={trash} alt="" className="icon-img"/>
                                    </button>
                                    </div></div>
                                <p>{e.category}</p>
                                <h2>{e.name}</h2>
                                <h2>{e.price}</h2>
                                <button className="btn btn-primary product-btn">Add to cart</button>
                            </div>
                        ))
                }
                {
                    filteredProducts && filteredProducts.map((e, i) => (
                        <div key={i} className="product-preview1 world-product-single">
                            <div className="img-preview">
                                <div className="img">
                                    <img src={e.image_link} alt="" /></div>
                                    <div className="img-icons">
                                    <button onClick={() => handleSee(e.id)} style={style}>
                                        <img src={visibility} alt="" className="icon-img"/>
                                    </button>
                                    <button onClick={() => handleForward(e.product_id)} style={style}>
                                        <img src={star} alt="" className="icon-img"/>
                                    </button>
                                    <button onClick={() => handleCart(e.product_id)} style={style}>
                                        <img src={trash} alt="" className="icon-img"/>
                                    </button>
                                </div></div>
                            <p>{e.category_name}</p>
                            <h2>{e.product_name}</h2>
                            <h2>{e.product_price}</h2>
                            <button className="btn btn-primary product-btn">Add to cart</button>
                        </div>
                    ))
                }
            </>
        </div>
    )
}

export default WorldBooksProducts

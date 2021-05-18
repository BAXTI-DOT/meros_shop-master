import React, { createContext, useContext, useState, useEffect } from 'react'
const Context = createContext()

const CartProvider = ({children})=>{

    const [state, setState] = useState([])
    
    useEffect(()=>{
        if(state.length){
            window.localStorage.setItem('cart', JSON.stringify({ data: state }))
        }
    },[state])

    const value = {
        state,
        setState
    }
    
    return (
        <Context.Provider value={value}>
        <Context.Consumer>
            {
                ()=> children
            }
        </Context.Consumer>
        </Context.Provider>
    )
}

const useCart = (setterOnly) =>{
    const { state, setState } = useContext(Context)
    return setterOnly ? [setState] : [state,setState]
}

export {
    CartProvider,
    useCart
}
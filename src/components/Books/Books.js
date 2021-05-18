import React, { Fragment } from 'react'
import BookNav from './BookNav'
import BookShowcase from './BookShowcase'
import NewBook from './NewBook'
import Big from './img/Big.svg'
import BookCategSection from './BookCategSection'
import Deliver from '../Deliver/Deliver'
import Brands from '../Brands/Brands'
import Products from '../Home/Products/Products'
import { BOOK_NAME, COUNT } from './Query'
import { BEST_PRODUCTS } from '../Home/Query'
import { useQuery } from '@apollo/client'
import { useParams } from 'react-router'
import { useLogin } from '../Context/Authentication'

const Books = () => {

    const { categoryID } = useParams()

    const [ token ] = useLogin()

    const { data, loading, error } = useQuery(BOOK_NAME, {
        variables: { categoryID }
    })

    const { data: bestProducts, loading: bestProductsLoading, error: bestProductsError } = useQuery(BEST_PRODUCTS)

    const { data: count, loading: countLoading, error: countError } = useQuery(COUNT, {
        variables: { categoryID }
    })

    return (
        <Fragment>
            <div className="container">
                {
                    data &&
                    <h2 className="h2">
                        { loading && <>loading</>}
                        { error && <>error</>}
                        { data.byCategoryID.name } 
                        { countLoading && <>countLoading</> }
                        { countError && <>countError</> }
                        {
                            count &&
                            <span className="grey-text book-h2">{count.categoryCount} товаров</span>
                        }
                    </h2>
                }
                <BookNav/>
                <BookShowcase/>
                <NewBook token={token} />
                <div className="big-ad book-big-ad">
                <img src={Big} alt=""/>
                </div>
                <BookCategSection/>
                {bestProductsLoading && <>bestProductsLoading</>}
                {bestProductsError && <>bestProductsError</>}
                <Products token={token} bestProducts={bestProducts && bestProducts.bestProducts} />
            </div>
            <Deliver/>
            <div className="container">
            <Brands/>
            </div>
        </Fragment>
    )
}

export default Books

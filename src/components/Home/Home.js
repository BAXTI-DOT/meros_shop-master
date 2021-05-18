import {Fragment} from 'react'
import Showcase from './Showcase/Showcase'
import Special from './Special/Special'
import Products from './Products/Products'
import ProductsLast from './Products_last/ProductsLast'
import Section from './Section/Section'
import Deliver from '../Deliver/Deliver'
import Popular from './Popular/Popular'
import Recommend from './Recommend/Recommend'
import Brands from '../Brands/Brands'
import { useQuery } from '@apollo/client'
import { BEST_PRODUCTS, SALE_PRODUCTS, RECOMMENDED_PRODUCTS, POPULAR_CATEGORIES } from './Query'
import { useLogin } from '../Context/Authentication'

const Home = () => {

    const [ token ] = useLogin()
    
    const { data, loading, error } = useQuery(BEST_PRODUCTS)
    const { data: saleProducts, loading: saleLoading, error: saleError } = useQuery(SALE_PRODUCTS)
    const { data: recommended, loading: recommendedLoading, error: recommendedError } = useQuery(RECOMMENDED_PRODUCTS)
    const { data: popular, loading: popularLoading, error: popularError } = useQuery(POPULAR_CATEGORIES)


    return (
        <Fragment>
            <div className="container">
                <Showcase/>
                <Special/>
                { loading && <>loading</>}
                { error && <>error</>}
                <Products token={token} bestProducts={data && data.bestProducts} />
                <Section/>
                { saleLoading && <>saleLoading</> }
                { saleError && <>saleError</> }
                <ProductsLast token={token} saleProducts={saleProducts && saleProducts.saleProducts}/>
            </div>
            <Deliver/>
            <div className="container">
                { popularLoading && <>popularLoading</> }
                { popularError && <>popularError</> }
                <Popular data={popular} />
                { recommendedLoading && <>recommendedLoading</>}
                { recommendedError && <>recommendedError</>}
                <Recommend token={token} recommended={ recommended && recommended.recommended} />
                <Brands/>
            </div>
        </Fragment>
    )
}

export default Home

import Hadis from './img/Product/Hadis.png'
import ProductLast from './Product/ProductLast'
import Stars from './img/Product/Stars.svg'

const ProductsLast = (props) => {

    return (
        <>
            <div className="Special1">
                <h3>Все товары со скидками!</h3>
            </div>
            <div className="product-special1">
                <ProductLast token={props.token} saleProducts={props.saleProducts} Hadis={Hadis} Stars={Stars}/>
            </div>
        </>
    )
}

export default ProductsLast

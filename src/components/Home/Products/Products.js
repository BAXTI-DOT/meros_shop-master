import Quran from './img/Product/Quran.png'
import Product from './Product/Product'
import Stars from './img/Product/Stars.svg'

const Products = (props) => {

    return (
        <>
            <div className="Special1">
                <h3>Лучшие предложения!</h3>
            </div>
            <div className="product-special">
                <Product token={props.token} products={props.bestProducts} Quran={Quran} Stars={Stars}/>
            </div>
        </>
    )
}

export default Products

import React,{useState} from 'react'
import Recommend from './Recommend/Recommend'
import Section from '../Home/Section/Section'
import WorldBooksContent from './WorldBooksContent'
import WorldBooksFilter from './WorldBooksFilter'
import WorldBooksProducts from './WorldBooksProducts'
import KitobCateg from '../Modals/KitobCateg'
import { SUB_DATA, SUB_CLASSES, FILTERS, SUBCATEGORY_PRODUCTS, RECOMMENDED_PRODUCTS } from './Query'
import { useQuery } from '@apollo/client'
import { Link, useParams } from 'react-router-dom'
import Pagination from '@material-ui/lab/Pagination'
import { useLogin } from '../Context/Authentication'

const DunyoKitoblari = () => {

    const [ filtered, setFiltered ] = useState([])
    const [ detailToSubcategory, setDetailToSubcategory ] = useState([])
    const [ sort, setSort ] = useState("3")

    const { subcategoryID } = useParams()

    const [ token ] = useLogin()

    const { data, loading, error } = useQuery(SUB_DATA, {
        variables: { subcategoryID }
    })

    const { data: recommended, loading: recommendedLoading, error: recommendedError } = useQuery(RECOMMENDED_PRODUCTS)

    const { data: subclasses, loading: subclassLoading, error: subclassError } = useQuery(SUB_CLASSES, {
        variables: { subcategoryID }
    })

    const { data: filters, loading: filterLoading, error: filterError } = useQuery(FILTERS, {
        variables: { subcategoryID }
    })

    const { data: subcategoryProducts, loading: subcategoryProductsLoading, error: subcategoryProductsError} = useQuery(SUBCATEGORY_PRODUCTS, {
        variables: { subcategoryID, sortStatus: parseInt(sort), page: 1, limit: 10 }
    })

    const [show,setShow] = useState(false)

    return (
        <>
            { loading && <>loading</> }
            { error && <>error</> }
            {
                data &&
                <div className="container">
                        <div className="cabinet-line">
                        <Link to={`/categories/${data.subcategoryLink.categoryID}`}>{data.subcategoryLink.category} / </Link>
                        <Link to={`/subcategories/${data.subcategoryLink.subcategoryID}`}>{data.subcategoryLink.subcategory}</Link>
                    </div>
                    <h2 className="h2">{data.subcategoryLink.subcategory}</h2>
                    <button className="btn btn-display" onClick={()=>{setShow(true)}}><i className="fas fa-align-left"></i> Все Филтри</button>
                    <div className="cabinet1">
                        { subclassLoading && <>subclassLoading</> }
                        { subclassError && <>subclassError</> }
                        { filterLoading && <>filterLoading</> }
                        { filterError && <>filterError</> }
                        <WorldBooksFilter filtered={filtered} setFiltered={setFiltered} subclasses={subclasses} filters={filters} setDetailToSubcategory={setDetailToSubcategory} detailToSubcategory={detailToSubcategory} />
                        <div className="cabinet">
                        <WorldBooksContent setSort={setSort}  />
                        <hr/>
                        { subcategoryProductsLoading && <>subcategoryProductsLoading</> }
                        { subcategoryProductsError && <>subcategoryProductsError</> }
                        <WorldBooksProducts token={token} filteredProducts={filtered} subcategoryProducts={subcategoryProducts} detailToSubcategory={detailToSubcategory} />
                        <div className="button-pagination">
                            <Pagination count={10} color="primary" />
                        </div>
                        </div>
                    </div>
                    <Section/>
                        {recommendedLoading && <>recommendedLoading</>}
                        {recommendedError && <>recommendedError</>}
                        <Recommend token={token} recommended={ recommended && recommended.recommended} />
                    <KitobCateg show={show} onClose={()=>{setShow(false)}}/>
                </div>
            }
        </>
    )
}

export default DunyoKitoblari

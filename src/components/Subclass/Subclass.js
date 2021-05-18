import React,{useEffect, useState} from 'react'
import Recommend from './Recommend/Recommend'
import Section from '../Home/Section/Section'
import SubclassContent from './SubclassContent.js'
import SubclassFilter from './SubclassFilter.js'
import SubclassProducts from './SubclassProducts.js'
import KitobCateg from '../Modals/KitobCateg'
import { SUB_LINK, FILTERS, SUBCLASS_PRODUCTS, RECOMMENDED_PRODUCTS } from './Query'
import { useQuery } from '@apollo/client'
import { Link, useParams } from 'react-router-dom'
import { useLogin } from '../Context/Authentication'

const DunyoKitoblari = () => {

    const [ filtered, setFiltered ] = useState([])
    const [ sort, setSort ] = useState("3")
    const [ subcategoryID, setSubcategoryID ] = useState("")
    const [ detailToSubclass, setDetailToSubclass ] = useState([])

    const [ token ] = useLogin()

    const { subclassID } = useParams()

    const { data, loading, error } = useQuery(SUB_LINK, {
        variables: { subclassID }
    })

    const { data: recommended, loading: recommendedLoading, error: recommendedError } = useQuery(RECOMMENDED_PRODUCTS)

    useEffect(() => {
        if(data) {
            setSubcategoryID(data.subclassLink.subcategoryID)
        }
    }, [data])

    const { data: filters, loading: filterLoading, error: filterError } = useQuery(FILTERS, {
        variables: { subcategoryID }
    })

    const { data: subclassProducts, loading: subclassProductsLoading, error: subclassProductsError } = useQuery(SUBCLASS_PRODUCTS, {
        variables: { subclassID, sortStatus: parseInt(sort), page: 1, limit: 10 }
    })

    const [show,setShow] = useState(false)

    const style = {"background": "none", "border": "none", "color": "#273142", "cursor": "pointer", "fontSize": "x-large"}

    return (
        <>
            { loading && <>loading</> }
            { error && <>error</> }
            {
                data &&
                <div className="container">
                    <div className="cabinet-line">
                        <Link to={`/categories/${data.subclassLink.categoryID}`}>{data.subclassLink.category} / </Link>
                        <Link to={`/subcategories/${data.subclassLink.subcategoryID}`}>{data.subclassLink.subcategory} / </Link>
                        <Link to={`/subclass/${data.subclassLink.subclassID}`}>{data.subclassLink.subclass}</Link>
                    </div>
                    <h2 className="h2">{data.subclassLink.subclass}</h2>
                    <button className="btn btn-display" onClick={()=>{setShow(true)}}><i className="fas fa-align-left"></i> Все Филтри</button>
                    <div className="cabinet1">
                        { filterLoading && <>filterLoading</> }
                        { filterError && <>filterError</> }
                        <SubclassFilter setDetailToSubclass={setDetailToSubclass} filters={filters} setFiltered={setFiltered} detailToSubclass={detailToSubclass} />
                        <div className="cabinet">
                        <SubclassContent setSort={setSort}  />
                        <hr/>
                        { subclassProductsLoading && <>subclassProductsLoading</> }
                        { subclassProductsError && <>subclassProductsError</> }
                        <SubclassProducts token={token} detailToSubclass={detailToSubclass} filteredProducts={filtered} subclassProducts={subclassProducts} />
                        <div className="button-pagination">
                        <button style={style}>&laquo;</button>
                        <button style={style}>1</button>
                        <button style={style}>2</button>
                        <button style={style}>3</button>
                        <button style={style}>4</button>
                        <button style={style}>...</button>
                        <button style={style}>&raquo;</button>
                        </div>
                        </div>
                    </div>
                    <Section/>
                        {recommendedLoading && <>recommendedLoading</>}
                        {recommendedError && <>recommendedError</>}
                        <Recommend token={token} recommend={recommended && recommended.recommended} />
                    <KitobCateg show={show} onClose={()=>{setShow(false)}}/>
                </div>
            }
        </>
    )
}

export default DunyoKitoblari

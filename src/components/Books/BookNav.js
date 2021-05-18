import Bigad from './img/Bigad.svg'
import { useQuery } from '@apollo/client'
import { CATEGORY_NAV } from './Query'
import { Link, useParams } from 'react-router-dom'

const BookNav = () => {

    const { categoryID } = useParams()

    const { data, loading, error } = useQuery(CATEGORY_NAV, {
        variables: { categoryID }
    })

    return (
        <div className="sub-nav1">
            <div className="sub-nav">
                    {loading && <>loading</>}
                    {error && <>error</>}
                    {
                        data && data.subcategory.map((e, i) => (
                            <ul key={i}>
                                <li><b><Link id={e.id} to={`/subcategories/${e.id}`} className="primary-text">{e.name}</Link></b></li>
                            </ul>   
                        ))
                    }
            </div>
            <img src={Bigad} alt=""/>
        </div>
    )
}

export default BookNav

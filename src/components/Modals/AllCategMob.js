import { useQuery } from '@apollo/client'
import React from 'react'
import { Link } from 'react-router-dom'
import { ALL_CATEGORIES } from './Query'

const AllCategMob = (props) => {

    const { data, loading, error } = useQuery(ALL_CATEGORIES)

    if(!props.show){
        return null
    }
    return (
        <div className="all-categ-mob-modal" onClick={props.onClose}>
            <div className="all-categ-mob-modal-content" onClick={e=>e.stopPropagation()}>
                <div className="all-categ-mob-modal-header">
                    <div className="all-categ-modal-close" onClick={props.onClose}><button>&times;</button></div>  
                </div>
                <div className="all-categ-mob-modal-body">
                    <ul>
                        { loading && <>loading</> }
                        { error && <>error</> }
                        {
                            data && data.categories.map((e, i) => (
                                <li key={i}>
                                    <Link to={`/categories/${e.id}`}>
                                        <i className="fas fa-book"></i>
                                        <span>{e.name}</span>
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default AllCategMob

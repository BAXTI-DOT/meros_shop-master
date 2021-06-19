    import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const WorldBooksFilter = ({filtered, subclasses, filters, setFiltered, setDetailToSubcategory, detailToSubcategory }) => {

    const [ detail, setDetail ] = useState([])
    const [ state, setState ] = useState(1)

    useEffect(() => {
        axios.post('https://meros-master.herokuapp.com/filterproduct', {
            data: detail
        })
        .then((response) => {
            if(response) {
                setFiltered(response.data.data)
            }
        })
    })
    
    const handleChange = e => {
        let index = detail.indexOf(e.target.value)
        let index2 = detailToSubcategory.indexOf(e.target.value)

        if(index === -1 ) {
            setDetail([ ...detail, e.target.value ])
            
        }
        else {
            detail.splice(index, 1)
            setState(state + 1)
        }

        if(index2 === -1 ) {
            setDetailToSubcategory([ ...detailToSubcategory, e.target.value ])
            
        }
        else {
            detailToSubcategory.splice(index2, 1)
            setState(state + 1)
        }
    }

    return (
        <div className="cabinet-side">
            <div className="filter-worldbook">
                <h2 className="h2">Подкатегории</h2>
                {
                    subclasses && subclasses.subClasses.map((e, i) => (
                        <div key={i} className="worldbook-filter">
                            <Link to={`/subclass/${e.id}`}><h3 className="grey-text"><i className="fas fa-chevron-left"></i> {e.name}</h3></Link>
                        </div>
                    ))
                }
                {
                    filters && filters.filters.map((e, i) => (
                        <div key={i}>
                            <h2 className="h2-filter">{e.name}</h2>
                            {
                                e && e.detail.map((d, i) => (
                                    <div  key={i} className="type">
                                        <h3>{d.name}</h3>
                                        <input value={d.id} onChange={handleChange} type="checkbox" name=""/>
                                    </div>
                                ))
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default WorldBooksFilter

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router'

const SubclassFilter = ({ subclasses, filters, setFiltered, setDetailToSubclass, detailToSubclass }) => {

    const [ detail, setDetail ] = useState([])
    const [ state, setState ] = useState(1)

    const { subclassID } = useParams()

    useEffect(() => {
        axios.post('https://meros-master.herokuapp.com/filterSubclassProduct', {
            data: detail,
            subclassID
        })
        .then((response) => {
            if(response) {
                setFiltered(response.data.data)
            }
        })
    })
    
    const handleChange = e => {
        let index = detail.indexOf(e.target.value)
        let index2 = detailToSubclass.indexOf(e.target.value)

        if(index === -1) {
            setDetail([ ...detail, e.target.value ])
        }
        else {
            detail.splice(index, 1)
            setState(state + 1)
        }

        if(index2 === -1) {
            setDetailToSubclass([ ...detailToSubclass, e.target.value ])
        }
        else {
            detailToSubclass.splice(index2, 1)
            setState(state + 1)
        }
    }

    return (
        <div className="cabinet-side">
            <div className="filter-worldbook">
                {
                    subclasses && subclasses.subClasses.map((e, i) => (
                        <div key={i} className="worldbook-filter">
                            <a href="/categories/books"><h3 className="grey-text"><i className="fas fa-chevron-left"></i> {e.name}</h3></a>
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

export default SubclassFilter

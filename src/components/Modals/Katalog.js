import { useQuery } from '@apollo/client'
import { useState } from 'react'
import hilol from './img/hilolnashr.svg'
import { ALL_CATEGORIES, SUBCATEGORIES } from './Query'

const KatalogModal = (props) => {

    const [ categoryID, setCategoryID ] = useState("16fff5ba-9d97-4f90-a2a5-00c58e742ac9")

    const { data, loading, error } = useQuery(ALL_CATEGORIES)
    const { data: subcategory, loading: subcategoryLoading, error: subcategoryError } = useQuery(SUBCATEGORIES, {
        variables: { categoryID }
    })

    const handleID = categoryID => {
        setCategoryID(categoryID)
    }

    if(!props.show){
        return null
    }
    return (
        <div className="katalog-modal" onClick={props.onClose}>
            <div className="katalog-modal-content" onClick={e=>e.stopPropagation()}>
                <div className="katalog-modal-body">
                    <div className="katalog-modal-nav">
                        { loading && <>loading</> }
                        { error && <>error</> }
                        {
                            data && data.categories.map((e, i) => (
                                <div key={i}>
                                    <h1 onClick={() => handleID(e.id)}>{e.name}</h1>
                                </div>
                            ))
                        }
                    </div>
                    <div className="katalog-body-texts">
                        { subcategoryLoading && <>subcategoryLoading</> }
                        { subcategoryError && <>subcategoryError</> }
                        {
                            subcategory && subcategory.modalSubcategory.map((e, i) => (
                                <div key={i} className="katalog-modal-body-text">
                                    <h2>{e.name}</h2>
                                    {
                                        e && e.subclass.map((s, i) => (
                                            <div key={i}>
                                                <p>{s.name}</p>
                                            </div>
                                        ))
                                    }
                                </div>
                            ))
                        }
                    </div>
                    <div className="brands-modal">
                        <div className="single-brand-modal">
                            <img src={hilol} alt=""/>
                        </div>
                        <div className="single-brand-modal">
                            <img src={hilol} alt=""/>
                        </div>
                        <div className="single-brand-modal">
                            <img src={hilol} alt=""/>
                        </div>
                        <div className="single-brand-modal">
                            <img src={hilol} alt=""/>
                        </div>
                    </div>
                    <div className="all-categ-modal-close katalog-close" onClick={props.onClose}><button>&times;</button></div> 
                </div>
            </div>
        </div>
    )
}

export default KatalogModal

import search from './img/search.svg'
import book from './img/book.svg'
import {CSSTransition} from 'react-transition-group'
import { useQuery } from '@apollo/client'
import { ALL_CATEGORIES } from './Query'

const AllCateg = props => {

    const { data, loading, error } = useQuery(ALL_CATEGORIES)

    if(!props.show){
        return null
    }
    return (
        <CSSTransition
        in={props.show}
        unmountOnExit
        timeout={{enter:0, exit:300}}>
        <div className="all-categ-modal" onClick={props.onClose}>
            <div className="all-categ-modal-content" onClick={e=>e.stopPropagation()}>
                <div className="all-categ-modal-header">
                    <div className="all-categ-modal-title"><img src={search} alt=""></img> Все категории</div> <div className="all-categ-modal-close" onClick={props.onClose}><button>&times;</button></div>  
                </div>
                <div className="all-categ-modal-body">
                    <div className="all-categ-modal-first-list">
                        { loading && <>loading</> }
                        { error && <>error</> }
                        {
                            data && data.categories.map((e, i) => (
                                <div key={i} className="all-categ-modal-item">
                                    <img src={book} alt=""></img>
                                    <span>{e.name}</span>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
        </CSSTransition>
    )
}

export default AllCateg

import {Fragment} from 'react'
import next from './img/next.svg'
import prev from './img/prev.svg'
import Stars from './img/Stars.svg'
import SingleRecommend from './SingleRecommend'

const Recommend = ({ recommend, token }) => {
    return (
        <Fragment>
            <div className="Special2">
            <h3>Рекомендации для вас</h3>
            <div className="button-popular">
            <button id="prev-btn"><img src={prev} alt=""/></button>
            <button id="next-btn"><img src={next} alt=""/></button>
            </div>
            </div>
            <hr/>
            <SingleRecommend token={token} recommend={recommend} Stars={Stars}/>
        </Fragment>
    )
}

export default Recommend

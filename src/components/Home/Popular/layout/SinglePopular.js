import book from '../img/book.svg'

const SinglePopular = ({ data }) => {
    return (
        <>
            {
                data && data.popular.map((e, i)=>(
                    <div className="single-popular" key={i}>
                        <img src={book} alt=""/>
                        <div className="popular-single-text"><h3>{e.name}</h3></div>
                    </div>
                ))
            }
        </>
    )
}

export default SinglePopular

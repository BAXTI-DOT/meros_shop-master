import { useMutation } from "@apollo/client"
import { useState } from "react"
import { CREATE_COMMENT } from "./Query"
import { useSnackbar } from 'notistack'

const OtzivModal = (props) => {
    
    const [ body, setBody ] = useState("")
    const [ rate, setRate ] = useState(1)
    const [ variant ] = useState('success')

    const { enqueueSnackbar } = useSnackbar()
  
    const [ createComment, { loading, error } ] = useMutation(CREATE_COMMENT, {
        update: ( data ) => {
            if(data) enqueueSnackbar('Izohingiz muvaffaqiyatli qoldirildi', { variant })
        }
    })

    if(loading) return <h1>loading</h1>
    if(error) return <h1>error</h1>

    const handleComment = (e) => {
        e.preventDefault()

        createComment({
            variables: {
                body,
                rate: parseInt(rate),
                productID: props.productID
            }
        })

        props.setShow(false)

    }

    if(!props.show){
        return null
    }

    return (
        <div className="otziv-modal" onClick={props.onClose}>
            <div className="otziv-modal-content" onClick={e=>e.stopPropagation()}>
                <div className="otziv-modal-header">
                    <div className="otziv-modal-title">
                        <h2>Ваша Оценка:</h2>
                    </div>
                    <div className="all-categ-modal-close" onClick={props.onClose}>
                        <button>&times;</button>
                    </div>
                </div>
                <div className="otziv-modal-body">
                    <div className="star-rate">
                        <input type="radio" defaultChecked={true} id="star1" name="rating" value={1} />
                        <input onClick={e => setRate(e.target.value)} type="radio" id="star2" name="rating" value={2} />
                        <input onClick={e => setRate(e.target.value)} type="radio" id="star3" name="rating" value={3} />
                        <input onClick={e => setRate(e.target.value)} type="radio" id="star4" name="rating" value={4} />
                        <input onClick={e => setRate(e.target.value)} type="radio" id="star5" name="rating" value={5} />

                        <label htmlFor="star1" aria-label="Banana">1 star</label>
                        <label htmlFor="star2">2 stars</label>
                        <label htmlFor="star3">3 stars</label>
                        <label htmlFor="star4">4 stars</label>
                        <label htmlFor="star5">5 stars</label>
                    </div>
                    <label>Комментарий</label>
                    <textarea onKeyUp={e => setBody(e.target.value)} id="" cols="30" rows="10" placeholder="Bпечатления о модели"></textarea>
                    <button className="btn btn-primary" onClick={handleComment}>Оставить Отзив</button>
                </div>
            </div>
        </div>
        
    )
}

export default OtzivModal

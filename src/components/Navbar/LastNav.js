import {Link} from 'react-router-dom'

const LastNav = (props) => {

    return (
        <nav className="LastNav">
            <ul>
                {
                    props && props.navbar.map((e, i) => (
                        <li key={i}><Link id={e.id} to={`/categories/${e.id}`} >{e.name}</Link></li>
                    ))
                }
            </ul>
        </nav>
    )
}

export default LastNav

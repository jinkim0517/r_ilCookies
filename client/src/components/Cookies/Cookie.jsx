import { useSelector } from 'react-redux'
import { selectCookieById } from './cookiesApiSlice'

const Cookie = ({ cookieId }) => {
    const cookie = useSelector(state => selectCookieById(state, cookieId))

    if (cookie) {
        console.log(cookie.picturePath)
        return (
            <div className='cookie'> 
                <div className='img'>
                    <img src={require(`../Assets/${cookie.picturePath}`)} alt='Loading...' />
                </div>
                <div className='content'>
                    <h1>{cookie.name}</h1>
                    <p>{cookie.description}</p>
                    <p>${cookie.price}</p>
                </div>
            </div>
        )
    }
}
export default Cookie
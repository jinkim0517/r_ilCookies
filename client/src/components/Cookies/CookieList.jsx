import { useGetCookiesQuery } from "./cookiesApiSlice"
import Cookie from './Cookie'

const CookieList = () => {

    const {
        data: cookies,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetCookiesQuery()

    let content

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {
    const { ids } = cookies
        content = <div className="cookiesSection"> 
            <h1>Our Cookies</h1>
            <div className="cookies">
            {
                ids?.length
                ? ids.map(cookieId => <Cookie key={cookieId} cookieId={cookieId} />)
                : null
            }
            </div>
        </div>
    }

    return content
}
export default CookieList
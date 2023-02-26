import axios from '../api/axios'
import useAuth from './useAuth'

const useRefreshToken = () => {
    const {auth,setAuth} = useAuth()
    console.log(auth)

    const refresh = async() => {
        const response = await axios.get('/refresh',{
            withCredentials: true
        })
        setAuth(() =>{
            console.log(response.data.accessToken)
            return {
                username: response.data.username,
                roles: response.data.roles,
                accessToken:response.data.accessToken
            }
        })
        return response.data.accessToken
    }
    console.log(auth)
  return refresh
}

export default useRefreshToken
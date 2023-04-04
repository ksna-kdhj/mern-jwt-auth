import { setCredentials,selectToken,selectUser } from '../features/auth/authSlice'
import { useDispatch,useSelector } from 'react-redux'
import { useRefreshMutation } from '../features/auth/authApiSlice'
import { selectColorMode } from '../features/ToggleColorModeSlice'
const useRefreshToken = () => {
    console.log('refreshed')
    const dispatch = useDispatch()
    const[refresh] = useRefreshMutation()
    console.log(useSelector(selectColorMode))
    const Refresh = async() => {
        const response = await refresh()
        console.log(response.data.accessToken)
        const user = response.data.username
        dispatch(setCredentials({user,accessToken:response.data.accessToken}))
    }
    // console.log(useSelector(selectToken))
  return Refresh
}

export default useRefreshToken
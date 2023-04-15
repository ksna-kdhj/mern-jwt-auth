import {Outlet} from 'react-router-dom'
import { useState,useEffect } from 'react'
import useRefreshToken from '../hooks/useRefreshToken'
import useLocalStorage from '../hooks/useLocalStorage'
import { selectToken,selectUser } from '../features/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import useLogout from '../hooks/useLogout'
import { clearCredentials } from '../features/auth/authSlice'
const PersistLogin = () => {
    const logout = useLogout()
    const [isLoading,setIsLoading] = useState(true)
    const refresh = useRefreshToken()
    const token = useSelector(selectToken)
    const user = useSelector(selectUser)
    const dispatch = useDispatch()
    console.log(token)
    const[persist]=useLocalStorage('persist',false)
    console.log(persist)
    useEffect(()=>{
        let isMounted = true
        const verifyRefreshToken = async () =>{
            try{
                console.log(`at refresh user:${user}`)
                await refresh()
            }catch(error){
                console.error(error)
            }
            finally{
                isMounted && setIsLoading(false)
            }
        }
        const signOut = async () => {
            dispatch(clearCredentials())
            await logout()
            // navigate('/linkpage');
        }
        
        (persist&&!token)?
         verifyRefreshToken():setIsLoading(false)

        return () => isMounted = false
    },[])
  return (
    <>
    {!persist?
    <Outlet/>:
    isLoading?
    <p>Loading...</p>:
    <Outlet/>}</>
  )
}

export default PersistLogin

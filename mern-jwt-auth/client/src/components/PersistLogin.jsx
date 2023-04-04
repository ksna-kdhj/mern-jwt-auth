import {Outlet} from 'react-router-dom'
import { useState,useEffect } from 'react'
import useRefreshToken from '../hooks/useRefreshToken'
import useLocalStorage from '../hooks/useLocalStorage'
import { selectToken } from '../features/auth/authSlice'
import { useSelector } from 'react-redux'
const PersistLogin = () => {
    const [isLoading,setIsLoading] = useState(true)
    const refresh = useRefreshToken()
    const token = useSelector(selectToken)
    console.log(token)
    const[persist]=useLocalStorage('persist',false)
    useEffect(()=>{
        let isMounted = true
        const verifyRefreshToken = async () =>{
            try{
                await refresh()
            }catch(error){
                console.error(error)
            }
            finally{
                isMounted && setIsLoading(false)
            }
        }
        !token?
        verifyRefreshToken(): setIsLoading(false)

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

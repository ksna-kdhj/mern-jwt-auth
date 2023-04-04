import { useLocation, Navigate, Outlet } from "react-router-dom"
import jwt_decode from 'jwt-decode'
import { useSelector } from "react-redux"
import { selectToken,selectUser } from "../features/auth/authSlice"


const RequireAuth = ({allowedRoles}) =>{
    const user = useSelector(selectUser)
    const token = useSelector(selectToken)
    console.log(token)
    const location = useLocation()
    const decodeToken =  ()=>{
    const decoded =  jwt_decode(token)
    return decoded
    }
    const decoded = token?decodeToken(token):undefined
    console.log(decoded)

    const roles = decoded?.UserInfo?.roles||[]
    console.log(roles)
    
    
    return(
    roles.find(role => allowedRoles?.includes(role))?<Outlet/>
    : user?
     <Navigate to="/unauthorized" state={{from:location}} replace/>:<Navigate to='/login' state={{from: location}} replace/>
    )
}

export default RequireAuth

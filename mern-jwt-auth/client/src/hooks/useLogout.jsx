import { useDispatch,useSelector } from "react-redux"
import { useLogoutMutation } from "../features/auth/authApiSlice"
const useLogout =() =>{
    console.log('at logout')
    const [logout] = useLogoutMutation()
    const logOut = async() =>{
        try{
            const response = await logout().unwrap()
        }catch(err){
            console.error(err)
        }
    }
    console.log(useSelector(state=>state.auth))
    return logOut
}
export default useLogout
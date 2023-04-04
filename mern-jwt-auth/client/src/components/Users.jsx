import { useNavigate, useLocation } from "react-router-dom"
import { useUsersQuery } from "../features/auth/authApiSlice"
import CircularProgress from '@mui/material/CircularProgress';
const Users =() =>{
    const {data:users,
    isLoading,
isError} = useUsersQuery()
    const location = useLocation()
    const navigate = useNavigate()
     return(isLoading?<CircularProgress color="secondary"/>:
        <article>
            <h2>Users List</h2>
            {users?.length?(
                <ul>
                {users.map((user, i) => <li key={i}>{user.username}</li>)}
                </ul>
            
            ):(
                <p>
                    No users to display
                </p>
            )
        }
        {/* <button onClick={()=> refresh()}>Refresh</button> */}
        </article>
     )

}

export default Users
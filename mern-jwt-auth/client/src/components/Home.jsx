import { useNavigate, Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import { useDispatch, useSelector } from "react-redux"
import { selectToken } from "../features/auth/authSlice"
import { clearCredentials } from "../features/auth/authSlice"
const Home = () => {
    const dispatch = useDispatch()
    const token = useSelector(selectToken)    
    console.log(token)
    const navigate = useNavigate()
    const logout = useLogout()

    const signOut = async () => {
        dispatch(clearCredentials())
        await logout()
        navigate('/linkpage');
    }

    return (
        <section>
            <h1>Home</h1>
            <br />
            <p>You are logged in!</p>
            <br />
            <Link to="/editor">Go to the Editor page</Link>
            <br />
            <Link to="/admin">Go to the Admin page</Link>
            <br />
            <Link to="/lounge">Go to the Lounge</Link>
            <br />
            <Link to="/StudyTracker">Go to study tracker page</Link>
            <br />
            <div className="flexGrow">
                <button onClick={signOut}>Sign Out</button>
            </div>
        </section>
    )
}

export default Home

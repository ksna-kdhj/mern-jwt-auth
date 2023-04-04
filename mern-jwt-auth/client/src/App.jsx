import Register from './components/Register'
import Login from './components/Login'
import {Routes,Route} from 'react-router-dom'
import Layout from './components/Layout'
import Admin from './components/Admin'
import RequireAuth from './components/RequireAuth'
import Missing from './components/Missing'
import Editor from './components/Editor'
import Lounge from './components/Lounge'
import Home from './components/Home'
import LinkPage from './components/LinkPage'
import Unauthorized from './components/Unauthorized'
import PersistLogin from './components/PersistLogin'
import './index.css'
// import StudyTimeTracker from './components/StudyTimeTracker'

function App() {
  // const [count, setCount] = useState(0)

  return (
  <Routes>
    {/* <Route element={<ToggleColorMode/>}> */}
    <Route path="/" element={<Layout/>}>
    {/* public routes */}
    <Route path="linkPage" element = {<LinkPage/>}></Route>
    <Route path="login" element={<Login/>}></Route>
    <Route path="register" element={<Register/>}></Route>
    <Route path="unauthorized" element = {<Unauthorized/>}></Route>
    {/* <Route path="NavBar" element={<NavBar/>}></Route> */}
    {/* protected routes */}
    <Route element={<PersistLogin/>}>
    
    <Route element={<RequireAuth allowedRoles={[2001]}/>}>
    <Route path="/" element = {<Home/>}/>
    </Route>
    <Route element={<RequireAuth allowedRoles={[1984]}/>}>
    <Route path="Editor" element={<Editor/>}></Route>
    </Route>
    <Route element={<RequireAuth allowedRoles={[150]}/>}>
    <Route path="Admin" element={<Admin/>}></Route>
    </Route>
    <Route element={<RequireAuth allowedRoles={[1984,150]}/>}>
    <Route path="Lounge" element={<Lounge/>}></Route>
    </Route>
    </Route>
    {/* Catch all other paths */}
    <Route path="*" element={<Missing/>}></Route>
    </Route>
    {/* </Route> */}
  </Routes>
  )
}

export default App

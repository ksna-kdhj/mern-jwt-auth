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
import Profile from './components/Profile'
import NoteShare from './components/noteShare'
// import StudyTimeTracker from './components/StudyTimeTracker'

function App() {
  // const [count, setCount] = useState(0)

  return (
  <Routes>
    {/* <Route element={<ToggleColorMode/>}> */}
    
    {/* public routes */}
    
    {/* <Route path="NavBar" element={<NavBar/>}></Route> */}
    {/* protected routes */}
    <Route element={<PersistLogin/>}>
    <Route path="/" element={<Layout/>}>
    <Route path="linkPage" element = {<LinkPage/>}></Route>
    <Route path="login" element={<Login/>}></Route>
    <Route path="register" element={<Register/>}></Route>
    <Route path="unauthorized" element = {<Unauthorized/>}></Route>
    <Route element={<RequireAuth allowedRoles={[2001]}/>}> 
    <Route path="/" element = {<Home/>}/>
    <Route path='profile' element={<Profile/>}/>
    <Route path='NoteShare' element={<NoteShare/>}/>
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
    <Route path="*" element={<Missing/>}></Route>
    </Route>
    {/* Catch all other paths */}
    
    </Route>
    {/* </Route> */}
  </Routes>
  )
}

export default App

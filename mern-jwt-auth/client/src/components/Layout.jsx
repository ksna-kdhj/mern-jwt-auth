import { Outlet } from "react-router-dom"
import NavBar from "./Page template/NavBar"
const Layout = () => {
  return (
    <>
    <NavBar/>
    <main className="App">
        <Outlet/>
    </main>
    </>
  )
}

export default Layout

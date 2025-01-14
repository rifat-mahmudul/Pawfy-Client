import { Outlet } from "react-router"
import Navbar from "../components/Nav/Navbar"

const Main = () => {
  return (
    <div>
        <Navbar></Navbar>
        <main>
          <Outlet></Outlet>
        </main>
    </div>
  )
}

export default Main

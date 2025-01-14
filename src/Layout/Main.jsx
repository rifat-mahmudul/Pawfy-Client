import { Outlet } from "react-router"
import Navbar from "../components/Nav/Navbar"

const Main = () => {
  return (
    <div>
        <section>
          <Navbar></Navbar>
        </section>
        
        <main>
          <Outlet></Outlet>
        </main>
    </div>
  )
}

export default Main

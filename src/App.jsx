
import { Outlet } from "react-router-dom"
import NavBar from "./Components/NavBar/NavBar"
import Footer from "./Components/Home/Footer"



function App() {


  return (
    <div className="w-11/12 mx-auto" >
      <NavBar></NavBar>
      <Outlet></Outlet>
      <Footer></Footer>

    </div>
  )
}

export default App

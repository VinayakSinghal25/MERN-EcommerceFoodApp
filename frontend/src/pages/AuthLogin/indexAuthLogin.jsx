import { Login } from "../../components/Login/indexLogin"
import Navbar from "../../components/Navbar"

export const AuthLogin = () =>{
    return(
        <>
        <Navbar/>
        <main className="flex justify-center items-center mt-32">
            <Login/>
        </main>
        
        </>
    )
}
import Header from "./components/Header"
import Login from "./components/Login"
import Navbar from "./components/Navbar"

export default function LogIn(){
    return(
        <>
        <Navbar/>
            <div className="container mx-auto sm:w-1/2 md:w-1/3 lg:w-1/4 bg-black rounded-md mt-56 p-4"> 
                <Header
                    heading="Login to your account"
                    paragraph="Don't have an account yet? "
                    linkName="Sign Up!"
                    linkUrl="/signup"
                    />
                <Login/>
        </div>
        </>
    )
}

import Login from "./Login";
import Header from "./Header";

export default function LogIn() {
  return(
    <>
      <Header 
       heading="Login to your account"
       paragraph="Don't have an account yet?"
       linkName="Signup"
       linkUrl="/signup"
      />
    <Login/>
    </>
  )
}

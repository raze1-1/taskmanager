import Header from "./components/Header";
import Signup from "./components/Signup";
import Navbar from "./components/Navbar";

export default function SignUp() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto sm:w-1/2 md:w-1/3 lg:w-1/4 bg-black rounded-md mt-40 p-4">
        <Header
          heading="Create an account"
          paragraph="Already have an account?"
          linkName="Login!"
          linkUrl="/login"
        />
        <Signup />
      </div>
    </>
  );
}

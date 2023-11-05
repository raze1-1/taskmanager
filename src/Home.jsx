// In your Home.js or any other component where you want to provide navigation
import { Link } from 'react-router-dom';
import { Button } from '@material-tailwind/react';
import Navbar from './Navbar'

function Home() {
  return (
    <>
      <Navbar />
        <div className='text-white justify-center items-center flex flex-col min-h-screen'>
          <h2 className='text-4xl'>Welcome to 2Do</h2>
          <p className='text-sm md:text-sm text-center mt-5'>2Do is a task management application that allows you to manage tasks effectively.</p>
          <Link className='mt-3' to="/tasks">
            <Button
            className='mt-5'
            color="white"
            >
            Go to Task Manager
            </Button>
            </Link>
        </div>
      </>
  );
}

export default Home;
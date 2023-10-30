// In your Home.js or any other component where you want to provide navigation
import { Link } from 'react-router-dom';
import { Button } from '@material-tailwind/react';

function Home() {
  return (
    <div className='text-white justify-center items-center flex flex-col min-h-screen'>
      <h2 className='text-4xl'>Welcome to 2Do</h2>
      <p className='text-sm text-left mt-5'>2Do is a task management application that allows you to manage tasks effectively.</p>
      <Link className='mt-3' to="/tasks">
        <Button
        className='mt-5'
        color="white"
        >
        Go to Task Manager
        </Button>
        </Link>
    </div>
  );
}

export default Home;
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  return (
    <header className='bg-slate-200 shadow-md navig'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
          <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-slate-500'>Ali</span>
            <span className='text-slate-700'>Mento</span>
          </h1>
        </Link>
        <ul className='flex gap-4'>
          <Link to='/'>
            <li className='hidden sm:inline text-slate-700 hover:underline'>
              Home
            </li>
          </Link>
          <Link to='/about'>
            <li className='hidden sm:inline text-slate-700 hover:underline'>
              About
            </li>
          </Link>
          <Link to='/restaurantsignIn'>
            <li className='hidden sm:inline text-slate-700 hover:underline'>
              Restaurant
            </li>
          </Link>
          <Link to='/NGOsignIn'>
            <li className='hidden sm:inline text-slate-700 hover:underline'>
              NGO
            </li>
          </Link>
          {/* <Link to='/profile'>
            {currentUser ? (
              <img
                className='rounded-full h-7 w-7 object-cover'
                src={currentUser.avatar}
                alt='profile'
              />
            ) : (
              <li className=' text-slate-700 hover:underline'> </li>
            )}
          </Link> */}
        </ul>
      </div>
    </header>
  )
}
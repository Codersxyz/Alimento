import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import { useDispatch } from 'react-redux';
import {
  deleteUserFailure,
  deleteUserSuccess,
  signOutUserStart,
} from '../redux/user/userSlice';
export default function Header() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Check sessionStorage for user info on component mount
  useEffect(() => {
    const savedUser = sessionStorage.getItem('user');
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const handleRestaurantClick = () => {
    if (!user) {
      setUser('Restaurant');
      sessionStorage.setItem('user', 'Restaurant'); // Save user to sessionStorage
      navigate('/restaurantsignIn'); // Redirect to sign-in page
    }
  };

  const handleNGOClick = () => {
    if (!user) {
      setUser('NGO');
      sessionStorage.setItem('user', 'NGO'); // Save user to sessionStorage
      navigate('/NGOsignIn'); // Redirect to sign-in page
    }
  };

  const handleRestaurantSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/Restaurantauth/Restaurantsignout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
      setUser(null); // Reset the user state to null when signing out
      sessionStorage.removeItem('user'); // Remove user from sessionStorage
      navigate('/'); // Navigate to the homepage or sign in page
    } catch (error) {
      dispatch(deleteUserFailure(data.message));
    }
  };

  const handleNGOSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/NGOauth/NGOsignout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
      setUser(null); // Reset the user state to null when signing out
      sessionStorage.removeItem('user'); // Remove user from sessionStorage
      navigate('/'); // Navigate to the homepage or sign in page
    } catch (error) {
      dispatch(deleteUserFailure(data.message));
    }
  };

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
          {user === 'Restaurant' && (
            <>
              <Link to='/FoodDonatePage'>
                <li className='hidden sm:inline text-slate-700 hover:underline'>
                  Food Donate
                </li>
              </Link>
              <li onClick={handleRestaurantSignOut} className='hidden sm:inline text-slate-700 hover:underline'>
                Sign Out
              </li>
            </>
          )}
          {user === 'NGO' && (
            <>
              <Link to='/NGODashboard'>
                <li className='hidden sm:inline text-slate-700 hover:underline'>
                  Donations
                </li>
              </Link>
              <li onClick={handleNGOSignOut} className='hidden sm:inline text-slate-700 hover:underline'>
                Sign Out
              </li>
            </>
          )}
          {!user && (
            <>
              <Link to='/restaurantsignIn' onClick={handleRestaurantClick}>
                <li className='hidden sm:inline text-slate-700 hover:underline'>
                  Restaurant
                </li>
              </Link>
              <Link to='/NGOsignIn' onClick={handleNGOClick}>
                <li className='hidden sm:inline text-slate-700 hover:underline'>
                  NGO
                </li>
              </Link>
            </>
          )}
        </ul>
      </div>
    </header>
  );
}

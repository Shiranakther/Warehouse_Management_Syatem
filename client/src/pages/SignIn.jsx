import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import { signInStaffStart, signInStaffSuccess, signInStaffFailure } from '../redux/staff/staffSlice';
import { setUserType } from '../redux/access/accessSlice';

export default function SignIn() {
  const [formData, setFormData] = useState({ userType: 'user' }); // Default user type is 'user'
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data));
        return;
      }
  
      // Check if user is staff
      if (data.isStaff) {
        dispatch(signInStaffStart());
        dispatch(signInStaffSuccess(data)); // Pass data to staff slice
      } else {
        dispatch(signInSuccess(data));
      }
  
      // Ensure that the loading state is set to false after sign-in completes
      dispatch(signInSuccess(data));
      
      const userType = formData.userType;
      dispatch(setUserType(userType)); // Dispatch setUserType action
      navigate('/');

    } catch (error) {
      dispatch(signInFailure(error));
      dispatch(signInStaffFailure(error)); 
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen' style={{ background: 'linear-gradient(to bottom right, #2c3e50, #000000)' }}>
      <div className='p-10 w-4/5 md:w-3/5 lg:w-2/5 xl:w-1/ mx-auto bg-gray-800 bg-opacity-75 rounded-lg shadow-2xl'>
      <h1 className='text-3xl text-center font-semibold text-white mb-8' style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.4)' }}>LOGIN</h1>

        <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
          <select
            id='userType'
            className='p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:ring-blue-400'
            value={formData.userType}
            onChange={handleChange}
          >
            <option value='user'>Admin</option>
            <option value='staff'>Supervisor</option>
          </select>
          <input
            type='email'
            placeholder='Email'
            id='email'
            className='p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:ring-blue-400'
            onChange={handleChange}
            autoComplete="username"
          />
          <input
            type='password'
            placeholder='Password'
            id='password'
            className='p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:ring-blue-400'
            onChange={handleChange}
            autoComplete="current-password"
          />

          <button
            disabled={loading}
            className='p-3 bg-blue-900 text-white rounded-lg uppercase hover:bg-blue-800 disabled:opacity-80 focus:outline-none focus:ring focus:ring-blue-400 transition duration-300'
          >
            {loading ? 'Loading...' : 'Login'}
          </button>
        </form>
        <p className='text-red-700 mt-5'>{error ? error.message || 'Something went wrong!' : ''}</p>
      </div>
    </div>

  );
}

// PrivateRoute.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import Header from './Header';
import Dashboard from './Dashboard';

export default function PrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser ? (
    <>
      <Header />
      <Dashboard />
      <Outlet />
    </>
  ) : (
    <Navigate to='/sign-in' />
  );
}

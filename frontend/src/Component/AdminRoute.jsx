import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function AdminRoute() {
  const { userInfo } = useSelector((state) => state.auth);
  console.log(userInfo);
  return userInfo && userInfo.isAdmin ? <Outlet /> : <Navigate to='/login' replace />;
}

export default AdminRoute;
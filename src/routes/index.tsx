import { Navigate, Route, Routes } from 'react-router-dom';

import { useAuth } from '../hooks/auth';
import Dashboard from '../pages/Dashboard';
import ForgotPassword from '../pages/ForgotPassword';
import Profile from '../pages/Profile';
import ResetPassword from '../pages/ResetPassword';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

const AuthRoutes = () => (
  <Routes>
    <Route path="/" element={<SignIn />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/reset-password" element={<ResetPassword />} />
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);

const AppRoutes = () => (
  <Routes>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="*" element={<Navigate to="/dashboard" />} />
  </Routes>
);

const RouteSwitcher = () => {
  const { user } = useAuth();

  return user ? <AppRoutes /> : <AuthRoutes />;
};

export default RouteSwitcher;

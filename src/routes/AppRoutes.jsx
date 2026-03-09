import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '../contexts/authStore';
import LoginPage from '../pages/LoginPage';
import CitizenDashboard from '../pages/CitizenDashboard';
import CoordinatorDashboard from '../pages/CoordinatorDashboard';
import RescueTeamDashboard from '../pages/RescueTeamDashboard';
import ManagerDashboard from '../pages/ManagerDashboard';
import AdminDashboard from '../pages/AdminDashboard';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user, isLoading } = useAuthStore();

  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" />;
  }

  return children;
};

function AppRoutes() {
  const { user } = useAuthStore();

  const getDashboardByRole = () => {
    switch (user?.role) {
      case 'CITIZEN': return <CitizenDashboard />;
      case 'COORDINATOR': return <CoordinatorDashboard />;
      case 'RESCUE_TEAM': return <RescueTeamDashboard />;
      case 'MANAGER': return <ManagerDashboard />;
      case 'ADMIN': return <AdminDashboard />;
      default: return <Navigate to="/login" />;
    }
  };

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<ProtectedRoute>{getDashboardByRole()}</ProtectedRoute>} />
      <Route path="/citizen/*" element={<ProtectedRoute allowedRoles={['CITIZEN']}><CitizenDashboard /></ProtectedRoute>} />
      <Route path="/coordinator/*" element={<ProtectedRoute allowedRoles={['COORDINATOR']}><CoordinatorDashboard /></ProtectedRoute>} />
      <Route path="/rescue-team/*" element={<ProtectedRoute allowedRoles={['RESCUE_TEAM']}><RescueTeamDashboard /></ProtectedRoute>} />
      <Route path="/manager/*" element={<ProtectedRoute allowedRoles={['MANAGER']}><ManagerDashboard /></ProtectedRoute>} />
      <Route path="/admin/*" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminDashboard /></ProtectedRoute>} />
    </Routes>
  );
}

export default AppRoutes;

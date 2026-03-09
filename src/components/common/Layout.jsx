import { useAuthStore } from '../../contexts/authStore';
import './layout.css';

function Layout({ children, title }) {
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="layout">
      <header className="header">
        <div className="header-content">
          <h1>Flood Rescue System</h1>
          <div className="user-info">
            <span>{user?.fullName || user?.username}</span>
            <span className="badge">{user?.role}</span>
            <button onClick={handleLogout} className="btn btn-logout">Đăng xuất</button>
          </div>
        </div>
      </header>
      
      <main className="main-content">
        {title && <h2 className="page-title">{title}</h2>}
        {children}
      </main>
    </div>
  );
}

export default Layout;

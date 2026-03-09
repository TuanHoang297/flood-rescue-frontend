import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Layout from '../components/common/Layout';
import api from '../services/api';
import { API_ENDPOINTS } from '../config/api';

function AdminDashboard() {
  const [showUserForm, setShowUserForm] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    fullName: '',
    email: '',
    phone: '',
    role: 'CITIZEN'
  });

  const queryClient = useQueryClient();

  const { data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await api.get(API_ENDPOINTS.USERS.LIST);
      return response.data;
    }
  });

  const createUserMutation = useMutation({
    mutationFn: (data) => api.post(API_ENDPOINTS.USERS.CREATE, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      setShowUserForm(false);
      setFormData({
        username: '',
        password: '',
        fullName: '',
        email: '',
        phone: '',
        role: 'CITIZEN'
      });
    }
  });

  const deleteUserMutation = useMutation({
    mutationFn: (id) => api.delete(API_ENDPOINTS.USERS.DELETE(id)),
    onSuccess: () => queryClient.invalidateQueries(['users'])
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createUserMutation.mutate(formData);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc muốn xóa người dùng này?')) {
      deleteUserMutation.mutate(id);
    }
  };

  return (
    <Layout title="Quản trị hệ thống">
      <div className="card">
        <button 
          onClick={() => setShowUserForm(!showUserForm)}
          className="btn btn-primary"
        >
          {showUserForm ? 'Đóng form' : 'Thêm người dùng mới'}
        </button>

        {showUserForm && (
          <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div className="form-group">
                <label>Tên đăng nhập *</label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Mật khẩu *</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Họ tên *</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Số điện thoại</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Vai trò *</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  required
                >
                  <option value="CITIZEN">Người dân</option>
                  <option value="COORDINATOR">Điều phối viên</option>
                  <option value="RESCUE_TEAM">Đội cứu hộ</option>
                  <option value="MANAGER">Quản lý</option>
                  <option value="ADMIN">Quản trị</option>
                </select>
              </div>
            </div>

            <button type="submit" className="btn btn-success" disabled={createUserMutation.isPending}>
              {createUserMutation.isPending ? 'Đang tạo...' : 'Tạo người dùng'}
            </button>
          </form>
        )}
      </div>

      <div className="card">
        <h3>Danh sách người dùng</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Tên đăng nhập</th>
              <th>Họ tên</th>
              <th>Email</th>
              <th>Số điện thoại</th>
              <th>Vai trò</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.fullName}</td>
                <td>{user.email || '-'}</td>
                <td>{user.phone || '-'}</td>
                <td>
                  <span className="badge">{user.role}</span>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="btn btn-danger"
                    disabled={user.role === 'ADMIN'}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default AdminDashboard;

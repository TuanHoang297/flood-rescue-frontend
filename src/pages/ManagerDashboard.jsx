import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Layout from '../components/common/Layout';
import api from '../services/api';
import { API_ENDPOINTS } from '../config/api';

function ManagerDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const queryClient = useQueryClient();

  const { data: stats } = useQuery({
    queryKey: ['statistics'],
    queryFn: async () => {
      const response = await api.get(API_ENDPOINTS.STATISTICS.DASHBOARD);
      return response.data;
    }
  });

  const { data: vehicles = [] } = useQuery({
    queryKey: ['vehicles'],
    queryFn: async () => {
      const response = await api.get(API_ENDPOINTS.VEHICLES.LIST);
      return response.data;
    }
  });

  const { data: supplies = [] } = useQuery({
    queryKey: ['supplies'],
    queryFn: async () => {
      const response = await api.get(API_ENDPOINTS.SUPPLIES.LIST);
      return response.data;
    }
  });

  return (
    <Layout title="Quản lý tổng hợp">
      <div className="card">
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <button 
            onClick={() => setActiveTab('overview')}
            className={`btn ${activeTab === 'overview' ? 'btn-primary' : ''}`}
          >
            Tổng quan
          </button>
          <button 
            onClick={() => setActiveTab('vehicles')}
            className={`btn ${activeTab === 'vehicles' ? 'btn-primary' : ''}`}
          >
            Phương tiện
          </button>
          <button 
            onClick={() => setActiveTab('supplies')}
            className={`btn ${activeTab === 'supplies' ? 'btn-primary' : ''}`}
          >
            Hàng cứu trợ
          </button>
        </div>

        {activeTab === 'overview' && (
          <div>
            <h3>Thống kê tổng quan</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '20px' }}>
              <div className="card" style={{ background: '#e3f2fd' }}>
                <h4>Yêu cầu chờ xử lý</h4>
                <p style={{ fontSize: '32px', fontWeight: 'bold' }}>{stats?.pendingRequests || 0}</p>
              </div>
              <div className="card" style={{ background: '#fff3e0' }}>
                <h4>Đang cứu hộ</h4>
                <p style={{ fontSize: '32px', fontWeight: 'bold' }}>{stats?.inProgressRequests || 0}</p>
              </div>
              <div className="card" style={{ background: '#e8f5e9' }}>
                <h4>Đã hoàn thành</h4>
                <p style={{ fontSize: '32px', fontWeight: 'bold' }}>{stats?.completedRequests || 0}</p>
              </div>
              <div className="card" style={{ background: '#f3e5f5' }}>
                <h4>Tổng số người cứu</h4>
                <p style={{ fontSize: '32px', fontWeight: 'bold' }}>{stats?.totalPeopleRescued || 0}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'vehicles' && (
          <div>
            <h3>Quản lý phương tiện</h3>
            <table className="table">
              <thead>
                <tr>
                  <th>Tên phương tiện</th>
                  <th>Loại</th>
                  <th>Biển số</th>
                  <th>Trạng thái</th>
                  <th>Đội đang sử dụng</th>
                </tr>
              </thead>
              <tbody>
                {vehicles.map((vehicle) => (
                  <tr key={vehicle.id}>
                    <td>{vehicle.name}</td>
                    <td>{vehicle.type}</td>
                    <td>{vehicle.licensePlate}</td>
                    <td>
                      <span className={`badge ${vehicle.status === 'AVAILABLE' ? 'badge-completed' : 'badge-in-progress'}`}>
                        {vehicle.status}
                      </span>
                    </td>
                    <td>{vehicle.assignedTeam || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'supplies' && (
          <div>
            <h3>Quản lý hàng cứu trợ</h3>
            <table className="table">
              <thead>
                <tr>
                  <th>Tên hàng</th>
                  <th>Đơn vị</th>
                  <th>Tồn kho</th>
                  <th>Đã phân phối</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {supplies.map((supply) => (
                  <tr key={supply.id}>
                    <td>{supply.name}</td>
                    <td>{supply.unit}</td>
                    <td>{supply.quantity}</td>
                    <td>{supply.distributed}</td>
                    <td>
                      <span className={`badge ${supply.quantity > 100 ? 'badge-completed' : supply.quantity > 50 ? 'badge-medium' : 'badge-urgent'}`}>
                        {supply.quantity > 100 ? 'Đủ' : supply.quantity > 50 ? 'Trung bình' : 'Thiếu'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default ManagerDashboard;

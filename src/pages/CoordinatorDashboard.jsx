import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Layout from '../components/common/Layout';
import Map from '../components/common/Map';
import api from '../services/api';
import { API_ENDPOINTS } from '../config/api';

function CoordinatorDashboard() {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const queryClient = useQueryClient();

  const { data: requests = [] } = useQuery({
    queryKey: ['allRequests'],
    queryFn: async () => {
      const response = await api.get(API_ENDPOINTS.RESCUE_REQUESTS.LIST);
      return response.data;
    }
  });

  const { data: teams = [] } = useQuery({
    queryKey: ['teams'],
    queryFn: async () => {
      const response = await api.get(API_ENDPOINTS.TEAMS.LIST);
      return response.data;
    }
  });

  const verifyMutation = useMutation({
    mutationFn: (id) => api.put(API_ENDPOINTS.RESCUE_REQUESTS.UPDATE_STATUS(id), { status: 'VERIFIED' }),
    onSuccess: () => queryClient.invalidateQueries(['allRequests'])
  });

  const assignMutation = useMutation({
    mutationFn: ({ requestId, teamId }) => 
      api.post(API_ENDPOINTS.RESCUE_REQUESTS.ASSIGN(requestId), { teamId }),
    onSuccess: () => {
      queryClient.invalidateQueries(['allRequests']);
      setSelectedRequest(null);
    }
  });

  const markers = requests
    .filter(r => r.latitude && r.longitude)
    .map(r => ({
      lat: r.latitude,
      lng: r.longitude,
      title: r.location,
      description: `${r.urgencyLevel} - ${r.status}`
    }));

  return (
    <Layout title="Điều phối cứu hộ">
      <div className="card">
        <h3>Bản đồ yêu cầu cứu hộ</h3>
        <div className="map-container">
          <Map markers={markers} />
        </div>
      </div>

      <div className="card">
        <h3>Danh sách yêu cầu cần xử lý</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Địa điểm</th>
              <th>Người yêu cầu</th>
              <th>Mức độ</th>
              <th>Số người</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id}>
                <td>{req.location}</td>
                <td>{req.citizenName}</td>
                <td>
                  <span className={`badge badge-${req.urgencyLevel.toLowerCase()}`}>
                    {req.urgencyLevel}
                  </span>
                </td>
                <td>{req.numberOfPeople}</td>
                <td>
                  <span className={`badge badge-${req.status.toLowerCase()}`}>
                    {req.status}
                  </span>
                </td>
                <td>
                  {req.status === 'PENDING' && (
                    <button 
                      onClick={() => verifyMutation.mutate(req.id)}
                      className="btn btn-primary"
                      style={{ marginRight: '5px' }}
                    >
                      Xác minh
                    </button>
                  )}
                  {req.status === 'VERIFIED' && (
                    <button 
                      onClick={() => setSelectedRequest(req)}
                      className="btn btn-success"
                    >
                      Phân công
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedRequest && (
        <div className="card">
          <h3>Phân công đội cứu hộ cho: {selectedRequest.location}</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '15px' }}>
            {teams.map((team) => (
              <div key={team.id} className="card" style={{ cursor: 'pointer' }}>
                <h4>{team.name}</h4>
                <p>Thành viên: {team.memberCount}</p>
                <p>Trạng thái: {team.status}</p>
                <button
                  onClick={() => assignMutation.mutate({ requestId: selectedRequest.id, teamId: team.id })}
                  className="btn btn-primary"
                  disabled={team.status !== 'AVAILABLE'}
                >
                  Phân công
                </button>
              </div>
            ))}
          </div>
          <button onClick={() => setSelectedRequest(null)} className="btn" style={{ marginTop: '15px' }}>
            Hủy
          </button>
        </div>
      )}
    </Layout>
  );
}

export default CoordinatorDashboard;

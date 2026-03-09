import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Layout from '../components/common/Layout';
import Map from '../components/common/Map';
import api from '../services/api';
import { API_ENDPOINTS } from '../config/api';

function RescueTeamDashboard() {
  const queryClient = useQueryClient();

  const { data: missions = [] } = useQuery({
    queryKey: ['myMissions'],
    queryFn: async () => {
      const response = await api.get(API_ENDPOINTS.RESCUE_REQUESTS.LIST + '?assigned=true');
      return response.data;
    }
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status, notes }) => 
      api.put(API_ENDPOINTS.RESCUE_REQUESTS.UPDATE_STATUS(id), { status, notes }),
    onSuccess: () => queryClient.invalidateQueries(['myMissions'])
  });

  const handleUpdateStatus = (id, status) => {
    const notes = prompt('Ghi chú (tùy chọn):');
    updateStatusMutation.mutate({ id, status, notes: notes || '' });
  };

  const markers = missions
    .filter(m => m.latitude && m.longitude)
    .map(m => ({
      lat: m.latitude,
      lng: m.longitude,
      title: m.location,
      description: m.description
    }));

  return (
    <Layout title="Nhiệm vụ cứu hộ">
      <div className="card">
        <h3>Bản đồ nhiệm vụ</h3>
        <div className="map-container">
          <Map markers={markers} />
        </div>
      </div>

      <div className="card">
        <h3>Danh sách nhiệm vụ được phân công</h3>
        {missions.length === 0 ? (
          <p>Chưa có nhiệm vụ nào được phân công</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Địa điểm</th>
                <th>Mô tả</th>
                <th>Mức độ</th>
                <th>Số người</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {missions.map((mission) => (
                <tr key={mission.id}>
                  <td>
                    <strong>{mission.location}</strong>
                    {mission.latitude && mission.longitude && (
                      <div style={{ fontSize: '12px', color: '#666' }}>
                        {mission.latitude}, {mission.longitude}
                      </div>
                    )}
                  </td>
                  <td>{mission.description}</td>
                  <td>
                    <span className={`badge badge-${mission.urgencyLevel.toLowerCase()}`}>
                      {mission.urgencyLevel}
                    </span>
                  </td>
                  <td>{mission.numberOfPeople}</td>
                  <td>
                    <span className={`badge badge-${mission.status.toLowerCase()}`}>
                      {mission.status}
                    </span>
                  </td>
                  <td>
                    {mission.status === 'ASSIGNED' && (
                      <button
                        onClick={() => handleUpdateStatus(mission.id, 'IN_PROGRESS')}
                        className="btn btn-primary"
                        style={{ marginRight: '5px' }}
                      >
                        Bắt đầu
                      </button>
                    )}
                    {mission.status === 'IN_PROGRESS' && (
                      <button
                        onClick={() => handleUpdateStatus(mission.id, 'COMPLETED')}
                        className="btn btn-success"
                      >
                        Hoàn thành
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
}

export default RescueTeamDashboard;

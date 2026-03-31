import React, { useState, useEffect } from 'react';
import { mockDashboardData } from '../services/mock/mockDashboardData';

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setData(mockDashboardData);
    }, 500);
  }, []);

  return (
    <div className="dashboard-container" style={{ padding: '20px' }}>
      <h1>Dashboard Component</h1>
      <p>This component displays internal data for the Dashboard feature.</p>
      
      {data.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <div className="data-grid">
          {data.slice(0, 10).map((item) => (
            <div key={item.id} className="data-card" style={{ border: '1px solid #ddd', margin: '10px 0', padding: '15px' }}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div>
                <span style={{ fontWeight: 'bold' }}>Status:</span> {item.status}
              </div>
              <small>Created at: {new Date(item.createdAt).toLocaleDateString()}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;

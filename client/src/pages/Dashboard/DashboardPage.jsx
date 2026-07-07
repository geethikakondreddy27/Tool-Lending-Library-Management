import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import MainLayout from "../../components/layout/MainLayout";
import useAuth from "../../hooks/useAuth";
import { getDashboardStats } from "../../services/dashboardService";

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [stats, setStats] = useState({
    totalTools: 0,
    availableTools: 0,
    maintenanceTools: 0,
    totalCategories: 0,
    totalStaff: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const response = await getDashboardStats();

      setStats(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <h2 className="page-title">Dashboard</h2>

      <p className="page-subtitle">Welcome back, {user?.fullName}.</p>

      {loading ? (
        <div className="card">Loading dashboard...</div>
      ) : (
        <>
          <div className="dashboard-stats">
            <div className="card stat-card">
              <h4>Total Tools</h4>
              <h2>{stats.totalTools}</h2>
            </div>

            <div className="card stat-card">
              <h4>Available Tools</h4>
              <h2>{stats.availableTools}</h2>
            </div>

            <div className="card stat-card">
              <h4>Categories</h4>
              <h2>{stats.totalCategories}</h2>
            </div>

            {user?.role === "admin" && (
              <div className="card stat-card">
                <h4>Staff Members</h4>
                <h2>{stats.totalStaff}</h2>
              </div>
            )}
          </div>

          <div className="card">
            <h3>Quick Actions</h3>

            <p
              style={{
                marginBottom: "20px",
              }}
            >
              Manage inventory and staff from one place.
            </p>

            <div
              style={{
                display: "flex",
                gap: "15px",
                flexWrap: "wrap",
              }}
            >
              <button
                className="btn btn-primary"
                onClick={() => navigate("/tools")}
              >
                Open Tool Inventory
              </button>
            </div>
          </div>
        </>
      )}
    </MainLayout>
  );
};

export default DashboardPage;

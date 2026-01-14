import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/api";

/**
 * Dashboard Component
 * Displays different data based on user role
 */
const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        if (user.role === "client") {
          const res = await api.get("/jobs/my");
          setJobs(res.data.jobs);
        } else {
          const res = await api.get("/jobs");
          setJobs(res.data.jobs);
        }
      } catch (error) {
        console.error("Dashboard fetch error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (!user) {
    return <h3>Please login to access dashboard</h3>;
  }

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>

      <p>
        Welcome <strong>{user.name}</strong> (
        {user.role.toUpperCase()})
      </p>

      <button onClick={logout}>Logout</button>

      <hr />

      {loading ? (
        <p>Loading data...</p>
      ) : jobs.length === 0 ? (
        <p>No jobs available</p>
      ) : (
        <div>
          <h3>
            {user.role === "client"
              ? "Your Posted Jobs"
              : "Available Jobs"}
          </h3>

          {jobs.map((job) => (
            <div key={job._id} className="job-card">
              <h4>{job.title}</h4>
              <p>{job.description}</p>
              <p>
                <strong>Budget:</strong> ₹{job.budget}
              </p>
              <p>
                <strong>Status:</strong> {job.status}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;

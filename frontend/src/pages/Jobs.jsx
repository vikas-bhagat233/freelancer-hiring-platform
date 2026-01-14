import { useEffect, useState } from "react";
import api from "../api/api";
import React from "react";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await api.get("/jobs");
        const nextJobs = Array.isArray(res?.data?.jobs) ? res.data.jobs : [];
        if (!cancelled) setJobs(nextJobs);
      } catch (err) {
        console.error("Failed to fetch jobs", err);
        if (!cancelled) {
          setJobs([]);
          setError("Failed to load jobs");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchJobs();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div>
      <h2>Available Jobs</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : jobs.length === 0 ? (
        <p>No jobs available</p>
      ) : (
        jobs.map((job) => (
          <div key={job._id}>
            <h3>{job.title}</h3>
            <p>{job.description}</p>
            <p>Budget: ₹{job.budget}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Jobs;

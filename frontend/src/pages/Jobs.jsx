import { useEffect, useState } from "react";
import api from "../api/api";
import React from "react";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    api.get("/jobs").then((res) => setJobs(res.data.jobs));
  }, []);

  return (
    <div>
      <h2>Available Jobs</h2>
      {jobs.map((job) => (
        <div key={job._id}>
          <h3>{job.title}</h3>
          <p>{job.description}</p>
          <p>Budget: ₹{job.budget}</p>
        </div>
      ))}
    </div>
  );
};

export default Jobs;

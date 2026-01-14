import { useState } from "react";
import api from "../api/api";
import React from "react";

const CreateJob = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    await api.post("/jobs", { title, description, budget });
    alert("Job Created");
  };

  return (
    <form onSubmit={submitHandler}>
      <h2>Create Job</h2>
      <input placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
      <textarea placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
      <input placeholder="Budget" onChange={(e) => setBudget(e.target.value)} />
      <button type="submit">Post Job</button>
    </form>
  );
};

export default CreateJob;

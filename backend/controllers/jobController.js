const Job = require("../models/Job");

/**
 * Create a new job (Client only)
 */
const createJob = async (req, res) => {
  try {
    const { title, description, budget, skillsRequired } = req.body;

    const job = await Job.create({
      title,
      description,
      budget,
      skillsRequired,
      postedBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Job created successfully",
      job,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Job creation failed",
      error: error.message,
    });
  }
};

/**
 * Get all jobs
 */
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate("postedBy", "name email role")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      total: jobs.length,
      jobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch jobs",
    });
  }
};

/**
 * Get jobs posted by logged-in client
 */
const getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.user._id });

    res.json({
      success: true,
      jobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch your jobs",
    });
  }
};

module.exports = { createJob, getAllJobs, getMyJobs };

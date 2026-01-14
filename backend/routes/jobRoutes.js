const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  createJob,
  getAllJobs,
  getMyJobs,
} = require("../controllers/jobController");

/**
 * Job routes
 */
router.post("/", protect, createJob);
router.get("/", getAllJobs);
router.get("/my", protect, getMyJobs);

module.exports = router;

const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  applyProposal,
  getJobProposals,
} = require("../controllers/proposalController");

/**
 * Proposal routes
 */
router.post("/", protect, applyProposal);
router.get("/:jobId", protect, getJobProposals);

module.exports = router;

const Proposal = require("../models/Proposal");

/**
 * Apply for a job (Freelancer)
 */
const applyProposal = async (req, res) => {
  try {
    const { jobId, coverLetter, bidAmount } = req.body;

    const proposal = await Proposal.create({
      job: jobId,
      freelancer: req.user._id,
      coverLetter,
      bidAmount,
    });

    res.status(201).json({
      success: true,
      message: "Proposal submitted successfully",
      proposal,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to submit proposal",
      error: error.message,
    });
  }
};

/**
 * Get proposals for a job (Client)
 */
const getJobProposals = async (req, res) => {
  try {
    const proposals = await Proposal.find({ job: req.params.jobId })
      .populate("freelancer", "name email skills");

    res.json({
      success: true,
      proposals,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch proposals",
    });
  }
};

module.exports = { applyProposal, getJobProposals };

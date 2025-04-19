import Candidate from '../models/Candidate.js';
import Vote from '../models/Vote.js';

export const castVote = async (req, res) => {
  const userId = req.user._id;
  const { candidateId } = req.body;

  try {
    const alreadyVoted = await Vote.findOne({ user: userId });
    if (alreadyVoted) return res.status(400).json({ message: 'You have already voted' });

    await Candidate.findByIdAndUpdate(candidateId, { $inc: { votes: 1 } });
    await Vote.create({ user: userId, candidate: candidateId });

    res.status(200).json({ message: 'Vote cast successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getResults = async (req, res) => {
  try {
    const results = await Candidate.find().sort({ votes: -1 });
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

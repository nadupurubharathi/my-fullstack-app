const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(express.json());
app.use(cors());

const mongoURI = process.env.MONGODB_URI
mongoose.connect(mongoURI)
    .then(() => console.log('Successfully connected to MongoDB.'))
    .catch(err => console.error('MongoDB connection error:', err));

// Mongoose Schema & Model
// Prevents double voting by enforcing a unique constraint on voterId
const voteSchema = new mongoose.Schema({
    voterId: {
        type: String,
        required: true,
        unique: true 
    },
    candidate: {
        type: String,
        required: true
    },
    votedAt: {
        type: Date,
        default: Date.now
    }
});

const Vote = mongoose.model('Vote', voteSchema);

// API Routes

// 1. Route to submit a vote
app.post('/api/vote', async (req, res) => {
    const { voterId, candidate } = req.body;

    if (!voterId || !candidate) {
        return res.status(400).json({ error: 'Voter ID and Candidate selection are required.' });
    }

    try {
        // Create and save new vote entry
        const newVote = new Vote({ voterId, candidate });
        await newVote.save();
        
        return res.status(201).json({ message: 'Vote cast successfully! Thank you for voting.' });
    } catch (error) {
        // Handle unique constraint violation (Duplicate Voter ID)
        if (error.code === 11000) {
            return res.status(400).json({ error: 'Access Denied: This Voter ID has already cast a ballot.' });
        }
        return res.status(500).json({ error: 'Server error occurred while processing your vote.' });
    }
});

// 2. Route to view current results (Optional addition for admin/analytics dashboards)
app.get('/api/results', async (req, res) => {
    try {
        const results = await Vote.aggregate([
            { $group: { _id: "$candidate", count: { $sum: 1 } } }
        ]);
        return res.status(200).json(results);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to aggregate voting metrics.' });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running smoothly on port ${PORT}`);
});
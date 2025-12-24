import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { getNearbyPlaces, getTravelRoadmap, liveLikeLocal } from './travelAi.js';

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();
app.use(express.json());

// Enable CORS for all routes and origins
app.use(cors());  // Add this line to enable CORS

// Route to get nearby places
app.post('/nearby-places', async (req, res) => {
  const { location } = req.body;

  if (!location) {
    return res.status(400).json({ success: false, message: 'Location is required.' });
  }

  try {
    const places = await getNearbyPlaces(location);
    res.json({ success: true, places });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Route to get travel roadmap
app.post('/travel-roadmap', async (req, res) => {
  console.log('hit');
  const { start, destination, budget, days } = req.body;

  if (!start || !destination || !budget || !days) {
    return res.status(400).json({ success: false, message: 'Start point, destination, budget, and number of days are required.' });
  }

  try {
    const roadmap = await getTravelRoadmap(start, destination, budget, days);
    res.json({ success: true, roadmap });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Route to get live like a local guide
app.post('/live-like-local', async (req, res) => {
  const { location } = req.body;

  if (!location) {
    return res.status(400).json({ success: false, message: 'Location is required.' });
  }

  try {
    const localGuide = await liveLikeLocal(location);
    res.json({ success: true, localGuide });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// pages/api/data.js
import axios from 'axios';

export default async function handler(req, res) {
  try {
    const response = await axios.get(req.body.url);
    const jsonData = response.data;
    res.status(200).json(jsonData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}



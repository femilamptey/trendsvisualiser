// Importing the necessary module
import axios from 'axios';

export default async function handler(req, res) {
  try {
    // Axios POST request
    const response = await axios.post('https://fetchtrendingcountries-cxou5hweba-uc.a.run.app', req.body);

    // Success response
    res.status(200).json(response.data);
  } catch (error) {
    // Error response
    res.status(500).json({ error: 'Internal server error' });
  }
}
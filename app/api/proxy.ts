// /pages/api/proxy.js
import axios from 'axios';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { data } = await axios.post(`https://serpapi.com/${req.body.endpoint}`, req.body.data);
            res.status(200).json(data);
        } catch (error) {
            res.status(error.response.status || 500).json(error.message);
        }
    } else {
        res.status(405).end(); // Method Not Allowed
    }
}
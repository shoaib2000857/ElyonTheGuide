import axios from 'axios';

export default async function handler(req, res) {
  console.log('TTS API called');
  if (req.method === 'POST') {
    const { text } = req.body;
    console.log('Request body:', req.body);
    const apiKey = process.env.PLAYHT_API_KEY;
    const apiSecret = process.env.PLAYHT_API_SECRET;

    // Call PlayHT API for TTS
    const response = await axios.post('https://play.ht/api/v1/convert', {
      text: text,
      voice: 'en_us_001', // Specify the voice you want to use
      speed: 1.0,
      format: 'mp3'
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}:${apiSecret}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('PlayHT response:', response.data);
    const audioUrl = response.data.audio_url;
    res.status(200).json({ audioUrl });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
import fs from 'fs';
import DeepSpeech from 'deepspeech';

const MODEL_PATH = 'models/deepspeech/deepspeech-0.9.3-models.pbmm';
const SCORER_PATH = 'models/deepspeech/deepspeech-0.9.3-models.scorer';

const model = new DeepSpeech.Model(MODEL_PATH);
model.enableExternalScorer(SCORER_PATH);

export default async function handler(req, res) {
  console.log('STT API called');
  if (req.method === 'POST') {
    const { audioData } = req.body;
    console.log('Request body:', req.body);
    const audioBuffer = Buffer.from(audioData, 'base64');

    // Convert audio buffer to Float32Array
    const audioFloat32Array = new Float32Array(audioBuffer.buffer, audioBuffer.byteOffset, audioBuffer.byteLength / Float32Array.BYTES_PER_ELEMENT);

    // Perform STT
    const result = model.stt(audioFloat32Array);
    console.log('STT result:', result);
    res.status(200).json({ text: result });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
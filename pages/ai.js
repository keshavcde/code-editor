
const { GoogleGenAI } = require('@google/genai');
const express = require('express');
const airouter = express.Router();

// Initialize the AI client
const ai = new GoogleGenAI({
  apiKey: 'AIzaSyApHvm7W5-7iaxwjJ9xumY0cSDF_rrV3vg', // Replace with your actual API key
});

airouter.post('/ai', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ msg: 'Prompt is required' });
    }

    // Generate content using the AI model
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
    });

    // Check if the response contains candidates
    if (response?.candidates?.length > 0) {
      const responseText = response.candidates[0]?.content?.parts[0]?.text || 'No response';
      const cleanedString = responseText.replace(/(\r\n|\n|\r)/gm, " ");
      res.json({ response: cleanedString });
    } else {
      res.status(500).json({ msg: 'No valid response from AI model.' });
    }
  } catch (error) {
    console.error('AI Error:', error);
    res.status(500).json({ msg: 'AI processing error', error: error.message });
  }
});

module.exports = { airouter };

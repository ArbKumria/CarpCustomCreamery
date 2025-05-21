const express = require('express');
const cors = require('cors');
const twilio = require('twilio');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Twilio client
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

// Endpoint to send SMS
app.post('/api/send-message', async (req, res) => {
  try {
    const { phoneNumber, message } = req.body;
    
    const result = await client.messages.create({
      body: message,
      to: phoneNumber,
      from: process.env.TWILIO_PHONE_NUMBER
    });

    res.json({ 
      success: true, 
      messageId: result.sid,
      status: result.status 
    });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 
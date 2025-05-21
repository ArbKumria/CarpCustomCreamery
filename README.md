# Carp Custom Creamery Flavour Update System

A React-based application for managing and sending daily flavour updates to customers via SMS using Twilio.

## Features

- Select from a predefined list of ice cream flavours
- Add and remove flavours from the daily selection
- Preview the message before sending
- Send SMS updates to customers using Twilio
- Phone number validation for US/Canada numbers
- Real-time status updates for message sending

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- A Twilio account with:
  - Account SID
  - Auth Token
  - A Twilio phone number

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with your Twilio credentials:
   ```
   TWILIO_ACCOUNT_SID=your_account_sid
   TWILIO_AUTH_TOKEN=your_auth_token
   TWILIO_PHONE_NUMBER=your_twilio_phone_number
   ```

## Running the Application

1. Start the backend server:

   ```bash
   cd server
   npm install
   npm start
   ```

2. In a new terminal, start the frontend:
   ```bash
   npm start
   ```

The application will be available at [http://localhost:3000](http://localhost:3000)

## Usage

1. Select flavours from the dropdown menu and click "Add Flavour"
2. Remove flavours by clicking the "Remove" button next to each flavour
3. Enter the recipient's phone number (10 digits, no spaces or dashes)
4. Preview the message
5. Click "Send Flavour Update" to send the SMS

## Message Format

The SMS will be sent in the following format:

```
🍦 Today's Available Flavours:
• FLAVOUR1
• FLAVOUR2
• FLAVOUR3
```

## Development

This project was built using:

- React
- Node.js
- Express
- Twilio API

## Security Notes

- Never commit your Twilio credentials to version control
- Always use environment variables for sensitive information
- The backend server handles all Twilio API calls to keep credentials secure

## License

[Your chosen license]

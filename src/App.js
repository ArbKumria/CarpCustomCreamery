import React, { useState } from 'react';
import './App.css';

const PRE_MADE_FLAVOURS = [
  'APPLE CRUMBLE',
  'BANOFFEE PIE',
  'BEETLEJUICE',
  'BLACK CHERRY',
  'BOSTON CREAM PIE',
  'BUBBLE GUM',
  'BUDDY THE ELF',
  'CANDY CANE HOT CHOCOLATE',
  'CAPPUCCINO',
  'CHOCOLATE',
  'CHOCOLATE ORANGE',
  'CHOCOLATE PB',
  'CHOCOLATE PEANUT BUTTER',
  'CHOCOLATE SKOREO',
  'COFFEE BREAK',
  'COOKIE MONSTER',
  'COOKIES & CREAM',
  'COUCH POTATO',
  'CREME BRULEE',
  'DOUBLE CHOCOLATE BROWNIE',
  'LOADED BUTTER TART',
  'LONDON FOG',
  'M&M SUNDAE',
  'MANGO SORBET',
  'MAPLE WALNUT',
  'MINT CHIP',
  'MONKEY BARS',
  'MONSTER MASH',
  'MUDPUDDLE',
  'NANAIMO BAR',
  'NERDS',
  'NUTS & FUDGE',
  'PEACH SORBET',
  'PRALINES & CREAM',
  'PUMPKIN SPICE',
  'RASPBERRY CHEESECAKE',
  'RASPBERRY SORBET',
  'REESES LOVERS',
  'SALTED CARAMEL',
  'SALTED CARAMEL BROWNIE',
  'SEA SALT DARK CHOCOLATE',
  'SPUMONI',
  'STICKY TOFFEE PUDDING',
  'STRAWBERRY',
  'STRAWBERRY M&M',
  'STRAWBERRY MATCHA LATTE',
  'SWEATER WEATHER',
  'THE GRINCH',
  'TURTLES TURTLES TURTLES',
  'UNCLE EDDIES NOG',
  'VANILLA',
  'VANILLA SKOREO',
  'VEGAN',
  'VEGAN BUDDY THE ELF',
  'VEGAN CHOCOLATE ORANGE',
  'VEGAN VANILLA'
];

function App() {
  const [flavours, setFlavours] = useState([]);
  const [selectedFlavour, setSelectedFlavour] = useState('');
  const [message, setMessage] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sendStatus, setSendStatus] = useState('');

  const handleAddFlavour = () => {
    if (selectedFlavour && !flavours.includes(selectedFlavour)) {
      setFlavours([...flavours, selectedFlavour]);
      setSelectedFlavour('');
    }
  };

  const handleRemoveFlavour = (index) => {
    setFlavours(flavours.filter((_, i) => i !== index));
  };

  const validatePhoneNumber = (number) => {
    // Remove all non-digit characters
    const cleaned = number.replace(/\D/g, '');
    // Check if the number is valid (10 digits for US/Canada)
    return cleaned.length === 10;
  };

  const handleSendMessage = async () => {
    if (flavours.length === 0) {
      alert('Please add at least one flavour before sending');
      return;
    }

    if (!phoneNumber) {
      alert('Please enter a phone number');
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      alert('Please enter a valid 10-digit phone number');
      return;
    }

    setIsSending(true);
    setSendStatus('Sending...');

    try {
      const flavourList = flavours.join('\n• ');
      const fullMessage = `🍦 Today's Available Flavours:\n• ${flavourList}`;
      setMessage(fullMessage);

      // Format phone number (add +1 for US/Canada)
      const formattedNumber = '+1' + phoneNumber.replace(/\D/g, '');
      
      const response = await fetch('http://localhost:3001/api/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: formattedNumber,
          message: fullMessage
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setSendStatus('Message sent successfully!');
        // Clear the form after successful send
        setFlavours([]);
        setPhoneNumber('');
      } else {
        throw new Error(data.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setSendStatus('Failed to send message. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Carp Custom Creamery</h1>
        <h2>Flavour Update System</h2>
      </header>
      <main className="App-main">
        <div className="flavour-input">
          <select
            value={selectedFlavour}
            onChange={(e) => setSelectedFlavour(e.target.value)}
            className="flavour-select"
          >
            <option value="">Select a flavour</option>
            {PRE_MADE_FLAVOURS.map((flavour) => (
              <option key={flavour} value={flavour}>
                {flavour}
              </option>
            ))}
          </select>
          <button onClick={handleAddFlavour} disabled={!selectedFlavour}>
            Add Flavour
          </button>
        </div>
        
        <div className="flavour-list">
          <h3>Current Flavours:</h3>
          {flavours.map((flavour, index) => (
            <div key={index} className="flavour-item">
              <span>{flavour}</span>
              <button onClick={() => handleRemoveFlavour(index)}>Remove</button>
            </div>
          ))}
        </div>

        <div className="phone-input">
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter phone number (e.g., 1234567890)"
            className="phone-number-input"
            maxLength="10"
          />
          <p className="phone-hint">Enter a 10-digit phone number without spaces or dashes</p>
        </div>

        <div className="message-preview">
          <h3>Message Preview:</h3>
          <pre>{message}</pre>
        </div>

        <div className="send-status">
          {sendStatus && <p className={sendStatus.includes('success') ? 'success' : 'error'}>{sendStatus}</p>}
        </div>

        <button 
          className="send-button"
          onClick={handleSendMessage}
          disabled={flavours.length === 0 || isSending}
        >
          {isSending ? 'Sending...' : 'Send Flavour Update'}
        </button>
      </main>
    </div>
  );
}

export default App;

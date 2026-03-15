const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const flights = [
  { id: 1, origin: 'delhi', destination: 'mumbai', price: 4500, airline: 'IndiGo', time: '06:00 AM' },
  { id: 2, origin: 'delhi', destination: 'bangalore', price: 5200, airline: 'Air India', time: '10:30 AM' },
  { id: 3, origin: 'bangalore', destination: 'goa', price: 3200, airline: 'SpiceJet', time: '01:15 PM' }
];

app.get('/api/flights', (req, res) => {
  const { origin, destination } = req.query;
  
  // 1. Pehle real list mein check karo
  let filtered = flights.filter(f => 
    f.origin.toLowerCase() === origin?.toLowerCase().trim() && 
    f.destination.toLowerCase() === destination?.toLowerCase().trim()
  );

  // 2. AGAR KUCH NA MILE, TOH TURANT NAYI TICKET BANAO (Smart Search)
  if (filtered.length === 0 && origin && destination) {
    filtered = [
      { 
        id: Date.now(), 
        origin: origin, 
        destination: destination, 
        price: Math.floor(Math.random() * (6000 - 3000) + 3000), // Random Price
        airline: 'SkyBooker Special', 
        time: '12:00 PM' 
      },
      { 
        id: Date.now() + 1, 
        origin: origin, 
        destination: destination, 
        price: Math.floor(Math.random() * (8000 - 5000) + 5000), 
        airline: 'Premium Air', 
        time: '09:30 PM' 
      }
    ];
  }
  
  res.json(filtered);
});

app.listen(5000, () => console.log('🚀 Smart Backend Running on 5000'));
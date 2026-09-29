const express = require('express');

const app = express();

app.use(express.json());

// Available cabs
const cabs = [
  { id: 1, type: 'Mini', farePerKm: 12, available: true },
  { id: 2, type: 'Sedan', farePerKm: 18, available: true },
  { id: 3, type: 'SUV', farePerKm: 25, available: true }
];

// Store bookings
let bookings = [];

// Get all available cabs
app.get('/cabs', (req, res) => {
  res.json(cabs);
});

// Book a cab
app.post('/book', (req, res) => {
  const { cabId, distance } = req.body;

  const cab = cabs.find(c => c.id === cabId);

  if (!cab) {
    return res.status(404).json({ error: 'Cab not found' });
  }

  if (!cab.available) {
    return res.status(400).json({ error: 'Cab is not available' });
  }

  if (!distance || distance <= 0) {
    return res.status(400).json({ error: 'Distance must be greater than 0' });
  }

  const booking = {
    bookingId: bookings.length + 1,
    cab: cab.type,
    distance: distance,
    totalFare: cab.farePerKm * distance
  };

  bookings.push(booking);

  res.status(201).json(booking);
});

// Get all bookings
app.get('/bookings', (req, res) => {
  res.json(bookings);
});

module.exports = app;
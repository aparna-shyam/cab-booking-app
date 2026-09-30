const request = require('supertest');
const app = require('../src/app');

describe('Cab Booking API', () => {

  test('GET /cabs returns available cabs', async () => {
    const res = await request(app).get('/cabs');

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('POST /book creates a cab booking', async () => {
    const res = await request(app)
      .post('/book')
      .send({ cabId: 1, distance: 10 });

    expect(res.statusCode).toBe(201);
    expect(res.body.cab).toBe('Mini');
    expect(res.body.totalFare).toBe(120);
  });

  test('POST /book with invalid cab fails', async () => {
    const res = await request(app)
      .post('/book')
      .send({ cabId: 999, distance: 10 });

    expect(res.statusCode).toBe(404);
  });

});
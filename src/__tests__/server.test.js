'use strict';

const { app } = require('../server'); // Adjust the path if necessary
const supertest = require('supertest');
const request = supertest(app);

describe('API Server', () => {
  it('should respond with a 200 status for the / route', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });

  it('should respond with "Hello World" for the / route', async () => {
    const response = await request.get('/');
    expect(response.text).toBe('Hello World');
  });

  it('should respond with a 404 status for an invalid route', async () => {
    const response = await request.get('/foo');
    expect(response.status).toBe(404);
    expect(response.text).toBe('Not Found');
  });

  it('should respond with a 404 status for an invalid method', async () => {
    const response = await request.post('/');
    expect(response.status).toBe(404);
  });

  it('should respond with a 200 status for the /data route', async () => {
    const response = await request.get('/data');
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('sample data');
  });

  it('should respond with a 200 status for a single record route', async () => {
    const response = await request.get('/data/abc111');
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('record abc111');
  });

  it('should respond with a 404 status for an invalid single record route', async () => {
    const response = await request.get('/data/zzz888');
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Record Not Found');
  });

  it('should respond with a 400 status if no name in the query string for /person', async () => {
    const response = await request.get('/person');
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Name query parameter is required');
  });

  it('should respond with a 200 status if the name is provided in the query string for /person', async () => {
    const response = await request.get('/person?name=Adam');
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Adam');
  });

  it('should respond with the correct object if the name is provided in the query string for /person', async () => {
    const response = await request.get('/person?name=Adam');
    expect(response.body).toEqual({ name: 'Adam' });
  });
});

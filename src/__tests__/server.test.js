'use strict';

const { app } = require('../server.js');
const supertest = require('supertest');

const mockRequest = supertest(app);

describe('API Server', () => {
  it('should append a timestamp to the request object', async () => {
    const response = await mockRequest.get('/');
    expect(response.headers.rt).toBeDefined();
  });

  it('should respond with a 404 on an invalid route', async () => {
    const response = await mockRequest.get('/foo');
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Not Found');
  });

  it('should respond with a 500 when the server has an error', async () => {
    const response = await mockRequest.get('/broken');
    expect(response.status).toBe(500);
  });

  it('should respond with a 200 for the / route', async () => {
    const response = await mockRequest.get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello World'); // Add an assertion for response body
  });

  it('should respond with a 200 status for the /data route', async () => {
    const response = await mockRequest.get('/data');
    expect(response.status).toBe(200);
  });

  it('should respond with a 200 status for a single record route', async () => {
    const response = await mockRequest.get('/data/abc111');
    expect(response.status).toBe(200);
  });

  it('should respond with an object for a single record route', async () => {
    const response = await mockRequest.get('/data/abc111');
    expect(response.body.name).toBeDefined();
  });

  it('should respond with a 500 status for an invalid single record route', async () => {
    const response = await mockRequest.get('/data/zzz888');
    expect(response.status).toBe(500);
    expect(response.body.error).toBe('Record Not Found'); // Improve error message
  });
});

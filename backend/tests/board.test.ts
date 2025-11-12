// tests/board.test.ts
import request from 'supertest';
import app from '../src/app';

describe('Board API', () => {
  it('should return 404 on unknown route', async () => {
    const res = await request(app).get('/unknown');
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('Not found');
  });
});

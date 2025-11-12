import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../src/app'; 
import { Board } from '../src/models/board';
import { IBoard } from '../src/types/board'

let mongoServer: MongoMemoryServer;
let boardId: string;
let cardId: string;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await Board.deleteMany({});
});

describe('Board API', () => {
  it('should create a board', async () => {
    const res = await request(app)
      .post('/boards')
      .send({ name: 'Test Board' })
      .expect(201);

    expect(res.body.name).toBe('Test Board');
    boardId = res.body._id;
  });

  it('should get a board by ID', async () => {
    const board = await Board.create({ name: 'My Board' }) as IBoard;
    boardId = board._id.toString();

    const res = await request(app)
      .get(`/boards/${boardId}`)
      .expect(200);

    expect(res.body.name).toBe('My Board');
  });

  it('should update a board', async () => {
    const board = await Board.create({ name: 'Old Name' }) as IBoard;
    boardId = board._id.toString();

    const res = await request(app)
      .patch(`/boards/${boardId}`)
      .send({ name: 'New Name' })
      .expect(200);

    expect(res.body.name).toBe('New Name');
  });

  it('should delete a board', async () => {
    const board = await Board.create({ name: 'To Delete' }) as IBoard;
    boardId = board._id.toString();

    const res = await request(app)
      .delete(`/boards/${boardId}`)
      .expect(200);

    expect(res.body.message).toBe('The board is deleted successfully');
  });

  it('should add a card to a column', async () => {
    const board = await Board.create({ name: 'Card Board' }) as IBoard;
    boardId = board._id.toString();

    const res = await request(app)
      .post(`/boards/${boardId}/cards`)
      .send({ columnName: 'ToDo', title: 'My Task', description: 'Test Desc' })
      .expect(201);

    const column = res.body.columns.find((c: any) => c.name === 'ToDo');
    expect(column.cards.length).toBe(1);
    cardId = column.cards[0]._id;
  });

  it('should update a card and move it to another column', async () => {
    const board = await Board.create({ name: 'Move Card Board' }) as IBoard;
    boardId = board._id.toString();

    // Add card first
    const addRes = await request(app)
      .post(`/boards/${boardId}/cards`)
      .send({ columnName: 'ToDo', title: 'Task', description: 'Desc' });

    cardId = addRes.body.columns.find((c: any) => c.name === 'ToDo').cards[0]._id;

    // Update and move
    const res = await request(app)
      .patch(`/boards/${boardId}/cards/${cardId}`)
      .send({ title: 'Updated Task', columnName: 'In Progress' })
      .expect(200);

    const sourceCol = res.body.columns.find((c: any) => c.name === 'ToDo');
    const targetCol = res.body.columns.find((c: any) => c.name === 'In Progress');

    expect(sourceCol.cards.length).toBe(0);
    expect(targetCol.cards[0].title).toBe('Updated Task');
  });

  it('should delete a card', async () => {
    const board = await Board.create({ name: 'Delete Card Board' }) as IBoard;
    boardId = board._id.toString();

    const addRes = await request(app)
      .post(`/boards/${boardId}/cards`)
      .send({ columnName: 'ToDo', title: 'Task', description: 'Desc' });

    cardId = addRes.body.columns.find((c: any) => c.name === 'ToDo').cards[0]._id;

    const res = await request(app)
      .delete(`/boards/${boardId}/cards/${cardId}`)
      .expect(200);

    const column = res.body.columns.find((c: any) => c.name === 'ToDo');
    expect(column.cards.length).toBe(0);
  });

  it('should move a card using drag and drop', async () => {
    const board = await Board.create({ name: 'Drag Drop Board' }) as IBoard;
    boardId = board._id.toString();

    const addRes = await request(app)
      .post(`/boards/${boardId}/cards`)
      .send({ columnName: 'ToDo', title: 'Task', description: 'Desc' });

    cardId = addRes.body.columns.find((c: any) => c.name === 'ToDo').cards[0]._id;

    const res = await request(app)
      .patch(`/boards/${boardId}/cards/${cardId}/move`)
      .send({ fromColumn: 'ToDo', toColumn: 'In Progress', toIndex: 0 })
      .expect(200);

    const sourceCol = res.body.columns.find((c: any) => c.name === 'ToDo');
    const targetCol = res.body.columns.find((c: any) => c.name === 'In Progress');

    expect(sourceCol.cards.length).toBe(0);
    expect(targetCol.cards[0].title).toBe('Task');
  });
});

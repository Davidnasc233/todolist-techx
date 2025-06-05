import { Request, Response } from 'express';
import { db } from '../config/database';

export const getTasks = async (_req: Request, res: Response) => {
  const [rows] = await (await db).query('SELECT * FROM tasks');
  res.json(rows);
};

export const createTask = async (req: Request, res: Response) => {
  const { taskName } = req.body;
  const [result] = await (await db).query('INSERT INTO tasks (taskName) VALUES (?)', [taskName]);
  res.json({ id: (result as any).insertId, taskName, done: false });
};

export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  await (await db).query('DELETE FROM tasks WHERE id = ?', [id]);
  res.sendStatus(204);
};

export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { taskName, done } = req.body;
  await (await db).query('UPDATE tasks SET taskName = ?, done = ? WHERE id = ?', [taskName, done, id]);
  res.sendStatus(200);
};

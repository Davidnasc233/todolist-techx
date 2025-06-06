import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import taskRoutes from './routes/task.routes';
import { db } from './config/database';

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'todolist'
  });
  

app.get('/', (req, res) => {
    res.send('API está funcionando!');
  });
  
app.use('/', taskRoutes);

app.post('/', async (req, res) => {
    const { taskName, done } = req.body;
  
    try {
      const [result] = await (await db).execute(
        'INSERT INTO tasks (taskName, done) VALUES (?, ?)',
        [taskName, done]
      );
  
      // Retorna a tarefa recém-criada com o ID
      res.status(201).json({
        id: (result as any).insertId,
        taskName,
        done
      });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao inserir tarefa', error });
    }
  });
  

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

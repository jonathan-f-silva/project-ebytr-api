import { TodoSchema } from '../../app/interfaces/TodoSchema';

export const validTodo: TodoSchema = {
  id: 'someNiceID',
  description: 'Fazer testes unitários',
  status: 'A fazer',
  createdAt: new Date(),
};

export const invalidTodo = { invalid: true } as any;

import { TodoSchema } from '../../src/app/interfaces/TodoSchema';

export const validID = '62620d6c9162997790a96412';

export const validTodo: TodoSchema = {
  id: validID,
  description: 'Fazer testes unitários',
  status: 'A fazer',
  createdAt: new Date(),
};

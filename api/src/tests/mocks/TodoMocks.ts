import { Add, Edit } from '../../app/interfaces';
import {
  Todo,
} from '../../app/interfaces/TodoSchema';

export const validID = '62620d6c9162997790a96412';

export const validTodo: Todo = {
  id: validID,
  description: 'Fazer testes unitários',
  status: 'A fazer',
  createdAt: (new Date()).toISOString(),
};

export const validAddTodo: Add<Todo> = {
  description: 'Fazer testes de integração',
  status: 'A fazer',
};

export const validEditTodo: Edit<Todo> = {
  description: 'Fazer testes E2E',
  status: 'Concluído! 🎉',
};

export const validTodoStatusUpdate: Edit<Todo> = {
  status: 'Em andamento',
};

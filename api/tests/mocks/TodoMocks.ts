import {
  AddTodoSchema, EditTodoSchema, TodoSchema,
} from '../../src/app/interfaces/TodoSchema';

export const validID = '62620d6c9162997790a96412';

export const validTodo: TodoSchema = {
  id: validID,
  description: 'Fazer testes unitários',
  status: 'A fazer',
  createdAt: (new Date()).toISOString(),
};

export const validAddTodo: AddTodoSchema = {
  description: 'Fazer testes de integração',
};

export const validEditTodo: EditTodoSchema = {
  description: 'Fazer testes E2E',
  status: 'Concluído! 🎉',
};

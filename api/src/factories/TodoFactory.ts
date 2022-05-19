import {
  AddTodoZodSchema, EditTodoZodSchema, TodoMongoSchema, TodoSchema,
} from '../app/interfaces/TodoSchema';
import makeMongoRouter from './RouterFactory';

function makeTodoRouter() {
  return makeMongoRouter<TodoSchema>({
    route: '/todos',
    tableName: 'Todos',
    schemas: {
      add: AddTodoZodSchema,
      edit: EditTodoZodSchema,
      mongo: TodoMongoSchema,
    },
  });
}

export default makeTodoRouter;

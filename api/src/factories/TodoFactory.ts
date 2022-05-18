import { TodoMongoSchema, TodoSchema, TodoZodSchema } from '../app/interfaces/TodoSchema';
import makeMongoRouter from './RouterFactory';

function makeTodoRouter() {
  return makeMongoRouter<TodoSchema>({
    route: '/todos',
    tableName: 'Todos',
    zodSchema: TodoZodSchema,
    mongooseSchema: TodoMongoSchema,
  });
}

export default makeTodoRouter;

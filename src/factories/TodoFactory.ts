import { 
  AddTodoZodSchema, EditTodoZodSchema, Todo, TodoMongoSchema,
} from '../app/interfaces/TodoSchema';
import MongoModel from '../app/models/MongoModel';
import TodoService from '../app/services/TodoService';
import Controller from '../app/controllers/Controller';
import TodosRouter from '../routes/TodosRouter';

function makeTodoRouter() {
  const todoValidators = { add: AddTodoZodSchema, edit: EditTodoZodSchema };
  const model = new MongoModel<Todo>('Todos', TodoMongoSchema);
  const service = new TodoService(model);
  const controller = new Controller<Todo>(service, todoValidators);
  const expressRouter = new TodosRouter('/api/todos', controller);
  
  return {
    model,
    service,
    controller,
    expressRouter,
    router: expressRouter.router,
  };
}

export default makeTodoRouter;

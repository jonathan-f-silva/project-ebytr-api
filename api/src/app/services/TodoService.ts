import { Add } from '../interfaces';
import { Todo } from '../interfaces/TodoSchema';
import Service from './Service';

export default class TodoService extends Service<Todo> {
  create = async (data: Add<Todo>): Promise<Todo> => {
    const newTodo = {
      ...data, status: 'A fazer', createdAt: (new Date()).toISOString(),
    };
    return this.model.create(newTodo as Add<Todo>);
  }; 
}

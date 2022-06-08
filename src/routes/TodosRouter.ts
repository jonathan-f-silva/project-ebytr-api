import { Todo } from '../app/interfaces/TodoSchema';
import ExpressRouter from './ExpressRouter';

export default class TodosRouter extends ExpressRouter<Todo> {
  public setupRoutes(): void {
    super.setupRoutes();
    this.router.patch(`${this.route}/:id/status`, this.update);
  }
}

import { Model } from '../interfaces/ModelInterface';
import NotFoundError from '../../utils/NotFoundError';

export default class Service<T> {
  constructor(
    protected model: Model<T>,
  ) { }

  create = async (data: T): Promise<T> => this.model.create(data);

  read = async (): Promise<T[]> => this.model.read();

  readOne = async (id: string): Promise<T> => {
    const found = await this.model.readOne(id);
    if (found === null) throw new NotFoundError();
    return found;
  };

  update = async (id: string, data: T): Promise<T> => {
    const updated = await this.model.update(id, data);
    if (updated === null) throw new NotFoundError();
    return updated;
  };

  delete = async (id: string): Promise<T> => {
    const deleted = await this.model.delete(id);
    if (deleted === null) throw new NotFoundError();
    return deleted;
  };
}

import { Model } from '../interfaces/Model';
import NotFoundError from '../../utils/NotFoundError';
import { Add, Edit } from '../interfaces';

export default class Service<T> {
  constructor(
    protected model: Model<T>,
  ) { }

  create = async (data: Add<T>): Promise<T> => this.model.create(data); 

  read = async (): Promise<T[]> => this.model.read();

  readOne = async (id: string): Promise<T> => {
    const found = await this.model.readOne(id);
    if (found === null) throw new NotFoundError();
    return found;
  };

  update = async (id: string, data: Edit<T>): Promise<T> => {
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

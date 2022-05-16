import { ZodSchema } from 'zod';
import IdSchema from '../interfaces/IdSchema';
import GenericService from '../services/Service';
import ErrorMessage from '../../utils/ErrorMessage';
import ValidationError from '../../utils/ValidationError';

export default class Controller<T> {
  constructor(
    protected service: GenericService<T>,
    protected validator: ZodSchema<T>,
  ) { }

  create = async (data: T): Promise<T> => {
    const { success } = this.validator.safeParse(data);
    if (!success) throw new ValidationError();
    return this.service.create(data);
  };

  read = async (): Promise<T[]> => this.service.read();

  readOne = async (id: string): Promise<T | null> => {
    const { success: idOkay } = IdSchema.safeParse(id);
    if (!idOkay) throw new ValidationError(ErrorMessage.ID_ERROR);
    return this.service.readOne(id);
  };

  update = async (id: string, data: T): Promise<T | null> => {
    const { success: idOkay } = IdSchema.safeParse(id);
    if (!idOkay) throw new ValidationError(ErrorMessage.ID_ERROR);
    const { success } = this.validator.safeParse(data);
    if (!success) throw new ValidationError();
    return this.service.update(id, data);
  };

  delete = async (id: string): Promise<T | null> => {
    const { success: idOkay } = IdSchema.safeParse(id);
    if (!idOkay) throw new ValidationError(ErrorMessage.ID_ERROR);
    return this.service.delete(id);
  };
}

import { ZodSchema } from 'zod';
import IdSchema from '../interfaces/IdSchema';
import Service from '../services/Service';
import ErrorMessage from '../../utils/ErrorMessage';
import ValidationError from '../../utils/ValidationError';

export default class Controller<T> {
  constructor(
    protected service: Service<T>,
    protected validators: { add: ZodSchema, edit: ZodSchema },
  ) { }

  create = async (body: unknown): Promise<T> => {
    const result = this.validators.add.safeParse(body);
    if (!result.success) throw new ValidationError();
    return this.service.create(result.data);
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
    const { success } = this.validators.edit.safeParse(data);
    if (!success) throw new ValidationError();
    return this.service.update(id, data);
  };

  delete = async (id: string): Promise<T | null> => {
    const { success: idOkay } = IdSchema.safeParse(id);
    if (!idOkay) throw new ValidationError(ErrorMessage.ID_ERROR);
    return this.service.delete(id);
  };
}

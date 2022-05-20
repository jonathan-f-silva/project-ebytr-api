import { Add, Edit } from '.';

export interface Model<T> {
  create: (data: Add<T>) => Promise<T>;
  read: () => Promise<T[]>;
  readOne: (id: string) => Promise<T | null>;
  update: (id: string, data: Edit<T>) => Promise<T | null>;
  delete: (id: string) => Promise<T | null>;
}

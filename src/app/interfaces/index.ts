import { z } from 'zod';

export const IdSchema = z.string().min(24);

export type Indexable = {
  id: string,
};

export type Entity = {
  createdAt: string,
};

export type IndexableEntity = Indexable & Entity;

export type Add<T> = Omit<T, keyof IndexableEntity>;

export type Edit<T> = Partial<Add<T>>;

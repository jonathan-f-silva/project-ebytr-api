import { z } from 'zod';

const statusTypes: readonly[string, string, string] = ['A fazer', 'Em andamento', 'Concluído! 🎉'];

export const TodoMongoSchema = {
  id: String,
  description: String,
  status: String,
  createdAt: Date,
};

export const TodoZodSchema = z.object({
  id: z.string(),
  description: z.string(),
  status: z.enum(statusTypes),
  createdAt: z.string(),
});

export const AddTodoZodSchema = z.object({
  description: z.string(),
  status: z.enum(statusTypes),
});

export const EditTodoZodSchema = z.object({
  description: z.string().optional(),
  status: z.enum(statusTypes).optional(),
});

export type Todo = z.infer<typeof TodoZodSchema>;

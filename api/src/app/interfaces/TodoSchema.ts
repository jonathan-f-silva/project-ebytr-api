import { z } from 'zod';

export const TodoMongoSchema = {
  id: String,
  description: String,
  status: String,
  createdAt: Date,
};

export const TodoZodSchema = z.object({
  id: z.string(),
  description: z.string(),
  status: z.enum(['A fazer', 'Em andamento', 'Concluído! 🎉']),
  createdAt: z.date(),
});

export type TodoSchema = z.infer<typeof TodoZodSchema>;

export type NewTodoSchema = Omit<TodoSchema, 'id'>;

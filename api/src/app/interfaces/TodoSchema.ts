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
  createdAt: z.string(),
});

export const AddTodoZodSchema = z.object({
  description: z.string(),
});

export const EditTodoZodSchema = z.object({
  description: z.string().optional(),
  status: z.enum(['A fazer', 'Em andamento', 'Concluído! 🎉']).optional(),
});

export type TodoSchema = z.infer<typeof TodoZodSchema>;
export type AddTodoSchema = z.infer<typeof AddTodoZodSchema>;
export type EditTodoSchema = z.infer<typeof EditTodoZodSchema>;

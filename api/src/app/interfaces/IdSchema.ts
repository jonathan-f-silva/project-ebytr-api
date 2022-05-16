import { z } from 'zod';

const IdSchema = z.string().min(24);

export default IdSchema;

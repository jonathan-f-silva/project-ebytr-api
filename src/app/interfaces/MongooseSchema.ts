import { SchemaDefinition, SchemaDefinitionType } from 'mongoose';

export type MongooseSchema<T> = SchemaDefinition<SchemaDefinitionType<T>>;

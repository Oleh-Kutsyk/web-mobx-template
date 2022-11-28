import { schema } from 'normalizr';

const category = new schema.Entity('categories');

export const categoriesSchema = [category];

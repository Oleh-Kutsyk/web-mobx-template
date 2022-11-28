import { createEntitiesModel } from '../utils/entitiesModel';
import { categories } from './example';

export const entities = createEntitiesModel({
  example: categories,
});

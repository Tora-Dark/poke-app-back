import { CategoryRequestDTO } from '@interface/dto/request/CategoryRequestDTO';
import { Category } from '@domain/entities/Category';

export interface ICategoryService {
  create(data: Partial<CategoryRequestDTO>): Promise<Category>;
  findById(id: number): Promise<Category | null>;
  findAll(): Promise<Category[]> ;
  update(id: number, data: Partial<CategoryRequestDTO>): Promise<Category>;
  delete(id: number): Promise<void>;
  // Add other methods as needed, such as findAll, count, etc.
}

import { TagRequestDTO } from '@interface/dto/request/TagRequestDTO';
import { Tag } from '@domain/entities/Tag';

export interface ITagService {
  create(data: Partial<TagRequestDTO>): Promise<Tag>;
  findById(id: number): Promise<Tag | null>;
  findAll(): Promise<Tag[]> ;
  update(id: number, data: Partial<TagRequestDTO>): Promise<Tag>;
  delete(id: number): Promise<void>;
  // Add other methods as needed, such as findAll, count, etc.
}

import { PokeballRequestDTO } from '@interface/dto/request/PokeballRequestDTO';
import { Pokeball } from '@domain/entities/Pokeball';

export interface IPokeballService {
  create(data: Partial<PokeballRequestDTO>): Promise<Pokeball>;
  findById(id: number): Promise<Pokeball | null>;
  findAll(): Promise<Pokeball[]> ;
  update(id: number, data: Partial<PokeballRequestDTO>): Promise<Pokeball>;
  delete(id: number): Promise<void>;
  // Add other methods as needed, such as findAll, count, etc.
}

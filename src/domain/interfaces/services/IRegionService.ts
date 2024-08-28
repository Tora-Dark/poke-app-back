import { RegionRequestDTO } from "@interface/dto/request/RegionRequestDTO";
import { Region } from "@domain/entities/Region";

export interface IRegionService {
  create(data: Partial<RegionRequestDTO>): Promise<Region>;
  findById(id: number): Promise<Region | null>;
  findAll(): Promise<Region[]>;
  update(id: number, data: Partial<RegionRequestDTO>): Promise<Region>;
  delete(id: number): Promise<void>;
  // Add other methods as needed, such as findAll, count, etc.
}

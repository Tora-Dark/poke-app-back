import { Request, Response } from 'express';
import { validate } from 'class-validator';
import { RegionRequestDTO } from '@interface/dto/request/RegionRequestDTO';
import { RegionResponseDTO } from '@interface/dto/response/RegionResponseDTO';
import { RegionService } from '@infrastructure/services/RegionService';

export class RegionController {
  private service: RegionService;

  constructor(service: RegionService) {
    this.service = service;
  }
  
  async create(req: Request, res: Response): Promise<Response> {
    const dto = Object.assign(new RegionRequestDTO(), req.body);
    const errors = await validate(dto);

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const entity = await this.service.create(dto);
    const responseDto = RegionResponseDTO.fromRaw(entity);
    return res.status(201).json(responseDto);
  }

  async find(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const entity = await this.service.findById(parseInt(id));

    if (!entity) {
      return res.status(404).json({ message: 'Region not found' });
    }

    const responseDto = RegionResponseDTO.fromRaw(entity);
    return res.status(200).json(responseDto);
  }

  async findAll(req: Request, res: Response): Promise<Response> {
    const entities = await this.service.findAll();
    const responseDtos = entities.map(entity => RegionResponseDTO.fromRaw(entity));
    return res.status(200).json(responseDtos);
  }
}

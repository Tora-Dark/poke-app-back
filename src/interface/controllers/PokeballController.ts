import { Request, Response } from 'express';
import { validate } from 'class-validator';
import { PokeballRequestDTO } from '@interface/dto/request/PokeballRequestDTO';
import { PokeballResponseDTO } from '@interface/dto/response/PokeballResponseDTO';
import { PokeballService } from '@infrastructure/services/PokeballService';

export class PokeballController {
  private service: PokeballService;

  constructor(service: PokeballService) {
    this.service = service;
  }
  //http:post('/:id')
  async create(req: Request, res: Response): Promise<Response> {
    const dto = Object.assign(new PokeballRequestDTO(), req.body);
    const errors = await validate(dto);

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const entity = await this.service.create(dto);
    const responseDto = PokeballResponseDTO.fromRaw(entity);
    return res.status(201).json(responseDto);
  }
 //http:get('/:id')
  async find(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const entity = await this.service.findById(parseInt(id));

    if (!entity) {
      return res.status(404).json({ message: 'Pokeball not found' });
    }

    const responseDto = PokeballResponseDTO.fromRaw(entity);
    return res.status(200).json(responseDto);
  }

 //http:get('/')
    async findAll(req: Request, res: Response): Promise<Response> {
    const entities = await this.service.findAll();
    const responseDtos = entities.map(entity => PokeballResponseDTO.fromRaw(entity));
    return res.status(200).json(responseDtos);
  }
}

import { NextFunction, Request, Response } from "express";
import { validate } from "class-validator";
import { UserRequestDTO } from "@interface/dto/request/UserRequestDTO";
import { UserResponseDTO } from "@interface/dto/response/UserResponseDTO";
import { UserService } from "@infrastructure/services/UserService";

export class UserController {
  private service: UserService;

  constructor(service: UserService) {
    this.service = service;
  }

  async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    const dto = Object.assign(new UserRequestDTO(), req.body);
    const errors = await validate(dto);

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const entity = await this.service.create(dto);
    const responseDto = UserResponseDTO.fromRaw(entity);
    return res.status(201).json(responseDto);
  }

  async find(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    const { id } = req.params;
    const entity = await this.service.findById(parseInt(id));

    if (!entity) {
      return res.status(404).json({ message: "User not found" });
    }

    const responseDto = UserResponseDTO.fromRaw(entity);
    return res.status(200).json(responseDto);
  }

  async findAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    const entities = await this.service.findAll();
    const responseDtos = entities.map((entity) =>
      UserResponseDTO.fromRaw(entity)
    );
    return res.status(200).json(responseDtos);
  }
}

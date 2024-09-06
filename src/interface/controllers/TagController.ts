import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";
import { TagRequestDTO } from "@interface/dto/request/TagRequestDTO";
import { TagResponseDTO } from "@interface/dto/response/TagResponseDTO";
import { TagService } from "@infrastructure/services/TagService";

export class TagController {
  private service: TagService;

  constructor(service: TagService) {
    this.service = service;
  }

  //* http:post('/:id')

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    const dto = Object.assign(new TagRequestDTO(), req.body);
    const errors = await validate(dto);

    if (errors.length > 0) {
      res.status(400).json({ message: "Validation failed", errors });
      return;
    }

    const entity = await this.service.create(dto);
    const responseDto = TagResponseDTO.fromRaw(entity);
    res.status(201).json({
      message: "Tag created successfully",
      tag: responseDto,
    });
  }

  //* http:get('/:id')

  async find(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;
    const entity = await this.service.findById(parseInt(id));

    if (!entity) {
      res.status(404).json({ message: "Tag not found" });
      return;
    }

    const responseDto = TagResponseDTO.fromRaw(entity);
    res.status(200).json({
      message: "Tag retrieved successfully",
      result: responseDto,
    });
  }

  //* http:put('/:id')

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    const tagId = parseInt(req.params.id, 10);

    if (isNaN(tagId)) {
      res.status(400).json({ error: "Invalid tag ID" });
      return;
    }

    const dto = Object.assign(new TagRequestDTO(), req.body);
    const errors = await validate(dto);

    if (errors.length > 0) {
      res.status(400).json({ message: "Validation failed", errors });
      return;
    }

    try {
      const updatedEntity = await this.service.update(tagId, dto);

      if (!updatedEntity) {
        res.status(404).json({ error: "Tag not found" });
        return;
      }

      const responseDto = TagResponseDTO.fromRaw(updatedEntity);
      res.status(200).json({
        message: "Tag updated successfully",
        tag: responseDto,
      });
    } catch (error) {
      next(error);
    }
  }

  //* http:delete('/:id')

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;

    try {
      await this.service.delete(parseInt(id));
      res.status(200).json({ message: "Tag deleted successfully" });
    } catch (error) {
      if (error instanceof Error && error.message === 'Tag not found') {
        res.status(404).json({ message: 'Tag not found' });
      } else {
        next(error); // Pass any other errors to the error handling middleware
      }
    }
  }


  //* http:get('/')

  async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    const entities = await this.service.findAll();
    const responseDtos = entities.map((entity) =>
      TagResponseDTO.fromRaw(entity)
    );
    res.status(200).json({
      message: "All products retrieved successfully",
      result: responseDtos,
      error: "" // Add if necessary
    });
  }
}

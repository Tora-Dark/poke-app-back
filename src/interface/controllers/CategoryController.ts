import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";
import { CategoryRequestDTO } from "@interface/dto/request/CategoryRequestDTO";
import { CategoryResponseDTO } from "@interface/dto/response/CategoryResponseDTO";
import { CategoryService } from "@infrastructure/services/CategoryService";

export class CategoryController {
  private service: CategoryService;

  constructor(service: CategoryService) {
    this.service = service;
  }

  //* http:post('/:id')

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    const dto = Object.assign(new CategoryRequestDTO(), req.body);
    const errors = await validate(dto);

    if (errors.length > 0) {
      res.status(400).json({ errors });
      return;
    }

    const entity = await this.service.create(dto);
    const responseDto = CategoryResponseDTO.fromRaw(entity);
    res.status(201).json(responseDto);
  }

  //* http:get('/:id')

  async find(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;
    const entity = await this.service.findById(parseInt(id));

    if (!entity) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    const responseDto = CategoryResponseDTO.fromRaw(entity);
    res.status(200).json({
      message: "Category retrieved successfully",
      result: responseDto,

    });
  }
  //* http:put('/:id')

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;
    const dto = Object.assign(new CategoryRequestDTO(), req.body);
    const errors = await validate(dto);

    // Validate the DTO for potential errors
    if (errors.length > 0) {
      res.status(400).json({ errors });
      return;
    }

    try {
      // Attempt to update the category by its ID
      const updatedEntity = await this.service.update(parseInt(id), dto);

      // If the category doesn't exist, return a 404 error
      if (!updatedEntity) {
        res.status(404).json({ message: "Category not found" });
        return;
      }

      // Map the updated entity to the response DTO and return a success response
      const responseDto = CategoryResponseDTO.fromRaw(updatedEntity);
      res.status(200).json(responseDto);
    } catch (error) {
      // Handle any potential service errors
      next(error);
    }
  }

    //* http:delete('/')
    async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
      const { id } = req.params;
  
      try {
        await this.service.delete(parseInt(id));
        res.status(200).json({ message: "Category deleted successfully" });
      } catch (error) {
        if (error instanceof Error && error.message === 'Tag not found') {
          res.status(404).json({ message: 'Category not found' });
        } else {
          next(error); // Pass any other errors to the error handling middleware
        }
      }
    }
  //* http:get('/')

  async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    const entities = await this.service.findAll();
    const responseDtos = entities.map((entity) =>
      CategoryResponseDTO.fromRaw(entity)
    );
    res.status(200).json({
      message: "All products retrieved successfully",
      result: responseDtos,
    });
  }
}
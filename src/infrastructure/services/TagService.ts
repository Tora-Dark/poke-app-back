import { PrismaClient } from '@prisma/client';
import { ITagService } from '@domain/interfaces/services/ITagService';
import { Tag } from '@domain/entities/Tag';
import { TagRequestDTO } from '@interface/dto/request/TagRequestDTO';

/**
 * Service for managing tags.
 */
export class TagService implements ITagService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient(); // Initializes the Prisma client
  }

  /**
   * Creates a new tag.
   * 
   * @param data - Data for the tag to be created.
   * @returns The created tag instance.
   */
  async create(data: Partial<TagRequestDTO>): Promise<Tag> {
    const entity = Tag.create({
      name: data.name,
    });

    const createdEntity = await this.prisma.tag.create({
      data: {
        name: entity.name,
      }
    });

    return Tag.create(createdEntity);
  }

  /**
   * Finds a tag by its ID.
   * 
   * @param id - ID of the tag to find.
   * @returns The tag instance if found, or null if not found.
   */
  async findById(id: number): Promise<Tag | null> {
    const model = await this.prisma.tag.findUnique({
      where: { id }
    });

    return model ? Tag.create(model) : null;
  }

  /**
   * Updates an existing tag.
   * 
   * @param id - ID of the tag to update.
   * @param data - Data to update the tag with.
   * @returns The updated tag instance.
   */
  async update(id: number, data: Partial<TagRequestDTO>): Promise<Tag> {
    const updatedEntity = await this.prisma.tag.update({
      where: { id },
      data: {
        name: data.name,
      }
    });

    return Tag.create(updatedEntity);
  }

  /**
   * Deletes a tag by its ID.
   * 
   * @param id - ID of the tag to delete.
   * @throws Error if the tag is not found.
   */
  async delete(id: number): Promise<void> {
    if (!(await this.findById(id))) {
      throw new Error('Tag not found');
    }
    await this.prisma.tag.delete({
      where: { id }
    });
  }

  /**
   * Finds all tags.
   * 
   * @returns A list of all tag instances.
   */
  async findAll(): Promise<Tag[]> {
    const models = await this.prisma.tag.findMany();

    return models.map((model) => Tag.create(model));
  }
}

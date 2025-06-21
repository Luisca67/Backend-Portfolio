import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../entities/comment.entity';
import { CreateCommentDto, UpdateCommentDto } from '../dto/comment';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  async findAll(): Promise<Comment[]> {
    return this.commentRepository.find({
      relations: ['project'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Comment | null> {
    return this.commentRepository.findOne({
      where: { id },
      relations: ['project'],
    });
  }

  async findByProject(projectId: number): Promise<Comment[]> {
    return this.commentRepository.find({
      where: { project_id: projectId, is_approved: true },
      order: { createdAt: 'DESC' },
    });
  }

  async findPendingApproval(): Promise<Comment[]> {
    return this.commentRepository.find({
      where: { is_approved: false },
      relations: ['project'],
      order: { createdAt: 'DESC' },
    });
  }

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const comment = this.commentRepository.create(createCommentDto);
    return this.commentRepository.save(comment);
  }

  async update(
    id: number,
    updateCommentDto: UpdateCommentDto,
  ): Promise<Comment | null> {
    const comment = await this.findOne(id);
    if (!comment) {
      throw new NotFoundException(`Comentario con ID ${id} no encontrado`);
    }

    await this.commentRepository.update(id, updateCommentDto);
    return this.findOne(id);
  }

  async approve(id: number): Promise<Comment | null> {
    const comment = await this.findOne(id);
    if (!comment) {
      throw new NotFoundException(`Comentario con ID ${id} no encontrado`);
    }

    await this.commentRepository.update(id, { is_approved: true });
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    const comment = await this.findOne(id);
    if (!comment) {
      throw new NotFoundException(`Comentario con ID ${id} no encontrado`);
    }

    await this.commentRepository.delete(id);
  }
}

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import { CommentService } from '../services/comment.service';
import {
  CreateCommentDto,
  UpdateCommentDto,
  CommentResponseDto,
} from '../dto/comment';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  async findAll(): Promise<CommentResponseDto[]> {
    const comments = await this.commentService.findAll();
    return comments.map((comment) => new CommentResponseDto(comment));
  }

  @Get('pending')
  async findPendingApproval(): Promise<CommentResponseDto[]> {
    const comments = await this.commentService.findPendingApproval();
    return comments.map((comment) => new CommentResponseDto(comment));
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CommentResponseDto | null> {
    const comment = await this.commentService.findOne(id);
    return comment ? new CommentResponseDto(comment) : null;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<CommentResponseDto> {
    const comment = await this.commentService.create(createCommentDto);
    return new CommentResponseDto(comment);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCommentDto: UpdateCommentDto,
  ): Promise<CommentResponseDto | null> {
    const comment = await this.commentService.update(id, updateCommentDto);
    return comment ? new CommentResponseDto(comment) : null;
  }

  @Patch(':id/approve')
  async approve(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CommentResponseDto | null> {
    const comment = await this.commentService.approve(id);
    return comment ? new CommentResponseDto(comment) : null;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.commentService.delete(id);
  }
}

import { Expose } from 'class-transformer';

export class CommentResponseDto {
  @Expose()
  id: number;

  @Expose()
  content: string;

  @Expose()
  author_name: string;

  @Expose()
  author_email: string;

  @Expose()
  is_approved: boolean;

  @Expose()
  rating: number;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  constructor(partial: Partial<CommentResponseDto>) {
    Object.assign(this, partial);
  }
}

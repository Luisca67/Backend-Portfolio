import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  content: string;

  @Column({ length: 100 })
  author_name: string;

  @Column({ length: 100, nullable: true })
  author_email: string;

  @Column({ default: true })
  is_approved: boolean;

  @Column({ type: 'int', nullable: true })
  rating: number; // 1-5 stars

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

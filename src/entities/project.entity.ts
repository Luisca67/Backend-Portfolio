import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';
import { Technology } from './technology.entity';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ length: 500, nullable: true })
  image_url: string;

  @Column({ length: 500, nullable: true })
  github_url: string;

  @Column({ length: 500, nullable: true })
  live_url?: string;

  @Column({ default: true })
  is_active: boolean;

  @Column({ type: 'int', default: 0 })
  order: number;

  @ManyToMany(() => Technology, (technology) => technology.projects)
  technologies: Technology[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

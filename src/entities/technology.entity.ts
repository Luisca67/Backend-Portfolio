import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Project } from './project.entity';

@Entity('technologies')
export class Technology {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text', nullable: true })
  icon: string;

  @Column({ default: true })
  is_active: boolean;

  @Column({ length: 50, default: 'primary' })
  category: string; // frontend, backend, database, etc.

  @ManyToMany(() => Project, (project) => project.technologies)
  @JoinTable({
    name: 'project_technologies',
    joinColumn: { name: 'technology_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'project_id', referencedColumnName: 'id' },
  })
  projects: Project[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

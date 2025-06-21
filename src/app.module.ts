import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './entities/user.entity';
import { Technology } from './entities/technology.entity';
import { Project } from './entities/project.entity';
import { Comment } from './entities/comment.entity';
import { UserService } from './services/user.service';
import { TechnologyService } from './services/technology.service';
import { ProjectService } from './services/project.service';
import { CommentService } from './services/comment.service';
import { UserController } from './controllers/user.controller';
import { TechnologyController } from './controllers/technology.controller';
import { ProjectController } from './controllers/project.controller';
import { CommentController } from './controllers/comment.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      connectTimeoutMS: 20000, // 20 segundos
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_NAME || 'web',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: process.env.NODE_ENV !== 'production', // Solo en desarrollo
      logging: process.env.NODE_ENV !== 'production',
      ssl:
        process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
      extra: {
        ssl:
          process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
      },
    }),
    TypeOrmModule.forFeature([User, Technology, Project, Comment]),
  ],
  controllers: [
    AppController,
    UserController,
    TechnologyController,
    ProjectController,
    CommentController,
  ],
  providers: [
    AppService,
    UserService,
    TechnologyService,
    ProjectService,
    CommentService,
  ],
})
export class AppModule {}

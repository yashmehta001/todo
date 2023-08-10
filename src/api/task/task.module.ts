import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TaskEntity } from 'src/database/entities/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/database/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity, CategoryEntity])],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}

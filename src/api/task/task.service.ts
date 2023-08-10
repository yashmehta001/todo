import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from 'src/database/entities/task.entity';
import { Repository } from 'typeorm';
import { ReqCreateTask } from './dto';
import { CategoryEntity } from 'src/database/entities/category.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,

    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async getTask() {
    const task = await this.taskRepository
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.category', 'category')
      .select([
        'task.id as id',
        'task.name as name',
        'task.description as desciption',
        'category.name as category',
      ])
      .orderBy('category.name', 'DESC')
      .getRawMany();
    return task;
  }

  async createTask(body: ReqCreateTask) {
    const category = await this.categoryRepository.findOne({
      where: { id: body.category },
    });
    if (!category) throw new NotFoundException('Category Not Found');
    const task = this.taskRepository.create({ ...body, category });
    return this.taskRepository.save(task);
  }

  async updateTask(id: number, body: ReqCreateTask): Promise<TaskEntity> {
    const category = await this.categoryRepository.findOne({
      where: { id: body.category },
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    const updatedTask = await this.taskRepository.preload({
      id,
      ...body,
      category,
    });
    if (!updatedTask) {
      throw new NotFoundException('Task not found');
    }
    return this.taskRepository.save(updatedTask);
  }

  async deleteTask(id: number) {
    const task = await this.taskRepository.preload({
      id: id,
      deletedAt: new Date(),
    });
    if (!task) throw new NotFoundException('Task Not Found');
    return this.taskRepository.save(task);
  }
}

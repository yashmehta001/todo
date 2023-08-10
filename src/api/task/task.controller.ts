import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Serialize } from 'src/core/serialize.dto';
import { ReqCreateTask, ResGetTask } from './dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Serialize(ResGetTask)
  @Get()
  async getCategory() {
    return this.taskService.getTask();
  }

  @Serialize()
  @Post()
  async createTask(@Body() body: ReqCreateTask) {
    return this.taskService.createTask(body);
  }

  @Serialize()
  @Put(':id')
  async updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: ReqCreateTask,
  ) {
    return this.taskService.updateTask(id, body);
  }

  @Serialize()
  @Delete(':id')
  async deleteCategory(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.deleteTask(id);
  }
}

import { TasksService } from './tasks.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { TaskDTO } from './dto/task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  async getAllTasks(): Promise<Task[]> {
    return this.taskService.getAllTasks();
  }

  @Get('/:id')
  async getTaskById(@Param('id') id: string): Promise<Task> {
    return this.taskService.getTaskById(id);
  }

  @Delete('/:id')
  async deleteTask(@Param('id') id: string): Promise<void> {
    return this.taskService.deleteTask(id);
  }

  @Patch('/:id/status')
  async updateTaskStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): Promise<Task> {
    return this.taskService.updateTaskStatus(id, status);
  }

  @Post()
  async createNewTask(@Body() taskDto: TaskDTO): Promise<Task> {
    return this.taskService.createNewTask(taskDto);
  }
}

import { TasksService } from './tasks.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { Task } from './task.model';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.taskService.getAllTasks();
  }

  @Post()
  createNewTask(
    @Body('title') title: string,
    @Body('description') description: string,
  ): Task {
    return this.taskService.createNewTask(title, description);
  }
}

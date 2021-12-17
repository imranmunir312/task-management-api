import { TasksService } from './tasks.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { Task } from './task.model';
import { TaskDTO } from './dto/task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.taskService.getAllTasks();
  }

  @Post()
  async createNewTask(@Body() taskDto: TaskDTO): Promise<Task> {
    return this.taskService.createNewTask(taskDto);
  }
}

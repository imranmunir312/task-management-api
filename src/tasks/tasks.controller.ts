import { TasksService } from './tasks.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TaskStatus } from './taskStatus.enum';
import { TaskDTO } from './dto/task.dto';
import { FilteredTaskDto } from './dto/filteredTask.dto';
import { UpdateStatusValidationPipe } from './pipe/updatestatus.pipe';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  // @Get()
  // async getAllTasks(
  //   @Query(ValidationPipe) filter: FilteredTaskDto,
  // ): Promise<Task[]> {
  //   if (filter) {
  //     return this.taskService.getFilteredTasks(filter);
  //   }
  //   return this.taskService.getAllTasks();
  // }

  @Get('/:id')
  async getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.taskService.getTaskById(id);
  }

  // @Delete('/:id')
  // async deleteTask(@Param('id') id: string): Promise<void> {
  //   return this.taskService.deleteTask(id);
  // }

  // @Patch('/:id/status')
  // async updateTaskStatus(
  //   @Param('id') id: string,
  //   @Body('status', UpdateStatusValidationPipe) status: TaskStatus,
  // ): Promise<Task> {
  //   return this.taskService.updateTaskStatus(id, status);
  // }

  // @Post()
  // @UsePipes(ValidationPipe)
  // async createNewTask(@Body() taskDto: TaskDTO): Promise<Task> {
  //   return this.taskService.createNewTask(taskDto);
  // }
}

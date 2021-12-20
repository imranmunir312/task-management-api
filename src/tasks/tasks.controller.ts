import { User } from './../auth/user.entity';
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
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TaskStatus } from './taskStatus.enum';
import { TaskDTO } from './dto/task.dto';
import { FilteredTaskDto } from './dto/filteredTask.dto';
import { UpdateStatusValidationPipe } from './pipe/updatestatus.pipe';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/user.decorater';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  async getAllTasks(
    @GetUser() user: User,
    @Query(ValidationPipe) filter: FilteredTaskDto,
  ): Promise<Task[]> {
    return this.taskService.getTasks(filter, user);
  }

  @Get('/:id')
  async getTaskById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.taskService.getTaskById(id, user);
  }

  @Delete('/:id')
  async deleteTask(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.taskService.deleteTask(id, user);
  }

  @Patch('/:id/status')
  async updateTaskStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', UpdateStatusValidationPipe) status: TaskStatus,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.taskService.updateTaskStatus(id, status, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createNewTask(
    @Body() taskDto: TaskDTO,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.taskService.createNewTask(taskDto, user);
  }
}

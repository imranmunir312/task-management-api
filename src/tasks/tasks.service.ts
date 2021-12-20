import { User } from './../auth/user.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './taskStatus.enum';
import { TaskDTO } from './dto/task.dto';
import { FilteredTaskDto } from './dto/filteredTask.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepositry } from './task.repositry';
import { Task } from './task.entity';
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepositry)
    private taskRepositry: TaskRepositry,
  ) {}

  async getTasks(filterTaskDto: FilteredTaskDto, user: User): Promise<Task[]> {
    return this.taskRepositry.getTasks(filterTaskDto, user);
  }

  async getTaskById(id: number, user: User): Promise<Task> {
    const found = await this.taskRepositry.findOne({
      where: { id, userId: user.id },
    });

    if (!found) {
      throw new NotFoundException(`Task with id "${id}" not found`);
    }

    return found;
  }

  async deleteTask(id: number, user: User): Promise<void> {
    const result = await this.taskRepositry.delete({ id, user });

    if (result.affected === 0) {
      throw new NotFoundException(`Task with id "${id}" not found`);
    }
  }

  async updateTaskStatus(
    id: number,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    const task = await this.getTaskById(id, user);

    task.status = status;
    await task.save();

    return task;
  }

  async createNewTask(taskDto: TaskDTO, user: User): Promise<Task> {
    return this.taskRepositry.createNewTask(taskDto, user);
  }
}

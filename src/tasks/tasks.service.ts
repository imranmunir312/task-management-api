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

  async getTasks(filterTaskDto: FilteredTaskDto): Promise<Task[]> {
    return this.taskRepositry.getTasks(filterTaskDto);
  }

  async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepositry.findOne(id);

    if (!found) {
      throw new NotFoundException(`Task with id "${id}" not found`);
    }

    return found;
  }

  async deleteTask(id: number): Promise<void> {
    const result = await this.taskRepositry.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with id "${id}" not found`);
    }
  }

  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);

    task.status = status;
    await task.save();

    return task;
  }

  async createNewTask(taskDto: TaskDTO): Promise<Task> {
    return this.taskRepositry.createNewTask(taskDto);
  }
}

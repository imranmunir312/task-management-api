import { Injectable, NotFoundException } from '@nestjs/common';
import { v1 as uuid } from 'uuid';
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

  // async getAllTasks(): Promise<Task[]> {
  //   return this.tasks;
  // }

  // async getFilteredTasks(filters: FilteredTaskDto): Promise<Task[]> {
  //   const { status, search } = filters;
  //   if (status) {
  //     return this.tasks.filter((task: Task) => task.status === status);
  //   }
  //   if (search) {
  //     return this.tasks.filter(
  //       (task: Task) =>
  //         task.title.includes(search) || task.description.includes(search),
  //     );
  //   }

  //   return this.tasks;
  // }

  async getTaskById(id: number): Promise<Task> {
    const found = this.taskRepositry.findOne(id);

    if (!found) {
      throw new NotFoundException(`Task with id "${id}" not found`);
    }

    return found;
  }

  // async deleteTask(id: string): Promise<void> {
  // this.tasks = this.tasks.filter((task: Task) => task.id !== id);
  // }

  // async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
  //   const task = await this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }

  // async createNewTask(taskDto: TaskDTO): Promise<Task> {
  //   const { title, description } = taskDto;

  //   // const task: Task = {
  //   //   id: uuid(),
  //   //   title,
  //   //   description,
  //   //   status: TaskStatus.OPEN,
  //   // };

  //   this.tasks.push(task);

  //   return task;
  // }
}

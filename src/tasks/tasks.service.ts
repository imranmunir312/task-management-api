import { Injectable } from '@nestjs/common';
import { v1 as uuid } from 'uuid';
import { Task, TaskStatus } from './task.model';
import { TaskDTO } from './dto/task.dto';
import { FilteredTaskDto } from './dto/filteredTask.dto';
@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  async getAllTasks(): Promise<Task[]> {
    return this.tasks;
  }

  async getFilteredTasks(filters: FilteredTaskDto): Promise<Task[]> {
    const { status, search } = filters;
    if (status) {
      return this.tasks.filter((task: Task) => task.status === status);
    }
    if (search) {
      return this.tasks.filter(
        (task: Task) =>
          task.title.includes(search) || task.description.includes(search),
      );
    }

    return this.tasks;
  }

  async getTaskById(id: string): Promise<Task> {
    const found = this.tasks.find((task: Task) => task.id === id);
    return found;
  }

  async deleteTask(id: string): Promise<void> {
    this.tasks = this.tasks.filter((task: Task) => task.id !== id);
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    return task;
  }

  async createNewTask(taskDto: TaskDTO): Promise<Task> {
    const { title, description } = taskDto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }
}

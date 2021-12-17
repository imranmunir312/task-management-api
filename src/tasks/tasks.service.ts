import { Injectable } from '@nestjs/common';
import { v1 as uuid } from 'uuid';
import { Task, TaskStatus } from './task.model';
import { TaskDTO } from './dto/task.dto';
@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
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

import { User } from './../auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { FilteredTaskDto } from './dto/filteredTask.dto';
import { TaskDTO } from './dto/task.dto';
import { Task } from './task.entity';
import { TaskStatus } from './taskStatus.enum';

@EntityRepository(Task)
export class TaskRepositry extends Repository<Task> {
  async createNewTask(taskDto: TaskDTO, user: User): Promise<Task> {
    const task = new Task();
    task.title = taskDto.title;
    task.description = taskDto.description;
    task.status = TaskStatus.OPEN;
    task.user = user;

    await task.save();
    return task;
  }

  async getTasks(filterTaskDto: FilteredTaskDto, user: User): Promise<Task[]> {
    const { status, search } = filterTaskDto;

    const query = this.createQueryBuilder('task');

    query.where('task.userId = :userId', { userId: user.id });

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(task.title LIKE :search OR task.description LIKE :search)',
        { search: `%${search}%` },
      );
    }

    const tasks: Task[] = await query.getMany();

    return tasks;
  }
}

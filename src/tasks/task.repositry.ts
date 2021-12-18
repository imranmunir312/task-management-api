import { EntityRepository, Repository } from 'typeorm';
import { FilteredTaskDto } from './dto/filteredTask.dto';
import { TaskDTO } from './dto/task.dto';
import { Task } from './task.entity';
import { TaskStatus } from './taskStatus.enum';

@EntityRepository(Task)
export class TaskRepositry extends Repository<Task> {
  async createNewTask(taskDto: TaskDTO): Promise<Task> {
    const task = new Task();
    task.title = taskDto.title;
    task.description = taskDto.description;
    task.status = TaskStatus.OPEN;

    await task.save();
    return task;
  }

  async getTasks(filterTaskDto: FilteredTaskDto): Promise<Task[]> {
    const { status, search } = filterTaskDto;

    const query = this.createQueryBuilder('task');

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

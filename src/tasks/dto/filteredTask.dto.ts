import { TaskStatus } from '../task.model';

export class FilteredTaskDto {
  status: TaskStatus;
  search: string;
}

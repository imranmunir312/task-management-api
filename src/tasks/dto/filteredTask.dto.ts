import { IsNotEmpty } from 'class-validator';
import { IsIn, IsOptional } from 'class-validator';
import { TaskStatus } from '../taskStatus.enum';

export class FilteredTaskDto {
  @IsOptional()
  @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
  status: TaskStatus;

  @IsNotEmpty()
  @IsOptional()
  search: string;
}

import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../task.model';

export class UpdateStatusValidationPipe implements PipeTransform {
  readonly allowedStatus = [
    TaskStatus.DONE,
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
  ];

  transform(value: any) {
    if (!this.allowedStatus.includes(value)) {
      throw new BadRequestException(`"${value}" is an invalid status`);
    }
    return value;
  }
}

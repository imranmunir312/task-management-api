import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepositry } from './task.repositry';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([TaskRepositry])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}

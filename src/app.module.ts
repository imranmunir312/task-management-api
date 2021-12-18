import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './config/typeorm.config';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [TasksModule, TypeOrmModule.forRoot(TypeOrmConfig)],
  controllers: [],
  providers: [],
})
export class AppModule {}

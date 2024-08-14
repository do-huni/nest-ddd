import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShuttleEntity } from './infra/entities/shuttle.entity';
import { CreateNewShuttleUseCase } from './applications/CreateNewShuttleUseCase/createNewShuttleUseCase';
import { ShuttlesRepository } from './infra/repositories/shuttles.repository';
import { ShuttlesCommandController } from './controllers/command/shuttles.command.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ShuttleEntity])],
  providers: [CreateNewShuttleUseCase, ShuttlesRepository],
  controllers: [ShuttlesCommandController],
  exports: [],
})
export class ShuttlesModule {}

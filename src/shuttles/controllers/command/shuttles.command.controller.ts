import { Controller, Post, Body } from '@nestjs/common';
import { CreateNewShuttleUseCase } from 'src/shuttles/applications/CreateNewShuttleUseCase/createNewShuttleUseCase';
import { CreateShuttleDto } from 'src/shuttles/applications/dto/createShuttleDto';

@Controller('shuttles/command')
export class ShuttlesCommandController {
  constructor(
    private readonly createNewShuttleUseCase: CreateNewShuttleUseCase,
  ) {}

  @Post()
  async createShuttle(@Body() createShuttleDto: CreateShuttleDto) {
    const shuttle =
      await this.createNewShuttleUseCase.execute(createShuttleDto);
    return shuttle;
  }
}

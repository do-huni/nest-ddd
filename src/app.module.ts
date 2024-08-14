import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShuttlesModule } from './shuttles/shuttles.module';

@Module({
  imports: [
    ShuttlesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'do-huni',
      password: '6295',
      database: 'nestddd',
      entities: [__dirname + '/**/infra/entities/*.entity.*'],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { IsNotEmpty, IsNumber, IsEnum, IsDateString } from 'class-validator';
import { ShuttleStatus } from '../../domain/shuttle-status.enum';

export class CreateShuttleDto {
  @IsNumber()
  @IsNotEmpty()
  concertDatesId: number;

  @IsNotEmpty()
  name: string;

  @IsEnum(ShuttleStatus)
  @IsNotEmpty()
  status: ShuttleStatus;

  @IsDateString()
  @IsNotEmpty()
  reservationDeadline: Date;

  @IsDateString()
  @IsNotEmpty()
  earlyBirdDeadline: Date;

  @IsNumber()
  @IsNotEmpty()
  earlyBirdPriceConcert: number;

  @IsNumber()
  @IsNotEmpty()
  earlyBirdPriceReturn: number;

  @IsNumber()
  @IsNotEmpty()
  earlyBirdPriceRound: number;

  @IsNumber()
  @IsNotEmpty()
  regularPriceConcert: number;

  @IsNumber()
  @IsNotEmpty()
  regularPriceReturn: number;

  @IsNumber()
  @IsNotEmpty()
  regularPriceRound: number;

  @IsNumber()
  @IsNotEmpty()
  maxPassengerCount: number;

  @IsNumber()
  @IsNotEmpty()
  toConcertCount: number;

  @IsNumber()
  @IsNotEmpty()
  returnTripCount: number;
}

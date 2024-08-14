import { Injectable } from '@nestjs/common';
import { ShuttlePrice } from 'src/shuttles/domain/shuttle-price.value-object';
import { Shuttle } from 'src/shuttles/domain/shuttle.aggregate-root';
import { ShuttlesRepository } from 'src/shuttles/infra/repositories/shuttles.repository';
import { CreateShuttleDto } from '../dto/createShuttleDto';

@Injectable()
export class CreateNewShuttleUseCase {
  constructor(private readonly shuttleRepository: ShuttlesRepository) {}

  async execute(createShuttleDto: CreateShuttleDto): Promise<Shuttle> {
    const {
      concertDatesId,
      name,
      status,
      reservationDeadline,
      earlyBirdDeadline,
      earlyBirdPriceConcert,
      earlyBirdPriceReturn,
      earlyBirdPriceRound,
      regularPriceConcert,
      regularPriceReturn,
      regularPriceRound,
      maxPassengerCount,
      toConcertCount,
      returnTripCount,
    } = createShuttleDto;

    // ShuttlePrice 객체 생성
    const prices = new ShuttlePrice(
      earlyBirdPriceConcert,
      earlyBirdPriceReturn,
      earlyBirdPriceRound,
      regularPriceConcert,
      regularPriceReturn,
      regularPriceRound,
    );

    // Shuttle AggregateRoot 객체 생성
    const shuttle = new Shuttle(
      null, // ID는 자동 생성될 것이므로 null
      concertDatesId,
      name,
      status,
      reservationDeadline,
      earlyBirdDeadline,
      prices,
      maxPassengerCount,
      toConcertCount,
      returnTripCount,
    );

    // Shuttle 저장
    await this.shuttleRepository.saveOne(shuttle);

    return shuttle;
  }
}

import { DataSource, Repository } from 'typeorm';
import { ShuttleEntity } from '../entities/shuttle.entity';
import { Injectable } from '@nestjs/common';
import { Shuttle } from 'src/shuttles/domain/shuttle.aggregate-root';
import { ShuttlePrice } from 'src/shuttles/domain/shuttle-price.value-object';
import { ConcertDateEntity } from 'src/concertDates/infra/entities/concertDate.entity';

@Injectable()
export class ShuttlesRepository extends Repository<ShuttleEntity> {
  constructor(private db_dataSource: DataSource) {
    super(ShuttleEntity, db_dataSource.createEntityManager());
  }

  async findById(id: number): Promise<Shuttle | null> {
    const shuttleEntity = await this.findOne({ where: { id } });
    if (!shuttleEntity) {
      return null;
    }
    return this.toDomain(shuttleEntity);
  }

  async saveOne(shuttle: Shuttle): Promise<number> {
    const shuttleEntity = this.toEntity(shuttle);
    return (await this.save(shuttleEntity)).id;
  }

  async deleteOne(id: number): Promise<void> {
    await this.delete(id);
  }

  private toDomain(entity: ShuttleEntity): Shuttle {
    return new Shuttle(
      entity.id,
      entity.concertDatesId,
      entity.name,
      entity.status,
      entity.reservationDeadline,
      entity.earlyBirdDeadline,
      entity.prices, // ShuttlePrice 객체로 변환된 필드
      entity.maxPassengerCount,
      entity.toConcertCount,
      entity.returnTripCount,
    );
  }

  private toEntity(shuttle: Shuttle): ShuttleEntity {
    const shuttleEntity = new ShuttleEntity();
    shuttleEntity.id = shuttle.getId();
    shuttleEntity.concertDatesId = shuttle.getConcertDatesId();
    shuttleEntity.concertDate = {
      id: shuttle.getConcertDatesId(),
    } as ConcertDateEntity;
    shuttleEntity.name = shuttle.getName();
    shuttleEntity.status = shuttle.getStatus();
    shuttleEntity.reservationDeadline = shuttle.getReservationDeadline();
    shuttleEntity.earlyBirdDeadline = shuttle.getEarlyBirdDeadline();
    shuttleEntity.prices = shuttle.getPrices(); // ShuttlePrice 객체를 엔티티에 할당
    shuttleEntity.maxPassengerCount = shuttle.getMaxPassengerCount();
    shuttleEntity.toConcertCount = shuttle.getToConcertCount();
    shuttleEntity.returnTripCount = shuttle.getReturnTripCount();

    return shuttleEntity;
  }
}

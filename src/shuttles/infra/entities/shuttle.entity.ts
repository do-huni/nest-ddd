import { ConcertDateEntity } from 'src/concertDates/infra/entities/concertDate.entity';
import { ShuttlePrice } from 'src/shuttles/domain/shuttle-price.value-object';
import { ShuttleStatus } from 'src/shuttles/domain/shuttle-status.enum';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';

@Entity('shuttle')
export class ShuttleEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @ManyToOne(() => ConcertDateEntity)
  @JoinColumn({ name: 'concert_dates_id' })
  concertDate: ConcertDateEntity;

  @RelationId((shuttle: ShuttleEntity) => shuttle.concertDate)
  @Column({ name: 'concert_dates_id' })
  concertDatesId: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'status', type: 'enum', enum: ShuttleStatus })
  status: ShuttleStatus;

  @Column({ name: 'reservation_deadline', type: 'timestamp' })
  reservationDeadline: Date;

  @Column({ name: 'early_bird_deadline', type: 'timestamp' })
  earlyBirdDeadline: Date;

  @Column(() => ShuttlePrice, { prefix: false })
  prices: ShuttlePrice;

  @Column({ name: 'max_passenger_count' })
  maxPassengerCount: number;

  @Column({ name: 'to_concert_count' })
  toConcertCount: number;

  @Column({ name: 'return_trip_count' })
  returnTripCount: number;
}

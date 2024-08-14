import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('concert_date')
export class ConcertDateEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  //   @ManyToOne(() => Concert)
  //   @JoinColumn({ name: 'concert_id' })
  //   concert: Concert;

  //   @RelationId((concertDate: ConcertDate) => concertDate.concert)
  //   @Column({ name: 'concert_id' })
  //   concertId: number;

  @Column({ name: 'start_time', type: 'timestamp' })
  startTime: Date;

  @Column({ name: 'date', type: 'date' })
  date: Date;
}

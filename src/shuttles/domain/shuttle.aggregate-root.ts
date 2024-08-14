import { AggregateRoot } from '@nestjs/cqrs';
import { ShuttlePrice } from './shuttle-price.value-object';
import { ShuttleStatus } from './shuttle-status.enum'; // Enum
import { ShuttleStatusUpdatedEvent } from './events/shuttle-update.event';

export class Shuttle extends AggregateRoot {
  private id: number;
  private concertDatesId: number;
  private name: string;
  private status: ShuttleStatus;
  private reservationDeadline: Date;
  private earlyBirdDeadline: Date;
  private prices: ShuttlePrice;
  private maxPassengerCount: number;
  private toConcertCount: number;
  private returnTripCount: number;

  constructor(
    id: number,
    concertDatesId: number,
    name: string,
    status: ShuttleStatus,
    reservationDeadline: Date,
    earlyBirdDeadline: Date,
    prices: ShuttlePrice,
    maxPassengerCount: number,
    toConcertCount: number,
    returnTripCount: number,
  ) {
    super();
    this.id = id;
    this.concertDatesId = concertDatesId;
    this.name = name;
    this.status = status;
    this.reservationDeadline = reservationDeadline;
    this.earlyBirdDeadline = earlyBirdDeadline;
    this.prices = prices;
    this.maxPassengerCount = maxPassengerCount;
    this.toConcertCount = toConcertCount;
    this.returnTripCount = returnTripCount;
    this.validateShuttle();
  }

  // Getter methods
  getId(): number {
    return this.id;
  }

  getConcertDatesId(): number {
    return this.concertDatesId;
  }

  getName(): string {
    return this.name;
  }

  getStatus(): ShuttleStatus {
    return this.status;
  }

  getReservationDeadline(): Date {
    return this.reservationDeadline;
  }

  getEarlyBirdDeadline(): Date {
    return this.earlyBirdDeadline;
  }

  getPrices(): ShuttlePrice {
    return this.prices;
  }

  getMaxPassengerCount(): number {
    return this.maxPassengerCount;
  }

  getToConcertCount(): number {
    return this.toConcertCount;
  }

  getReturnTripCount(): number {
    return this.returnTripCount;
  }

  private validateShuttle() {
    if (!this.name || this.name.trim() === '') {
      throw new Error('Shuttle name is required');
    }
    if (this.maxPassengerCount <= 0) {
      throw new Error('Max passenger count must be greater than 0');
    }
    this.prices.validatePrices();
  }

  updateStatus(newStatus: ShuttleStatus) {
    this.status = newStatus;
    // 도메인 이벤트를 발행할 수 있습니다.
    this.apply(new ShuttleStatusUpdatedEvent(this.id, newStatus));
  }

  isEarlyBirdPeriod(): boolean {
    const now = new Date();
    return now < this.earlyBirdDeadline;
  }

  updatePrices(newPrices: ShuttlePrice) {
    this.prices = newPrices;
    this.prices.validatePrices();
  }

  addPassengers(count: number) {
    if (this.toConcertCount + count > this.maxPassengerCount) {
      throw new Error('Cannot exceed max passenger count');
    }
    this.toConcertCount += count;
  }

  removePassengers(count: number) {
    if (this.toConcertCount - count < 0) {
      throw new Error('Cannot have negative passengers');
    }
    this.toConcertCount -= count;
  }

  // 기타 셔틀 관련 비즈니스 로직을 여기에 추가할 수 있습니다.
}

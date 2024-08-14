import { ShuttleStatus } from '../shuttle-status.enum';

export class ShuttleStatusUpdatedEvent {
  constructor(
    public readonly shuttleId: number,
    public readonly newStatus: ShuttleStatus,
  ) {}
}

import { IEvent } from '@nestjs/cqrs';

export class NotificationRegisterEvent implements IEvent {
  constructor(
    public email: string,
    public fullName: string,
  ) {}
}

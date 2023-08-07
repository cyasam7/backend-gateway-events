import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ClientProxy } from '@nestjs/microservices';

import { EMicroservices } from 'src/global';

import { NotificationRegisterEvent } from './NotificationRegisterEvent';

@EventsHandler(NotificationRegisterEvent)
export class NotificationRegisterEventHandler
  implements IEventHandler<NotificationRegisterEvent>
{
  constructor(
    @Inject(EMicroservices.NOTIFICATIONS) private client: ClientProxy,
  ) {}

  handle(event: NotificationRegisterEvent): void {
    console.log(event);

    this.client.emit('user_created', {
      to: event.email,
      subject: 'Registro completado',
      text: `Te has registrado ${event.fullName} correctamente`,
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    });
  }
}

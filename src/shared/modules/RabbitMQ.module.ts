import { DynamicModule, Module } from '@nestjs/common';
import {
  ClientProvider,
  ClientsModule,
  Transport,
} from '@nestjs/microservices';

import { IEnvConfig, config } from 'src/config';
import { EMicroservices, EQueue } from 'src/global';

interface IRabbitMQModule {
  name: EMicroservices;
  queue: EQueue;
}

@Module({})
export class RabbitMQModule {
  static register({ name, queue }: IRabbitMQModule): DynamicModule {
    return {
      module: RabbitMQModule,
      imports: [
        ClientsModule.registerAsync([
          {
            name: name,
            inject: [config.KEY],
            useFactory: (configService: IEnvConfig): ClientProvider => {
              return {
                transport: Transport.RMQ,
                options: {
                  urls: [configService.RABBIT_MQ_URI as string],
                  queue: queue,
                  queueOptions: {
                    durable: false,
                  },
                },
              };
            },
          },
        ]),
      ],
      exports: [ClientsModule],
    };
  }
}

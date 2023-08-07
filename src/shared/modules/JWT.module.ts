import { DynamicModule, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { IEnvConfig, config } from 'src/config';

type TypeToken = 'ACCESS' | 'REFRESH';

@Module({})
export class JWTModule {
  static register(token: TypeToken): DynamicModule {
    return {
      module: JWTModule,
      imports: [
        JwtModule.registerAsync({
          inject: [config.KEY],
          useFactory: async (config: IEnvConfig) => {
            return {
              secret: config.SECRET_WORD,
              signOptions: {
                expiresIn:
                  token === 'ACCESS'
                    ? config.EXPIRATION_TIME_ACCESS_TOKEN
                    : config.EXPIRATION_TIME_REFRESH_TOKEN,
              },
            };
          },
        }),
      ],
      exports: [JWTModule],
      global: true,
    };
  }
}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HealthCheck } from './apps/health-check/health-check.module';
import { UserModule } from './apps/user/user.module';
import { IEnvConfig, config, joiSchemaEnv } from './config';

export const isDev = process.env.NODE_ENV === 'dev' ? true : false;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      validationSchema: joiSchemaEnv,
    }),
    {
      ...JwtModule.registerAsync({
        inject: [config.KEY],
        useFactory: async (env: IEnvConfig) => {
          return {
            secret: env.SECRET_WORD,
          };
        },
      }),
      global: true,
    },
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: async (config: IEnvConfig) => {
        return {
          type: 'postgres',
          host: config.DB_HOST,
          port: 5432,
          username: config.DB_USER,
          password: config.DB_PASSWORD,
          database: config.DB_NAME,
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true,
        };
      },
    }),
    UserModule,
    HealthCheck,
  ],
  providers: [],
  exports: [JwtModule],
})
export class AppModule {}

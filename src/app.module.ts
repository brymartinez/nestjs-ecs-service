import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Payment } from './entity/payment.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => {
        return {
          type: 'postgres',
          url: config.get<string>('DB_CONNSTRING'),
          autoLoadEntities: true,
          synchronize: true, // for dev use only
        };
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Payment]),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

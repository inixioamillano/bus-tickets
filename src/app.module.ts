import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'bus_tickets',
      entities: [
        User
      ],
      synchronize: true, // to synchronize with the bbdd automaticall
    }),
    ConfigModule.forRoot({
      isGlobal: true
    }),
    UserModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule {}

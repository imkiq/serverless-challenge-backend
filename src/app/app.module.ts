import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from '../employee/employee.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'employees-database.c0g5ccin7hw5.us-east-2.rds.amazonaws.com',
      port: 3306,
      username: 'root',
      password: 'Admin12#4',
      database: 'employees-db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    EmployeeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

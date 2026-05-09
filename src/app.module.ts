import { Module } from '@nestjs/common';
import { AppController } from './app/controller/app.controller';
import { AppService } from './app/service/app.service';
import { HomeModule } from './app/module/home.module';
import { AppCustomersModulesUsingPostgreSQL } from './factory/postgresql/modules-using-postgresql.module';
import { DatabasePersistenceModule } from './shared/connections/database/database-persistence.module';

@Module({
  imports: [
    HomeModule, 
    AppCustomersModulesUsingPostgreSQL,
    DatabasePersistenceModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

import { Module } from '@nestjs/common';
import { PostgreSqlWorkerModule } from '../../modules/workers/infrastructure/modules/postgresql/postgresql.worker.module';
@Module({
  imports: [PostgreSqlWorkerModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppCustomersModulesUsingPostgreSQL {}

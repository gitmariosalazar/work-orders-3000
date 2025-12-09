import { Module } from '@nestjs/common';
import { KafkaServiceModule } from '../../../../../shared/kafka/kafka-service.module';
import { WorkerController } from '../../controllers/worker.controller';
import { DatabaseServicePostgreSQL } from '../../../../../shared/connections/database/postgresql/postgresql.service';
import { WorkerService } from '../../../application/services/worker.service';
import { PostgreSqlWorkerPersistence } from '../../repositories/postgresql/persistence/postgresql.worker.persistence';

@Module({
  imports: [KafkaServiceModule],
  controllers: [WorkerController],
  providers: [
    DatabaseServicePostgreSQL,
    WorkerService,
    {
      provide: 'WorkerRepository',
      useClass: PostgreSqlWorkerPersistence,
    },
  ],
  exports: [],
})
export class PostgreSqlWorkerModule {}

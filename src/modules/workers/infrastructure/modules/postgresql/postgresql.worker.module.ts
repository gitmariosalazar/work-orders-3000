import { Module } from '@nestjs/common';
import { KafkaServiceModule } from '../../../../../shared/kafka/kafka-service.module';
import { WorkerController } from '../../controllers/worker.controller';
import { WorkerService } from '../../../application/services/worker.service';
import { PostgreSqlWorkerPersistence } from '../../repositories/postgresql/persistence/postgresql.worker.persistence';
import { DatabasePersistenceModule } from '../../../../../shared/connections/database/database-persistence.module';

@Module({
  imports: [KafkaServiceModule, DatabasePersistenceModule],
  controllers: [WorkerController],
  providers: [
    WorkerService,
    {
      provide: 'WorkerRepository',
      useClass: PostgreSqlWorkerPersistence,
    },
  ],
  exports: [],
})
export class PostgreSqlWorkerModule {}

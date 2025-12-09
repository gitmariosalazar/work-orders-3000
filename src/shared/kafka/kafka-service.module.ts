import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { environments } from '../../settings/environments/environments';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: environments.WORKERS_KAFKA_CLIENT,
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: [environments.KAFKA_BROKER_URL],
            clientId: environments.WORKERS_KAFKA_CLIENT_ID,
          },
          consumer: {
            groupId: environments.WORKERS_KAFKA_GROUP_ID,
            allowAutoTopicCreation: true,
          },
        },
      },
    ]),
  ],
})
export class KafkaServiceModule {}

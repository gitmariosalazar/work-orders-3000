import { Global, Module } from '@nestjs/common';
import { DatabaseAbstract } from './abstract/abstract.database';
import { DatabaseServicePostgreSQL } from './postgresql/postgresql.service';
import { DatabaseServiceMySQL } from './mysql/mysql.service';
import { environments } from '../../../settings/environments/environments';

@Global()
@Module({
  providers: [
    {
      provide: DatabaseAbstract,
      useFactory: () => {
        const type = environments.DATABASE_TYPE || 'postgres';
        if (type === 'mysql') {
          return new DatabaseServiceMySQL();
        }
        return new DatabaseServicePostgreSQL();
      },
    },
  ],
  exports: [DatabaseAbstract],
})
export class DatabasePersistenceModule {}

import { Injectable } from '@nestjs/common';
import { InterfaceWorkerRepository } from '../../../../domain/contracts/worker.interface.repository';
import { DatabaseServicePostgreSQL } from '../../../../../../shared/connections/database/postgresql/postgresql.service';
import { WorkerResponse } from '../../../../domain/schemas/dto/response/worker.response';
import { WorkerSqlResponse } from '../../../interfaces/worker.sql.response';
import { RpcException } from '@nestjs/microservices';
import { statusCode } from '../../../../../../settings/environments/status-code';
import { WorkerAdapter } from '../adapters/worker.adapters';

@Injectable()
export class PostgreSqlWorkerPersistence implements InterfaceWorkerRepository {
  constructor(private readonly postgreSqlService: DatabaseServicePostgreSQL) {}

  async findAllWorkers(): Promise<WorkerResponse[]> {
    try {
      const query: string = `
      select
          t.id_trabajador as worker_id,
          t.tr_identificacion as identification,
          t.tr_apellidos as last_names,
          t.tr_nombres as first_ames,
          t.tr_telefono as phone_number,
          t.tr_celular as cell_phone,
          t.tr_correoe as email,
          t.tr_direccion as address
      from trabajadores t;
      `;

      const result: WorkerSqlResponse[] =
        await this.postgreSqlService.query<WorkerSqlResponse>(query);

      if (result.length === 0) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Workers not found!`,
        });
      }

      const response: WorkerResponse[] = result.map((worker) =>
        WorkerAdapter.fromWorkerSqlResponseToWorkerResponse(worker),
      );

      return response;
    } catch (error) {
      throw error;
    }
  }
}

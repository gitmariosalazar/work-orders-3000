import { Injectable } from '@nestjs/common';
import { InterfaceWorkerRepository } from '../../../../domain/contracts/worker.interface.repository';
import { WorkerResponse } from '../../../../domain/schemas/dto/response/worker.response';
import { WorkerSqlResponse } from '../../../interfaces/worker.sql.response';
import { RpcException } from '@nestjs/microservices';
import { statusCode } from '../../../../../../settings/environments/status-code';
import { WorkerAdapter } from '../adapters/worker.adapters';
import { DatabaseAbstract } from '../../../../../../shared/connections/database/abstract/abstract.database';

@Injectable()
export class PostgreSqlWorkerPersistence implements InterfaceWorkerRepository {
  constructor(private readonly databaseService: DatabaseAbstract) {}

  async findAllWorkers(): Promise<WorkerResponse[]> {
    try {
      const query: string = `
      select
          t.id_trabajador as worker_id,
          t.tr_identificacion as identification,
          t.tr_apellidos as last_names,
          t.tr_nombres as first_names,
          t.tr_telefono as phone_number,
          t.tr_celular as cell_phone,
          t.tr_correoe as email,
          t.tr_direccion as address
      from trabajadores t;
      `;

      const result: WorkerSqlResponse[] =
        await this.databaseService.query<WorkerSqlResponse>(query);

      if (result.length === 0) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Workers not found!`,
        });
      }

      return result.map((worker) =>
        WorkerAdapter.fromWorkerSqlResponseToWorkerResponse(worker),
      );
    } catch (error) {
      throw error;
    }
  }

  async findAllWorkersPaginated(params: { limit: number; offset: number; query?: string }): Promise<WorkerResponse[]> {
    try {
      const { limit, offset, query: searchQuery } = params;

      let whereClause = '';
      const queryParams: any[] = [];

      if (searchQuery) {
        whereClause = `WHERE t.tr_nombres ILIKE ? OR t.tr_apellidos ILIKE ? OR t.tr_identificacion ILIKE ?`;
        const searchParam = `%${searchQuery}%`;
        queryParams.push(searchParam, searchParam, searchParam);
      }

      const query: string = `
      select
          t.id_trabajador as worker_id,
          t.tr_identificacion as identification,
          t.tr_apellidos as last_names,
          t.tr_nombres as first_names,
          t.tr_telefono as phone_number,
          t.tr_celular as cell_phone,
          t.tr_correoe as email,
          t.tr_direccion as address
      from trabajadores t
      ${whereClause}
      order by t.id_trabajador
      limit ? offset ?;
      `;

      queryParams.push(limit, offset);

      const result: WorkerSqlResponse[] =
        await this.databaseService.query<WorkerSqlResponse>(query, queryParams);

      if (result.length === 0) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Workers not found!`,
        });
      }

      return result.map((worker) =>
        WorkerAdapter.fromWorkerSqlResponseToWorkerResponse(worker),
      );
    } catch (error) {
      throw error;
    }
  }
}

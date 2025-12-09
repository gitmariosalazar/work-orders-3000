import { WorkerResponse } from '../../../../domain/schemas/dto/response/worker.response';
import { WorkerSqlResponse } from '../../../interfaces/worker.sql.response';

export class WorkerAdapter {
  static fromWorkerSqlResponseToWorkerResponse(
    workerSqlResponse: WorkerSqlResponse,
  ): WorkerResponse {
    return {
      workerId: workerSqlResponse.worker_id,
      identification: workerSqlResponse.identification,
      lastNames: workerSqlResponse.last_names,
      firstNames: workerSqlResponse.first_names,
      phoneNumber: workerSqlResponse.phone_number,
      cellPhone: workerSqlResponse.cell_phone,
      email: workerSqlResponse.email,
      address: workerSqlResponse.address,
    };
  }
}

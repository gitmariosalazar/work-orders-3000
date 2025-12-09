import { WorkerResponse } from '../schemas/dto/response/worker.response';

export interface InterfaceWorkerRepository {
  findAllWorkers(): Promise<WorkerResponse[]>;
}

import { WorkerResponse } from '../schemas/dto/response/worker.response';

export interface InterfaceWorkerRepository {
  findAllWorkers(): Promise<WorkerResponse[]>;
  findAllWorkersPaginated(params: { limit: number; offset: number; query?: string }): Promise<WorkerResponse[]>;
}

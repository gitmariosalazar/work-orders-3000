import { WorkerResponse } from '../../domain/schemas/dto/response/worker.response';

export interface InterfaceWorkerUseCase {
  findAllWorkers(): Promise<WorkerResponse[]>;
  findAllWorkersPaginated(params: { limit: number; offset: number; query?: string }): Promise<WorkerResponse[]>;
}

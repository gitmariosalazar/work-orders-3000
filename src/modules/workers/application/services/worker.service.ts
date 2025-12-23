import { Inject, Injectable } from '@nestjs/common';
import { InterfaceWorkerUseCase } from '../usecases/worker.use-case.interface';
import { InterfaceWorkerRepository } from '../../domain/contracts/worker.interface.repository';
import { WorkerResponse } from '../../domain/schemas/dto/response/worker.response';
import { RpcException } from '@nestjs/microservices';
import { statusCode } from '../../../../settings/environments/status-code';

@Injectable()
export class WorkerService implements InterfaceWorkerUseCase {
  constructor(
    @Inject('WorkerRepository')
    private readonly workerRepository: InterfaceWorkerRepository,
  ) {}

  async findAllWorkers(): Promise<WorkerResponse[]> {
    try {
      const workers: WorkerResponse[] =
        await this.workerRepository.findAllWorkers();
      if (workers.length === 0) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Workers not found!`,
        });
      }
      return workers;
    } catch (error) {
      throw error;
    }
  }

  async findAllWorkersPaginated(params: { limit: number; offset: number; query?: string }): Promise<WorkerResponse[]> {
    try {
      const workers: WorkerResponse[] =
        await this.workerRepository.findAllWorkersPaginated(params);
      if (workers.length === 0) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Workers not found!`,
        });
      }
      return workers;
    } catch (error) {
      throw error;
    }
  }
}

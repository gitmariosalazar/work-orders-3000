import { Controller, Get } from '@nestjs/common';
import { WorkerService } from '../../application/services/worker.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('workers')
export class WorkerController {
  constructor(private readonly workerService: WorkerService) {}

  @Get()
  @MessagePattern('workers.find-all-workers')
  async findAllWorkers() {
    return this.workerService.findAllWorkers();
  }
}

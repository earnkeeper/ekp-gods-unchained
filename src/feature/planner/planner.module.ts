import { Module } from '@nestjs/common';
import { ApiModule } from '../../shared/api';
import { DbModule } from '../../shared/db';
import { PlannerController } from './planner.controller';
import { PlannerService } from './planner.service';


@Module({
  imports: [ApiModule, DbModule],

  providers: [PlannerController, PlannerService],
})
export class PlannerModule{}

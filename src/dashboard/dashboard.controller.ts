import { Controller, Get } from '@nestjs/common';
import { DashboardService, Summary } from './dashboard.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('dashboard')
@ApiBearerAuth()
@Controller('dashboard')
export class DashboardController {
    // GET    /api/dashboard/summary
    constructor(private readonly dashboardSevice:DashboardService){}

    @Get('/summary')
      getSummary(): Promise<Summary>{
        return this.dashboardSevice.getSummary();
    }

}

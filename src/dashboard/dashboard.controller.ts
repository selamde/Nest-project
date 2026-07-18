import { Controller, Get } from '@nestjs/common';
import { DashboardService, Summary } from './dashboard.service';


@Controller('dashboard')
export class DashboardController {
    // GET    /api/dashboard/summary
    constructor(private readonly dashboardSevice:DashboardService){}

    @Get('/summary')
      getSummary(): Promise<Summary>{
        return this.dashboardSevice.getSummary();
    }

}

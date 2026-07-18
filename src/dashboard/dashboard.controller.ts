import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
    // GET    /api/dashboard/summary
    constructor(private readonly dashboardSevice:DashboardService){}

    @Get('/summary')
    getSummary(){
        return {message: "getting all summaries"}
    }

}

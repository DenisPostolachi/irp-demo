import { Controller, Get, Query } from '@nestjs/common';
import { TimeLineService } from './timeline.service';
import { TimeLine } from './timeline.entity';

@Controller('graphs/timeline')
export class TimeLineController {
  constructor(private readonly timelineService: TimeLineService) {}

  @Get()
  getTimeLineGraph(
    @Query('start') start: Date,
    @Query('end') end: Date,
  ): Promise<{ data: TimeLine[] }> {
    return this.timelineService.getTimeLineGraph(start, end);
  }
}

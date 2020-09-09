import { NgModule } from '@angular/core';
import {
  GlobalStatsHistoryService,
  GlobalStatsService,
} from '@covid19-global-statistics-lib/lib/services';

@NgModule({
  declarations: [],
  imports: [],
  exports: [],
  providers: [GlobalStatsHistoryService, GlobalStatsService],
})
export class GlobalStatisticsLibModule {}

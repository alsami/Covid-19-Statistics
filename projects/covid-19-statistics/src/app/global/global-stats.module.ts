import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  fromGlobalStatistics,
  GlobalStatisticsLibModule,
  GlobalStatsEffects,
  GlobalStatsHistoryEffects,
} from '@covid19-global-statistics-lib/public-api';
import {
  GlobalStatsCardComponent,
  GlobalStatsHistoryLineChartComponent,
  GlobalStatsHistoryTableComponent,
} from '@covid19-statistics/global/components';
import { GlobalStatsOverviewComponent } from '@covid19-statistics/global/containers';
import { GlobalStatsRoutingModule } from '@covid19-statistics/global/global-stats-routing.module';
import { MaterialModule } from '@covid19-statistics/material/material.module';
import { SharedModule } from '@covid19-statistics/shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgxChartsModule } from '@swimlane/ngx-charts';

const COMPONENTS = [
  GlobalStatsOverviewComponent,
  GlobalStatsCardComponent,
  GlobalStatsHistoryTableComponent,
  GlobalStatsHistoryLineChartComponent,
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    GlobalStatsRoutingModule,
    MaterialModule,
    SharedModule,
    GlobalStatisticsLibModule,
    StoreModule.forFeature(
      fromGlobalStatistics.GLOBAL_STATISTICS_FEATURE_SELECTOR,
      fromGlobalStatistics.reducers
    ),
    EffectsModule.forFeature([GlobalStatsEffects, GlobalStatsHistoryEffects]),
    NgxChartsModule,
  ],
  exports: [...COMPONENTS],
})
export class GlobalStatsModule {}

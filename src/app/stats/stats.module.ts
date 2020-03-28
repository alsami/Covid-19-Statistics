import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@covid19/material/material.module';
import { SharedModule } from '@covid19/shared/shared.module';
import {
  GlobalStatsDayHistoryEffects,
  GlobalStatsEffects,
  GlobalStatsHistoryEffects
} from '@covid19/stats/+state/effects';
import * as fromStats from '@covid19/stats/+state/reducer';
import {
  GlobalStatsDayHistoryService,
  GlobalStatsHistoryService,
  GlobalStatsService
} from '@covid19/stats/+state/services';
import {
  GlobalStatsCardComponent,
  GlobalStatsHistoryLineChartComponent,
  GlobalStatsHistoryTableComponent
} from '@covid19/stats/components';
import {
  GlobalStatsCurrentComponent,
  GlobalStatsDayHistoryComponent,
  GlobalStatsHistoryComponent,
  GlobalStatsRoutingComponent
} from '@covid19/stats/containers';
import { StatsRoutingModule } from '@covid19/stats/stats-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgxChartsModule } from '@swimlane/ngx-charts';

const COMPONENTS = [
  GlobalStatsRoutingComponent,
  GlobalStatsCurrentComponent,
  GlobalStatsHistoryComponent,
  GlobalStatsDayHistoryComponent,
  GlobalStatsCardComponent,
  GlobalStatsHistoryTableComponent,
  GlobalStatsHistoryLineChartComponent
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    StatsRoutingModule,
    MaterialModule,
    SharedModule,
    StoreModule.forFeature('stats', fromStats.reducers),
    EffectsModule.forFeature([
      GlobalStatsEffects,
      GlobalStatsHistoryEffects,
      GlobalStatsDayHistoryEffects
    ]),
    NgxChartsModule
  ],
  exports: [...COMPONENTS],
  providers: [
    GlobalStatsService,
    GlobalStatsHistoryService,
    GlobalStatsDayHistoryService
  ]
})
export class StatsModule {}

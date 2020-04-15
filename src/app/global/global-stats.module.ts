import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  GlobalStatsEffects,
  GlobalStatsHistoryEffects,
} from '@covid19/global/+state/effects';
import * as fromStats from '@covid19/global/+state/reducer';
import {
  GlobalStatsCardComponent,
  GlobalStatsHistoryLineChartComponent,
  GlobalStatsHistoryTableComponent,
} from '@covid19/global/components';
import { GlobalStatsOverviewComponent } from '@covid19/global/containers';
import { GlobalStatsRoutingModule } from '@covid19/global/global-stats-routing.module';
import {
  GlobalStatsHistoryService,
  GlobalStatsService,
} from '@covid19/global/services';
import { MaterialModule } from '@covid19/material/material.module';
import { SharedModule } from '@covid19/shared/shared.module';
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
    StoreModule.forFeature('stats', fromStats.reducers),
    EffectsModule.forFeature([GlobalStatsEffects, GlobalStatsHistoryEffects]),
    NgxChartsModule,
  ],
  exports: [...COMPONENTS],
  providers: [GlobalStatsService, GlobalStatsHistoryService],
})
export class GlobalStatsModule {}

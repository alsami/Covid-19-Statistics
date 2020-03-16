import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@covid19/material/material.module';
import { SharedModule } from '@covid19/shared/shared.module';
import {
  GlobalStatsEffects,
  GlobalStatsHistoryEffects
} from '@covid19/stats/+state/effects';
import * as fromStats from '@covid19/stats/+state/reducer';
import {
  GlobalStatsHistoryService,
  GlobalStatsService
} from '@covid19/stats/+state/services';
import {
  GlobalStatsCardComponent,
  GlobalStatsHistoryTableComponent
} from '@covid19/stats/components';
import { GlobalStatsOverviewComponent } from '@covid19/stats/containers';
import { StatsRoutingModule } from '@covid19/stats/stats-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

const COMPONENTS = [
  GlobalStatsOverviewComponent,
  GlobalStatsCardComponent,
  GlobalStatsHistoryTableComponent
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    StatsRoutingModule,
    MaterialModule,
    SharedModule,
    StoreModule.forFeature('stats', fromStats.reducers),
    EffectsModule.forFeature([GlobalStatsEffects, GlobalStatsHistoryEffects])
  ],
  exports: [...COMPONENTS],
  providers: [GlobalStatsService, GlobalStatsHistoryService]
})
export class LatestStatsModule {}

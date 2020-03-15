import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LatestStatsService } from '@covid19/stats/+state/services';
import { StatsRoutingModule } from '@covid19/stats/stats-routing.module';
import * as fromStats from '@covid19/stats/+state/reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { LatestStatsEffects } from '@covid19/stats/+state/effects';
import { LatestStatsOverviewComponent } from '@covid19/stats/containers';
import { LatestStatsCardComponent } from '@covid19/stats/components';
import { MaterialModule } from '@covid19/material/material.module';
import { SharedModule } from '@covid19/shared/shared.module';

const COMPONENTS = [LatestStatsOverviewComponent, LatestStatsCardComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    StatsRoutingModule,
    MaterialModule,
    SharedModule,
    StoreModule.forFeature('stats', fromStats.reducers),
    EffectsModule.forFeature([LatestStatsEffects])
  ],
  exports: [...COMPONENTS],
  providers: [LatestStatsService]
})
export class LatestStatsModule {}

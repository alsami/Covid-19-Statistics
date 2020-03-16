import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalStatsService } from '@covid19/stats/+state/services';
import { StatsRoutingModule } from '@covid19/stats/stats-routing.module';
import * as fromStats from '@covid19/stats/+state/reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { GlobalStatsEffects } from '@covid19/stats/+state/effects';
import { LatestStatsOverviewComponent } from '@covid19/stats/containers';
import { GlobalStatsCardComponent } from '@covid19/stats/components';
import { MaterialModule } from '@covid19/material/material.module';
import { SharedModule } from '@covid19/shared/shared.module';

const COMPONENTS = [LatestStatsOverviewComponent, GlobalStatsCardComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    StatsRoutingModule,
    MaterialModule,
    SharedModule,
    StoreModule.forFeature('stats', fromStats.reducers),
    EffectsModule.forFeature([GlobalStatsEffects])
  ],
  exports: [...COMPONENTS],
  providers: [GlobalStatsService]
})
export class LatestStatsModule {}

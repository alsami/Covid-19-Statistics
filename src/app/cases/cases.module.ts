import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  ActiveCasesStatsDayHistoryEffects,
  ActiveCasesStatsEffects,
  ActiveCasesStatsHistoryEffects,
  ClosedCasesStatsDayHistoryEffects,
  ClosedCasesStatsEffects,
  ClosedCasesStatsHistoryEffects
} from '@covid19/cases/+state/effects';
import * as fromCases from '@covid19/cases/+state/reducer';
import { CasesRoutingModule } from '@covid19/cases/cases-routing.module';
import {
  ActiveCasesStatsCardComponent,
  ActiveCasesStatsHistoryLineChartComponent,
  ActiveCasesStatsHistoryTable,
  ClosedCasesStatsCardComponent,
  ClosedCasesStatsHistoryLineChartComponent,
  ClosedCasesStatsHistoryTable
} from '@covid19/cases/components';
import {
  ActiveCasesOverviewComponent,
  ClosedCasesOverviewComponent
} from '@covid19/cases/containers';
import {
  ActiveCasesStatsDayHistoryService,
  ActiveCasesStatsHistoryService,
  ActiveCasesStatsService,
  ClosedCasesStatsDayHistoryService,
  ClosedCasesStatsHistoryService,
  ClosedCasesStatsService
} from '@covid19/cases/services';
import { MaterialModule } from '@covid19/material/material.module';
import { SharedModule } from '@covid19/shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgxChartsModule } from '@swimlane/ngx-charts';

const COMPONENTS = [
  ActiveCasesOverviewComponent,
  ActiveCasesStatsCardComponent,
  ActiveCasesStatsHistoryTable,
  ActiveCasesStatsHistoryLineChartComponent,
  ClosedCasesOverviewComponent,
  ClosedCasesStatsCardComponent,
  ClosedCasesStatsHistoryTable,
  ClosedCasesStatsHistoryLineChartComponent
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    CasesRoutingModule,
    MaterialModule,
    SharedModule,
    StoreModule.forFeature('cases', fromCases.reducers),
    EffectsModule.forFeature([
      ActiveCasesStatsEffects,
      ActiveCasesStatsHistoryEffects,
      ActiveCasesStatsDayHistoryEffects,
      ClosedCasesStatsEffects,
      ClosedCasesStatsHistoryEffects,
      ClosedCasesStatsDayHistoryEffects
    ]),
    NgxChartsModule
  ],
  exports: [...COMPONENTS],
  providers: [
    ActiveCasesStatsService,
    ActiveCasesStatsHistoryService,
    ActiveCasesStatsDayHistoryService,
    ClosedCasesStatsService,
    ClosedCasesStatsHistoryService,
    ClosedCasesStatsDayHistoryService
  ]
})
export class CasesModule {}

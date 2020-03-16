import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  ActiveCasesStatsEffects,
  ActiveCasesStatsHistoryEffects,
  ClosedCasesStatsEffects,
  ClosedCasesStatsHistoryEffects
} from '@covid19/cases/+state/effects';
import * as fromCases from '@covid19/cases/+state/reducer';
import {
  ActiveCasesStatsHistoryService,
  ActiveCasesStatsService,
  ClosedCasesStatsHistoryService,
  ClosedCasesStatsService
} from '@covid19/cases/+state/services';
import { CasesRoutingModule } from '@covid19/cases/cases-routing.module';
import {
  ActiveCasesStatsCardComponent,
  ActiveCasesStatsHistoryTable,
  ClosedCasesStatsCardComponent,
  ClosedCasesStatsHistoryTable
} from '@covid19/cases/components';
import {
  ActiveCasesOverviewComponent,
  ClosedCasesOverviewComponent
} from '@covid19/cases/containers';
import { MaterialModule } from '@covid19/material/material.module';
import { SharedModule } from '@covid19/shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

const COMPONENTS = [
  ActiveCasesOverviewComponent,
  ActiveCasesStatsCardComponent,
  ActiveCasesStatsHistoryTable,
  ClosedCasesOverviewComponent,
  ClosedCasesStatsCardComponent,
  ClosedCasesStatsHistoryTable
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
      ClosedCasesStatsEffects,
      ClosedCasesStatsHistoryEffects
    ])
  ],
  exports: [...COMPONENTS],
  providers: [
    ActiveCasesStatsService,
    ActiveCasesStatsHistoryService,
    ClosedCasesStatsService,
    ClosedCasesStatsHistoryService
  ]
})
export class CasesModule {}

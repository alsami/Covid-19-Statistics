import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  GlobalStatsCurrentComponent,
  GlobalStatsDayHistoryComponent,
  GlobalStatsHistoryComponent,
  GlobalStatsRoutingComponent
} from '@covid19/stats/containers';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        redirectTo: 'global/current',
        pathMatch: 'full'
      },
      {
        path: 'global',
        component: GlobalStatsRoutingComponent,
        children: [
          {
            path: 'current',
            component: GlobalStatsCurrentComponent
          },
          {
            path: 'history',
            component: GlobalStatsHistoryComponent
          },
          {
            path: 'graph',
            component: GlobalStatsDayHistoryComponent
          }
        ]
      }
    ])
  ],
  exports: [RouterModule]
})
export class StatsRoutingModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LatestStatsOverviewComponent } from '@covid19/stats/containers';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: LatestStatsOverviewComponent
      }
    ])
  ]
})
export class StatsRoutingModule {}

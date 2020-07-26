import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GlobalStatsOverviewComponent } from '@covid19/global/containers';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: GlobalStatsOverviewComponent,
      },
    ]),
  ],
})
export class GlobalStatsRoutingModule {}

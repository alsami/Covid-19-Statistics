import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: 'latest-stats',
        pathMatch: 'full'
      },
      {
        path: 'latest-stats',
        loadChildren: async () =>
          (await import('./stats/stats.module')).LatestStatsModule
      }
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

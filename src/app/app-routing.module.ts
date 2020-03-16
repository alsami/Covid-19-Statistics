import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(
      [
        {
          path: '',
          redirectTo: 'stats',
          pathMatch: 'full'
        },
        {
          path: 'stats',
          loadChildren: async () =>
            (await import('./stats/stats.module')).LatestStatsModule
        }
      ],
      {
        useHash: true
      }
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

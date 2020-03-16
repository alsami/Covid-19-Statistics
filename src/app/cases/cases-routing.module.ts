import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ActiveCasesOverviewComponent } from '@covid19/cases/containers';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        redirectTo: 'active',
        pathMatch: 'full'
      },
      {
        path: 'active',
        component: ActiveCasesOverviewComponent
      }
    ])
  ]
})
export class CasesRoutingModule {}

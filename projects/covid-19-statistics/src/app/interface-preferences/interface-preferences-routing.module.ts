import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InterfacePreferencesOverviewComponent } from '@covid19-statistics/interface-preferences/containers';

const routes: Routes = [
  {
    path: '',
    component: InterfacePreferencesOverviewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InterfacePreferencesRoutingModule {}

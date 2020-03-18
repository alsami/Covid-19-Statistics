import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  CountryStatsHistoryOverviewComponent,
  CountryStatsOverviewComponent
} from '@covid19/countries/containers';

const routes: Routes = [
  {
    path: '',
    component: CountryStatsOverviewComponent
  },
  {
    path: ':country',
    component: CountryStatsHistoryOverviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CountriesRoutingModule {}

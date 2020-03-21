import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  CountriesStatsOverviewComponent,
  CountryStatsOverviewComponent
} from '@covid19/countries/containers';

const routes: Routes = [
  {
    path: '',
    component: CountriesStatsOverviewComponent
  },
  {
    path: ':country',
    component: CountryStatsOverviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CountriesRoutingModule {}

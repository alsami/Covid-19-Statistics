import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  CountriesStatsOverviewComponent,
  CountriesWorldMapComponent,
  CountryStatsOverviewComponent,
} from '@covid19/countries/containers';

const routes: Routes = [
  {
    path: '',
    component: CountriesStatsOverviewComponent,
  },
  {
    path: 'world-map',
    component: CountriesWorldMapComponent,
  },
  {
    path: ':country',
    component: CountryStatsOverviewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CountriesRoutingModule {}

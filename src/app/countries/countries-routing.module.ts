import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryStatsOverviewComponent } from '@covid19/countries/containers';

const routes: Routes = [
  {
    path: '',
    component: CountryStatsOverviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CountriesRoutingModule {}

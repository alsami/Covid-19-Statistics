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
          redirectTo: 'global',
          pathMatch: 'full',
        },
        {
          path: 'global',
          loadChildren: async () =>
            (await import('./global/global-stats.module')).GlobalStatsModule,
        },
        {
          path: 'countries',
          loadChildren: async () =>
            (await import('./countries/countries.module')).CountriesModule,
        },
        {
          path: 'interface-preferences',
          loadChildren: async () =>
            (
              await import(
                './interface-preferences/interface-preferences.module'
              )
            ).InterfacePreferencesModule,
        },
      ],
      {
    useHash: false
}
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

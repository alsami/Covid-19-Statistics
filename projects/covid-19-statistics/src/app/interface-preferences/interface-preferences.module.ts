import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  LoaderPreferencesComponent,
  ThemePreferencesComponent,
} from '@covid19-statistics/interface-preferences/components';
import { InterfacePreferencesOverviewComponent } from '@covid19-statistics/interface-preferences/containers';
import { InterfacePreferencesRoutingModule } from '@covid19-statistics/interface-preferences/interface-preferences-routing.module';
import { LoadersModule } from '@covid19-statistics/loaders/loaders.module';
import { MaterialModule } from '@covid19-statistics/material/material.module';

const COMPONENTS = [
  InterfacePreferencesOverviewComponent,
  LoaderPreferencesComponent,
  ThemePreferencesComponent,
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    MaterialModule,
    LoadersModule,
    InterfacePreferencesRoutingModule,
  ],
})
export class InterfacePreferencesModule {}

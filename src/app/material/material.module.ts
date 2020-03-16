import { LayoutModule } from '@angular/cdk/layout';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

const modules = [
  MatSidenavModule,
  MatToolbarModule,
  MatButtonModule,
  MatInputModule,
  MatIconModule,
  MatListModule,
  MatTabsModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCardModule,
  MatDialogModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatExpansionModule,
  MatSnackBarModule,
  MatTooltipModule,
  MatMenuModule,
  MatSlideToggleModule,
  MatStepperModule,
  OverlayModule,
  PortalModule,
  LayoutModule,
  MatTableModule,
  MatChipsModule,
  MatGridListModule,
  MatBadgeModule,
  MatButtonToggleModule,
  MatAutocompleteModule
];

@NgModule({
  imports: modules,
  exports: modules
})
export class MaterialModule {}

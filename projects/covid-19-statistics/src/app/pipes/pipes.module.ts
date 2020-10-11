import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CountryFlagPipe } from '@covid19-statistics/pipes/country-flag.pipe';

@NgModule({
  declarations: [CountryFlagPipe],
  imports: [CommonModule],
  exports: [CountryFlagPipe],
  providers: [CountryFlagPipe],
})
export class PipesModule {}

import { Pipe, PipeTransform } from '@angular/core';
import { COUNTRY_CODE_UNAVAILABLE } from '@covid19-country-statistics-lib/lib/models';
import { CountryOfInterest } from '@covid19-statistics/countries/models';

@Pipe({
  name: 'countryFlag',
  pure: true,
})
export class CountryFlagPipe implements PipeTransform {
  public transform(countryOfInterest: CountryOfInterest): string {
    if (
      !countryOfInterest?.countryCode ||
      countryOfInterest.countryCode === COUNTRY_CODE_UNAVAILABLE
    ) {
      return '';
    }
    return `assets/country-svgs/${countryOfInterest.countryCode.toLowerCase()}.svg`;
  }
}

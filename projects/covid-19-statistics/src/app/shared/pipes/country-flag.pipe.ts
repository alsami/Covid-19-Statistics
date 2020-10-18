import { Pipe, PipeTransform } from '@angular/core';
import { COUNTRY_CODE_UNAVAILABLE } from '@covid19-country-statistics-lib/lib/models';
import { CountryOfInterest } from '@covid19-statistics/countries/models';

@Pipe({
  name: 'countryFlag',
  pure: true,
})
export class CountryFlagPipe implements PipeTransform {
  public transform(
    countryOfInterest: CountryOfInterest,
    size: '16' | '32' | '64' = '32'
  ): string {
    if (
      !countryOfInterest?.countryCode ||
      countryOfInterest.countryCode === COUNTRY_CODE_UNAVAILABLE
    ) {
      return '';
    }

    return `https://www.countryflags.io/${countryOfInterest.countryCode}/flat/${size}.png`;
  }
}

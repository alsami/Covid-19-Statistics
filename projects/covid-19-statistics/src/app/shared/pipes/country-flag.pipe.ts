import { Pipe, PipeTransform } from '@angular/core';
import { COUNTRY_CODE_UNAVAILABLE } from '@covid19-country-statistics-lib/lib/models';
import { environment } from '@covid19-statistics-environment/environment';
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
    return `${
      environment.apiUrl
    }countries/${countryOfInterest.countryCode.toLowerCase()}/flag`;
  }
}

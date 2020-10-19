import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CountryStats } from '@covid19-country-statistics-lib/public-api';
import {
  PROPER_BLUE,
  PROPER_GREEN,
  PROPER_GREY,
  PROPER_RED,
  PROPER_YELLOW,
  SEMI_PROPER_RED,
} from '@covid19-statistics/core/core.constants';
import { CountryOfInterest } from '@covid19-statistics/countries/models';

@Component({
  selector: 'covid19-country-stats-card',
  templateUrl: './country-stats-card.component.html',
  styleUrls: ['./country-stats-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryStatsCardComponent {
  @Input() countryStats: CountryStats;
  @Input() countriesOfInterest: CountryOfInterest[];

  @Output() addCountryOfInterest = new EventEmitter();
  @Output() removeCountryOfInterest = new EventEmitter();

  /*
  cases,
  active cases,
  new cases,
  deaths,
  new deaths,
  recovered,
  */
  public colorScheme = [
    PROPER_GREY,
    PROPER_BLUE,
    PROPER_YELLOW,
    PROPER_RED,
    SEMI_PROPER_RED,
    PROPER_GREEN,
  ];

  public containsCountry(value: string) {
    return (
      this.countriesOfInterest?.findIndex(
        (existingCountryOfInterest) =>
          existingCountryOfInterest.country === value
      ) > -1
    );
  }
}

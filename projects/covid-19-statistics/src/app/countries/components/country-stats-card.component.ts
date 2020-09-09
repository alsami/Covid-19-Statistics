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
  PROPER_RED,
} from '@covid19-statistics/core/core.constants';

@Component({
  selector: 'covid19-country-stats-card',
  templateUrl: './country-stats-card.component.html',
  styleUrls: ['./country-stats-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryStatsCardComponent {
  @Input() countryStats: CountryStats;
  @Input() countriesOfInterest: string[];

  @Output() addCountryOfInterest = new EventEmitter();
  @Output() removeCountryOfInterest = new EventEmitter();

  /* 
  cases, 
  active cases, 
  deaths, 
  recovered, 
  */
  public colorScheme = ['#AAAAAA', PROPER_BLUE, PROPER_RED, PROPER_GREEN];

  public containsCountry(value: string) {
    return (
      this.countriesOfInterest && this.countriesOfInterest.indexOf(value) > -1
    );
  }
}

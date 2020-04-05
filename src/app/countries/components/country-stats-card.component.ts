import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { PROPER_GREEN, PROPER_RED } from '@covid19/core/core.constants';
import { CountryStats } from '@covid19/countries/models';

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
  public colorScheme = ['#AAAAAA', '#0000ff', PROPER_RED, PROPER_GREEN];

  public containsCountry(value: string) {
    return (
      this.countriesOfInterest && this.countriesOfInterest.indexOf(value) > -1
    );
  }
}

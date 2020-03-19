import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { CountryStats } from '@covid19/countries/models';

@Component({
  selector: 'covid19-country-card',
  templateUrl: './country-card.component.html',
  styleUrls: ['./country-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountryCardComponent {
  @Input() countryStats: CountryStats;
  @Input() countriesOfInterest: string[];

  @Output() addCountryOfInterest = new EventEmitter();
  @Output() removeCountryOfInterest = new EventEmitter();

  public containsCountry(value: string) {
    return (
      this.countriesOfInterest && this.countriesOfInterest.indexOf(value) > -1
    );
  }
}

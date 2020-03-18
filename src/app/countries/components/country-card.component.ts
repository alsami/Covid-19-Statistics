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
  @Output() addCountryOfInterest = new EventEmitter();
}

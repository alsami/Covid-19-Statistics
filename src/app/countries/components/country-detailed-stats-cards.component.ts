import { Component, Input } from '@angular/core';
import { CountryStats } from '@covid19/countries/models';

@Component({
  selector: 'covid19-country-detailed-stats-cards',
  templateUrl: './country-detailed-stats-cards.component.html',
  styleUrls: ['./country-detailed-stats-cards.component.scss']
})
export class CountryDetailedStatsCardsComponent {
  @Input() countryStats: CountryStats;
}

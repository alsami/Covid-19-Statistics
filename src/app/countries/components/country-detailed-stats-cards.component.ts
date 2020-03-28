import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges
} from '@angular/core';
import { CountryStats } from '@covid19/countries/models';

@Component({
  selector: 'covid19-country-detailed-stats-cards',
  templateUrl: './country-detailed-stats-cards.component.html',
  styleUrls: ['./country-detailed-stats-cards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountryDetailedStatsCardsComponent implements OnChanges {
  @Input() countryStats: CountryStats;

  public constructor(private cdr: ChangeDetectorRef) {
    this.cdr.detach();
  }

  public ngOnChanges(): void {
    this.cdr.detectChanges();
  }
}

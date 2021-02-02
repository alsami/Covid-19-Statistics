import { DecimalPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  Input,
} from '@angular/core';
import {
  CountryStatisticsVary,
  CountryStatisticsVaryContainer,
  VaryType,
} from '@covid19-country-statistics-lib/public-api';

type Accumulated = {
  active: number;
  deaths: number;
  recovered: number;
  fetchedAt: string;
};

@Component({
  selector: 'covid19-country-stats-day-to-day-cards',
  templateUrl: './country-stats-day-to-day-cards.component.html',
  styleUrls: ['./country-stats-day-to-day-cards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryStatsDayToDayCardsComponent {
  @Input()
  countryStatisticsVaryContainers: CountryStatisticsVaryContainer[] = [];

  public varyType = VaryType;

  public constructor(private injector: Injector) {}

  public relevantVary(
    countryStatisticVaryContainer: CountryStatisticsVaryContainer
  ): CountryStatisticsVary[] {
    var relevant = countryStatisticVaryContainer.vary.filter(
      (vary) =>
        vary.varyType === this.varyType.Active ||
        vary.varyType === this.varyType.Deaths ||
        vary.varyType === this.varyType.Recovered
    );

    console.log('ALL', countryStatisticVaryContainer.vary);
    console.log('RELEVANT', relevant);
    return relevant;
  }

  public varyText(vary: CountryStatisticsVary): string {
    return `Today: ${vary.valueToday}, Yesterday: ${vary.valueYesterday}`;
  }

  private transform(value: number): string {
    return this.injector.get(DecimalPipe).transform(value);
  }
}

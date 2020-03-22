import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { CountryStats } from '@covid19/countries/models';
import { IncreasedStats, IncreaseType } from '@covid19/stats/models';

@Component({
  selector: 'covid19-country-stats-increase',
  templateUrl: './country-stats-increase.component.html',
  styleUrls: ['./country-stats-increase.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountryStatsIncreaseComponent implements OnChanges {
  @Input() countryStats: CountryStats[];

  public increases: IncreasedStats[] = [];

  public increaseType = IncreaseType;

  public ngOnChanges(changes: SimpleChanges): void {
    if (!this.countryStats || !this.countryStats.length) {
      return;
    }

    if (
      changes.countryStats.previousValue &&
      changes.countryStats.previousValue === changes.countryStats.currentValue
    ) {
      return;
    }

    const orderedStats = this.countryStats
      .slice()
      .sort((left, right) => right.fetchedAt.localeCompare(left.fetchedAt));

    this.increases = [];

    console.log(orderedStats);

    orderedStats.forEach((stats, index) => {
      if (index !== orderedStats.length - 1) {
        const current = stats;
        const previous = orderedStats[index + 1];

        this.increases.push({
          type: IncreaseType.Active,
          increase: this.calculateIncrease(
            current.activeCases,
            previous.activeCases
          ),
          time: current.fetchedAt
        });

        this.increases.push({
          type: IncreaseType.Deaths,
          increase: this.calculateIncrease(
            current.totalDeaths,
            previous.totalDeaths
          ),
          time: current.fetchedAt
        });

        this.increases.push({
          type: IncreaseType.Recovered,
          increase: this.calculateIncrease(
            current.recoveredCases,
            previous.recoveredCases
          ),
          time: current.fetchedAt
        });
      }
    });

    console.log(this.increases);
  }

  private calculateIncrease(current: number, previous: number): number {
    const diff = current - previous;
    const increase = (diff / current) * 100;

    return increase;
  }
}

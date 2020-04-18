import { DecimalPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CountryStats } from '@covid19/countries/models';
import { IncreasedStats, IncreaseType } from '@covid19/global/models';

type Accumulated = {
  total: number;
  active: number;
  deaths: number;
  fetchedAt: string;
};

@Component({
  selector: 'covid19-country-stats-day-to-day-cards',
  templateUrl: './country-stats-day-to-day-cards.component.html',
  styleUrls: ['./country-stats-day-to-day-cards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryStatsDayToDayCardsComponent implements OnChanges {
  @Input() countryStats: CountryStats[];

  public increases: IncreasedStats[] = [];

  public increaseType = IncreaseType;

  public constructor(private injector: Injector) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (!this.countryStats) {
      return;
    }

    if (
      changes.countryStats.previousValue &&
      changes.countryStats.previousValue === changes.countryStats.currentValue
    ) {
      return;
    }

    this.increases = [];

    const sortedCountryStats = this.countryStats
      .slice()
      .sort((left, right) => right.fetchedAt.localeCompare(left.fetchedAt));

    const dates = sortedCountryStats
      .slice()
      .map((stats) => stats.fetchedAt.slice(0, stats.fetchedAt.indexOf('T')));

    const distinctDates = [...new Set(dates)];

    const accumulated = this.calculateAccumulated(
      distinctDates,
      sortedCountryStats
    );

    this.calculatedIncreases(accumulated);
  }

  private calculateAccumulated(
    distinctDates: string[],
    sortedCountryStats: CountryStats[]
  ): Accumulated[] {
    const accumlatedValues: Accumulated[] = [];

    distinctDates.forEach((utcDate) => {
      const accumulated: Accumulated = {
        total: 0,
        active: 0,
        deaths: 0,
        fetchedAt: null,
      };
      sortedCountryStats.forEach((stats) => {
        const currentUtcDate = stats.fetchedAt.slice(
          0,
          stats.fetchedAt.indexOf('T')
        );
        if (currentUtcDate === utcDate) {
          accumulated.total += stats.totalCases;
          accumulated.active += stats.activeCases;
          accumulated.deaths += stats.totalDeaths;
          accumulated.fetchedAt = stats.fetchedAt;
        }
      });
      accumlatedValues.push(accumulated);
    });

    return accumlatedValues;
  }

  private calculatedIncreases(accumulated: Accumulated[]): void {
    accumulated.forEach((value, index) => {
      if (index < accumulated.length - 1) {
        const previous = accumulated[index + 1];
        this.increases.push({
          type: IncreaseType.Total,
          text: `Today: ${this.transform(
            value.total
          )} - Yesterday: ${this.transform(previous.total)}`,
          increase: this.calculate(value.total, previous.total),
          time: value.fetchedAt,
        });

        this.increases.push({
          type: IncreaseType.Active,
          text: `Today: ${this.transform(
            value.active
          )} - Yesterday: ${this.transform(previous.active)}`,
          increase: this.calculate(value.active, previous.active),
          time: value.fetchedAt,
        });

        this.increases.push({
          type: IncreaseType.Deaths,
          text: `Today: ${this.transform(
            value.deaths
          )} - Yesterday: ${this.transform(previous.deaths)}`,
          increase: this.calculate(value.deaths, previous.deaths),
          time: value.fetchedAt,
        });

        this.increases = this.increases.sort((left, right) =>
          right.time.localeCompare(left.time)
        );
      }
    });
  }

  private calculate(current: number, previous: number): number {
    if (current === 0) {
      return 0;
    }

    if (current === previous) {
      return 0;
    }

    console.log(current > previous);

    if (current > previous) {
      return this.calculateIncrease(current, previous);
    }

    return this.calculateDecrease(current, previous);
  }

  private calculateIncrease(current: number, previous: number): number {
    const diff = current - previous;
    const increase = (diff / current) * 100;

    return increase;
  }

  private calculateDecrease(current: number, previous: number): number {
    const diff = previous - current;
    const decrease = (diff / previous) * 100;
    console.log(decrease, diff, previous, current);

    return decrease * -1;
  }

  private transform(value: number): string {
    return this.injector.get(DecimalPipe).transform(value);
  }
}

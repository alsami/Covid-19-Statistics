import { DecimalPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Injector,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { CountryStats } from '@covid19/countries/models';
import { IncreasedStats, IncreaseType } from '@covid19/stats/models';

@Component({
  selector: 'covid19-country-stats-day-to-day',
  templateUrl: './country-stats-day-to-day.component.html',
  styleUrls: ['./country-stats-day-to-day.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountryStatsDayToDayComponent implements OnChanges {
  @Input() countryStats: CountryStats[];

  public increases: IncreasedStats[] = [];

  public increaseType = IncreaseType;

  public constructor(
    private injector: Injector,
    private cdr: ChangeDetectorRef
  ) {
    this.cdr.detach();
  }

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

    const orderedCountryStats = this.countryStats
      .slice()
      .sort((left, right) => right.fetchedAt.localeCompare(left.fetchedAt));

    orderedCountryStats.forEach((stats, index) => {
      if (index < this.countryStats.length - 1) {
        const current = stats;

        const previous = orderedCountryStats[index + 1];

        this.increases.push({
          type: IncreaseType.Total,
          text: `Today: ${this.transform(
            current.totalCases
          )} - Yesterday: ${this.transform(previous.totalCases)}`,
          increase: this.calculate(current.totalCases, previous.totalCases),
          time: current.fetchedAt
        });

        this.increases.push({
          type: IncreaseType.Active,
          text: `Today: ${this.transform(
            current.activeCases
          )} - Yesterday: ${this.transform(previous.activeCases)}`,
          increase: this.calculate(current.activeCases, previous.activeCases),
          time: current.fetchedAt
        });

        this.increases.push({
          type: IncreaseType.Deaths,
          text: `Today: ${this.transform(
            current.totalDeaths
          )} - Yesterday: ${this.transform(previous.totalDeaths)}`,
          increase: this.calculate(current.totalDeaths, previous.totalDeaths),
          time: current.fetchedAt
        });
      }
    });

    this.increases = this.increases.sort((left, right) =>
      right.time.localeCompare(left.time)
    );

    this.cdr.detectChanges();
  }

  private calculate(current: number, previous: number): number {
    if (current === 0) {
      return 0;
    }

    if (current === previous) {
      return 0;
    }

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

    return decrease;
  }

  private transform(value: number): string {
    return this.injector.get(DecimalPipe).transform(value);
  }
}

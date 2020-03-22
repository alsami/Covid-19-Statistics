import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { CountryStats } from '@covid19/countries/models';
import { LineChartData } from '@covid19/shared/models/linechart-data.model';

@Component({
  selector: 'covid19-country-stats-line-chart',
  templateUrl: './country-stats-history-line-chart.component.html',
  styleUrls: ['./country-stats-history-line-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountryStatsHistoryLineChartComponent implements OnChanges {
  @Input() countryStats: CountryStats[];

  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'UTC Days';
  yAxisLabel: string = 'Amount';
  timeline: boolean = true;

  // cases, new cases, deaths, new deats, recovered, serious
  public colorScheme = {
    domain: ['#AAAAAA', '#ffff00', '#ff0000', '#ff5800', '#5AA454', '#7b1fa2']
  };

  public data: LineChartData[] = [];

  public ngOnChanges(change: SimpleChanges): void {
    if (!this.countryStats || !this.countryStats.length) {
      return;
    }

    if (
      change.countryStats.previousValue &&
      change.countryStats.previousValue === change.countryStats.currentValue
    ) {
      return;
    }

    this.data = [];

    const totalCasesLineChartData: LineChartData = {
      name: 'Total cases',
      series: []
    };

    const newCasesLineChartData: LineChartData = {
      name: 'New cases',
      series: []
    };

    const deathLineChartData: LineChartData = {
      name: 'Deaths',
      series: []
    };

    const newDeathsLineChartData: LineChartData = {
      name: 'New Deaths',
      series: []
    };

    const recoveredLineChartData: LineChartData = {
      name: 'Recovered',
      series: []
    };

    const seriousLineChartData: LineChartData = {
      name: 'Serious condition',
      series: []
    };

    this.countryStats.forEach(countryStats => {
      const isoString = countryStats.fetchedAt.slice(
        0,
        countryStats.fetchedAt.indexOf('T')
      );

      totalCasesLineChartData.series.push({
        name: isoString,
        value: countryStats.totalCases
      });

      newCasesLineChartData.series.push({
        name: isoString,
        value: countryStats.newCases
      });

      deathLineChartData.series.push({
        name: isoString,
        value: countryStats.totalDeaths
      });

      newDeathsLineChartData.series.push({
        name: isoString,
        value: countryStats.newDeaths
      });

      recoveredLineChartData.series.push({
        name: isoString,
        value: countryStats.recoveredCases
      });

      seriousLineChartData.series.push({
        name: isoString,
        value: countryStats.seriousCases
      });
    });

    this.data.push(
      totalCasesLineChartData,
      newCasesLineChartData,
      deathLineChartData,
      newDeathsLineChartData,
      recoveredLineChartData,
      seriousLineChartData
    );
  }
}

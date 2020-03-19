import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges
} from '@angular/core';
import { ClosedCaseStats } from '@covid19/cases/models';
import { LineChartData } from '@covid19/shared/models/linechart-data.model';

@Component({
  selector: 'covid19-closed-cases-stats-history-line-chart',
  templateUrl: './closed-cases-stats-history-line-chart.component.html',
  styleUrls: ['./closed-cases-stats-history-line-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClosedCasesStatsHistoryLineChartComponent implements OnChanges {
  @Input() closedCasesStats: ClosedCaseStats[] = [];

  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Time';
  yAxisLabel: string = 'Amount';
  timeline: boolean = true;

  // cases, deaths, recovered
  public colorScheme = {
    domain: ['#AAAAAA', '#ff0000', '#5AA454']
  };

  public data: LineChartData[] = [];

  ngOnChanges(): void {
    if (!this.closedCasesStats || !this.closedCasesStats.length) {
      return;
    }

    this.data = [];

    const casesLineChartData: LineChartData = {
      name: 'Cases',
      series: []
    };

    const deathsLineChartData: LineChartData = {
      name: 'Deaths',
      series: []
    };

    const recoveredConditionLineChartData: LineChartData = {
      name: 'Recovered',
      series: []
    };

    this.closedCasesStats.forEach(activeCase => {
      const isoString = new Date(activeCase.fetchedAt).toLocaleDateString();

      casesLineChartData.series.push({
        name: isoString,
        value: activeCase.total
      });

      deathsLineChartData.series.push({
        name: isoString,
        value: activeCase.deaths
      });

      recoveredConditionLineChartData.series.push({
        name: isoString,
        value: activeCase.recovered
      });
    });

    this.data.push(
      casesLineChartData,
      deathsLineChartData,
      recoveredConditionLineChartData
    );
    console.log(this.data);
  }
}

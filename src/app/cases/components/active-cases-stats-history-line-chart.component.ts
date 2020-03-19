import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges
} from '@angular/core';
import { ActiveCaseStats } from '@covid19/cases/models';
import { LineChartData } from '@covid19/shared/models/linechart-data.model';

@Component({
  selector: 'covid19-active-cases-stats-history-line-chart',
  templateUrl: './active-cases-stats-history-line-chart.component.html',
  styleUrls: ['./active-cases-stats-history-line-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActiveCasesStatsHistoryLineChartComponent implements OnChanges {
  @Input() activeCasesStats: ActiveCaseStats[] = [];

  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Time';
  yAxisLabel: string = 'Amount';
  timeline: boolean = true;

  // cases, mild,serious
  public colorScheme = {
    domain: ['#AAAAAA', '#ffff00', '#ff0000']
  };

  public data: LineChartData[] = [];

  ngOnChanges(): void {
    if (!this.activeCasesStats || !this.activeCasesStats.length) {
      return;
    }

    this.data = [];

    const casesLineChartData: LineChartData = {
      name: 'Cases',
      series: []
    };

    const mildConditionLineChartData: LineChartData = {
      name: 'Mild condition',
      series: []
    };

    const seriousConditionLineChartData: LineChartData = {
      name: 'Serious condition',
      series: []
    };

    this.activeCasesStats.forEach(activeCase => {
      const isoString = activeCase.fetchedAt.slice(
        0,
        activeCase.fetchedAt.indexOf('T')
      );

      casesLineChartData.series.push({
        name: isoString,
        value: activeCase.total
      });

      mildConditionLineChartData.series.push({
        name: isoString,
        value: activeCase.mild
      });

      seriousConditionLineChartData.series.push({
        name: isoString,
        value: activeCase.serious
      });
    });

    this.data.push(
      casesLineChartData,
      mildConditionLineChartData,
      seriousConditionLineChartData
    );
    console.log(this.data);
  }
}

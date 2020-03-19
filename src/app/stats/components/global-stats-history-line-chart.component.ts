import { Component, Input, OnChanges } from '@angular/core';
import { LineChartData } from '@covid19/shared/models/linechart-data.model';
import { GlobalStats } from '@covid19/stats/models';

@Component({
  selector: 'covid19-global-stats-history-line-chart',
  templateUrl: './global-stats-history-line-chart.component.html',
  styleUrls: ['./global-stats-history-line-chart.component.scss']
})
export class GlobalStatsHistoryLineChartComponent implements OnChanges {
  @Input() globalStats: GlobalStats[];

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
    if (!this.globalStats || !this.globalStats.length) {
      return;
    }

    this.data = [];

    const totalCasesLineChartData: LineChartData = {
      name: 'Cases',
      series: []
    };

    const deathsLineChartData: LineChartData = {
      name: 'Deaths',
      series: []
    };

    const recoveredLineChartData: LineChartData = {
      name: 'Recovered',
      series: []
    };

    this.globalStats.forEach(countryStats => {
      const isoString = new Date(countryStats.fetchedAt).toLocaleDateString();

      totalCasesLineChartData.series.push({
        name: isoString,
        value: countryStats.total
      });

      deathsLineChartData.series.push({
        name: isoString,
        value: countryStats.deaths
      });

      recoveredLineChartData.series.push({
        name: isoString,
        value: countryStats.recovered
      });
    });

    this.data.push(
      totalCasesLineChartData,
      deathsLineChartData,
      recoveredLineChartData
    );
  }
}
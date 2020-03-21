import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'covid19-country-stats-pie-chart',
  templateUrl: './country-stats-pie-chart.component.html',
  styleUrls: ['./country-stats-pie-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountryStatsPieChartComponent implements OnInit {
  single: any[] = [
    {
      name: 'Germany',
      value: 8940000
    },
    {
      name: 'USA',
      value: 5000000
    },
    {
      name: 'France',
      value: 7200000
    },
    {
      name: 'UK',
      value: 6200000
    }
  ];

  // options
  gradient: boolean = false;
  showLegend: boolean = false;
  showLabels: boolean = true;
  isDoughnut: boolean = true;
  legendPosition: string = 'below';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor() {}

  ngOnInit(): void {}
}

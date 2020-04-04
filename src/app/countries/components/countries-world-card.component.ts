import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { PROPER_GREEN, PROPER_RED } from '@covid19/core/core.constants';
import { CountryStats } from '@covid19/countries/models';
import { fromEvent, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'covid19-countries-world-card',
  templateUrl: './countries-world-card.component.html',
  styleUrls: ['./countries-world-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountriesWorldCardComponent implements OnChanges, OnDestroy {
  @Input() countryStats: CountryStats[];

  validMaps: { [key: string]: string } = {
    ['UK']: 'United Kingdom',
    ['USA']: 'United States',
    ['UAE']: 'United Arab Emirates',
  };

  resizeObservable$: Observable<Event>;
  resizeSubscription$: Subscription;

  private chart: any;
  private dataTable: any;

  private options = {
    keepAspectRatio: true,
    legend: 'none',
    datalessRegionColor: PROPER_GREEN,
    defaultColor: '#7b1fa2',
    backgroundColor: {
      fill: '#303030',
      stroke: 'yellow',
    },
    colorAxis: { colors: [PROPER_RED] },
    resolution: 'countries',
    width: '100%',
    height: '100%',
  };

  @ViewChild('card', { static: true }) element: ElementRef;

  public ngOnChanges(): void {
    if (!this.chart) {
      this.chart = new google.visualization.GeoChart(
        this.element.nativeElement
      );

      this.resizeObservable$ = fromEvent(window, 'resize');
      this.resizeSubscription$ = this.resizeObservable$.subscribe(() => {
        this.dataTable = this.createDataTable();

        this.draw(this.dataTable);
      });
    }

    if (!this.countryStats) {
      return;
    }
    this.dataTable = this.createDataTable();

    this.draw(this.dataTable);
  }

  public ngOnDestroy(): void {
    this.resizeSubscription$.unsubscribe();
  }

  private createDataTable(): any {
    const array = [];
    array.push(['Country', 'Active Cases', 'Deaths']);

    this.countryStats.forEach((stats) => {
      array.push([
        this.getGeoCountry(stats),
        stats.activeCases,
        stats.totalDeaths,
      ]);
    });

    return google.visualization.arrayToDataTable(array);
  }

  private getGeoCountry(countryStats: CountryStats): string {
    const val = this.validMaps[countryStats.country];

    return val ? val : countryStats.country;
  }

  private draw(dataTable: any): void {
    this.chart.draw(dataTable, this.options);
  }
}

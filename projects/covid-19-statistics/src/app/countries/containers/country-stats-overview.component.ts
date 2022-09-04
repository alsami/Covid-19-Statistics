import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatSelectChange } from '@angular/material/select';
import { MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import {
  countryStatisticsVaryActions,
  CountryStatisticsVaryContainer,
  CountryStats,
  countryStatsActions,
  countryStatsHistoryActions,
  fromCountryStatistics
} from '@covid19-country-statistics-lib/public-api';
import { TitleActions } from '@covid19-statistics/core/+state/actions';
import {
  BAR_CHART_COLORS,
  BAR_CHART_TYPES
} from '@covid19-statistics/countries/countries.constants';
import { BarChartType } from '@covid19-statistics/countries/models';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

type ViewOption = {
  label: string;
  value: string;
  tooltip: string;
  selected: boolean;
};

type ChartOption = {
  label: string;
  value: string;
  tooltip: string;
  selected: boolean;
};

@Component({
  selector: 'covid19-country-stats-overview',
  templateUrl: './country-stats-overview.component.html',
  styleUrls: ['./country-stats-overview.component.scss'],
})
export class CountryStatsOverviewComponent
  implements OnInit, AfterViewInit, OnDestroy {
  private paramSub: Subscription;
  private selectedCountry: string;

  public countryStats$: Observable<CountryStats>;
  public countryHistoryStats$: Observable<CountryStats[]>;
  public countryStatisticsVary$: Observable<CountryStatisticsVaryContainer[]>;
  public loading$: Observable<boolean>;
  public selectedIndex: number = 0;
  public colors = BAR_CHART_COLORS;

  @ViewChild('matTabGroup', { static: false }) matTabGroup: MatTabGroup;

  public load = (country: string) => {
    console.log('COUNTRY', country)
    this.store.dispatch(
      countryStatsActions.load({
        country: country,
      })
    );
  };

  public loadHistory = (country: string) => {
    this.store.dispatch(
      countryStatsHistoryActions.load({
        country: country,
      })
    );

    this.store.dispatch(
      countryStatisticsVaryActions.loadForCountry({
        country: country,
      })
    );
  };

  tabLabelsFunc = [
    {
      label: 'Overview',
      func: this.load,
    },
    {
      label: '10 Days',
      func: this.loadHistory,
    },
    {
      label: '10 Days Graphs',
      func: this.loadHistory,
    },
  ];

  public overviewViewOptions: ViewOption[] = [
    {
      label: 'view_agenda',
      value: 'card',
      tooltip: 'Use card view',
      selected: true,
    },
    {
      label: 'show_chart',
      value: 'chart',
      tooltip: 'Use chart view',
      selected: false,
    },
  ];

  public historyViewOptions: ViewOption[] = [
    {
      label: 'view_agenda',
      value: 'card',
      tooltip: 'Use card view',
      selected: true,
    },
    {
      label: 'table_rows',
      value: 'table',
      tooltip: 'Use table view',
      selected: false,
    },
    {
      label: 'view_module',
      value: 'module-view',
      tooltip: 'Use card and table view',
      selected: false,
    },
  ];

  public chartOptions: ChartOption[] = [
    {
      label: 'multiline_chart',
      value: 'multiline_chart',
      tooltip: 'Multi Chart',
      selected: true,
    },
    {
      label: 'bar_chart',
      value: 'bar_chart',
      tooltip: 'Bar Chart',
      selected: false,
    },
  ];

  public chartTypes: BarChartType[] = BAR_CHART_TYPES;

  public selectedBarCharType: BarChartType = this.chartTypes[0];

  public constructor(
    private store: Store<fromCountryStatistics.CountryState>,
    private route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.loading$ = combineLatest([
      this.store.pipe(select(fromCountryStatistics.getCountryStatsLoading)),
      this.store.pipe(
        select(fromCountryStatistics.getCountryStatsHistoryLoading)
      ),
      this.store.pipe(
        select(fromCountryStatistics.getCountryStatisticsVaryLoading)
      ),
    ]).pipe(
      map(
        ([
          countryStatsLoading,
          countryStatsHistoryLoading,
          countryStatisticsVaryLoading,
        ]) =>
          countryStatsLoading ||
          countryStatsHistoryLoading ||
          countryStatisticsVaryLoading
      )
    );

    this.countryStats$ = this.store.pipe(
      select(fromCountryStatistics.getCountryStats)
    );

    this.countryHistoryStats$ = this.store.pipe(
      select(fromCountryStatistics.getCountryStatsHistory)
    );

    this.countryStatisticsVary$ = this.store.pipe(
      select(fromCountryStatistics.getCountryStatisticsVaryForCountry)
    );
  }

  public ngAfterViewInit(): void {
    this.paramSub = this.route.paramMap
      .pipe(
        map((paramMap) => paramMap.get('country')),
        distinctUntilChanged()
      )
      .subscribe((country) => {
        this.store.dispatch(new TitleActions.SetTitle(`${country}`));

        if (this.selectedCountry && this.selectedCountry !== country) {
          this.tabLabelsFunc[this.matTabGroup.selectedIndex].func(country);
        }

        this.selectedCountry = country;
      });
  }

  public ngOnDestroy(): void {
    if (this.paramSub) {
      this.paramSub.unsubscribe();
    }
  }

  public viewSelectionChange(
    option: MatButtonToggleChange,
    viewOptions: ViewOption[]
  ): void {
    const index = viewOptions.findIndex(
      (viewOption) => viewOption.value === option.value
    );

    viewOptions.forEach(
      (viewOption, viewOptionIndex) =>
        (viewOption.selected = viewOptionIndex === index)
    );
  }

  public chartSelectionChanged(option: MatButtonToggleChange): void {
    const index = this.chartOptions.findIndex(
      (chartOptions) => chartOptions.value === option.value
    );

    this.chartOptions.forEach(
      (chartOptions, chartOptionIndex) =>
        (chartOptions.selected = chartOptionIndex === index)
    );
  }

  public chartTypeSelectionChanged(option: MatSelectChange): void {
    this.selectedBarCharType = this.chartTypes.find(
      (type) => type.value === option.value
    );
  }

  public animationDone(index: number): void {
    console.log(this.selectedCountry);
    this.tabLabelsFunc[index].func(this.selectedCountry);

    this.selectedIndex = index;
  }
}

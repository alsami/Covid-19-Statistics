import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatSelectChange } from '@angular/material/select';
import { MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { TitleActions } from '@covid19/core/+state/actions';
import {
  PROPER_BLUE,
  PROPER_GREEN,
  PROPER_RED,
} from '@covid19/core/core.constants';
import {
  countryStatsActions,
  countryStatsDayHistoryActions,
  countryStatsHistoryActions,
} from '@covid19/countries/+state/actions';
import * as fromCountries from '@covid19/countries/+state/reducer';
import { CountryStats } from '@covid19/countries/models';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { delay, distinctUntilChanged, map } from 'rxjs/operators';

type BarChartType = {
  label: string;
  value: string;
  color: string;
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
  public countryStatsDayHistory$: Observable<CountryStats[]>;
  public loading$: Observable<boolean>;
  public selectedIndex: number = 0;
  public colors = [PROPER_BLUE, PROPER_RED, PROPER_GREEN];

  public viewOptions: {
    label: string;
    value: string;
    tooltip: string;
    selected: boolean;
  }[] = [
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

  public chartOptions: {
    label: string;
    value: string;
    tooltip: string;
    selected: boolean;
  }[] = [
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

  public chartTypes: BarChartType[] = [
    {
      label: 'Active Cases',
      value: 'activeCases',
      color: this.colors[0],
    },
    {
      label: 'Deaths',
      value: 'totalDeaths',
      color: this.colors[1],
    },
    {
      label: 'Recovered Cases',
      value: 'recoveredCases',
      color: this.colors[2],
    },
  ];

  public selectedBarCharType: BarChartType = this.chartTypes[0];

  @ViewChild('matTabGroup', { static: false }) matTabGroup: MatTabGroup;

  public load = (country: string) => {
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
  };

  public loadDayHistory = (country: string) => {
    this.store.dispatch(
      countryStatsDayHistoryActions.load({
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
      label: 'Day to Day',
      func: this.loadDayHistory,
    },
    {
      label: 'History',
      func: this.loadHistory,
    },
    {
      label: 'Graphs',
      func: this.loadDayHistory,
    },
  ];

  public constructor(
    private store: Store<fromCountries.CountryState>,
    private route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.loading$ = combineLatest(
      this.store.pipe(select(fromCountries.getCountryStatsLoading)),
      this.store.pipe(select(fromCountries.getCountryStatsHistoryLoading)),
      this.store.pipe(select(fromCountries.getCountryStatsDayHistoryLoading))
    ).pipe(
      map(
        ([
          countryStatsLoading,
          countryStatsHistoryLoading,
          countryStatsDayHistoryLoading,
        ]) =>
          countryStatsLoading ||
          countryStatsHistoryLoading ||
          countryStatsDayHistoryLoading
      )
    );

    this.countryStats$ = this.store.pipe(select(fromCountries.getCountryStats));

    this.countryHistoryStats$ = this.store.pipe(
      select(fromCountries.getCountryStatsHistory)
    );

    this.countryStatsDayHistory$ = this.store.pipe(
      select(fromCountries.getCountryStatsDayHistory)
    );
  }

  public ngAfterViewInit(): void {
    this.paramSub = this.route.paramMap
      .pipe(
        delay(0),
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

  public viewSelectionChanged(option: MatButtonToggleChange): void {
    const index = this.viewOptions.findIndex(
      (viewOption) => viewOption.value === option.value
    );

    this.viewOptions.forEach(
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
    console.log(option);
    this.selectedBarCharType = this.chartTypes.find(
      (type) => type.value === option.value
    );
  }

  public animationDone(index: number): void {
    this.tabLabelsFunc[index].func(this.selectedCountry);

    this.selectedIndex = index;
  }
}

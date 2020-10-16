import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatSelectChange } from '@angular/material/select';
import {
  countriesStatsActions,
  countriesStatsHistoryActions,
  CountryStats,
  fromCountryStatistics,
} from '@covid19-country-statistics-lib/public-api';
import * as fromRoot from '@covid19-statistics/+state';
import {
  CountriesOfInterestActions,
  TitleActions,
} from '@covid19-statistics/core/+state/actions';
import { CountriesAutoCompleteComponent } from '@covid19-statistics/countries/components';
import { BAR_CHART_TYPES } from '@covid19-statistics/countries/countries.constants';
import {
  BarChartType,
  CountryOfInterest,
} from '@covid19-statistics/countries/models';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'covid19-countries-stats-overview',
  templateUrl: './countries-stats-overview.component.html',
  styleUrls: ['./countries-stats-overview.component.scss'],
})
export class CountriesStatsOverviewComponent implements OnInit, OnDestroy {
  public loading$: Observable<boolean>;
  public countryStats$: Observable<CountryStats[]>;
  public countryStatsHistory$: Observable<CountryStats[]>;
  public filteredCountryStats$: Observable<CountryStats[]>;
  public countriesOfInterest: CountryOfInterest[] = [];
  public selectedIndex: number = 0;
  private coiSub$: Subscription;
  public chartTypes: BarChartType[] = BAR_CHART_TYPES;

  public selectedBarCharType: BarChartType = this.chartTypes[0];

  @ViewChild('countryAutoComplete', { static: true })
  countryAutoComplete: CountriesAutoCompleteComponent;

  loadCountriesStats = () => this.store.dispatch(countriesStatsActions.load());
  loadCountriesStatsHistory = () =>
    this.store.dispatch(countriesStatsHistoryActions.load());

  public tabLabelsFunc = [
    {
      label: 'Overview',
      func: this.loadCountriesStats,
    },
    {
      label: 'Top 10',
      func: () => {},
    },
    {
      label: 'Day to Day',
      func: this.loadCountriesStatsHistory,
    },
    {
      label: 'Graphs',
      func: this.loadCountriesStatsHistory,
    },
  ];

  public viewOptions: {
    label: string;
    value: string;
    tooltip: string;
    selected: boolean;
  }[] = [
    {
      label: 'view_agenda',
      value: 'card',
      tooltip: 'Card view',
      selected: true,
    },
    {
      label: 'show_chart',
      value: 'chart',
      tooltip: 'Comparison view',
      selected: false,
    },
  ];

  public constructor(
    private store: Store<fromCountryStatistics.CountryState>
  ) {}

  public ngOnInit(): void {
    this.store.dispatch(new TitleActions.SetTitle('Countries'));
    this.combineLoading();

    this.countryStatsHistory$ = this.store.pipe(
      select(fromCountryStatistics.getCountriesStatsHistory)
    );

    this.coiSub$ = this.store
      .pipe(select(fromRoot.getCountriesOfInterest))
      .subscribe((coi) => (this.countriesOfInterest = coi));

    this.countryStats$ = this.store.pipe(
      select(fromCountryStatistics.getCountriesStats)
    );
    this.combineCountryStats();
  }

  public ngOnDestroy(): void {
    this.coiSub$.unsubscribe();
  }

  public chartTypeSelectionChanged(option: MatSelectChange): void {
    this.selectedBarCharType = this.chartTypes.find(
      (type) => type.value === option.value
    );
  }

  public animationDone(index: number) {
    this.tabLabelsFunc[index].func();
    this.selectedIndex = index;
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

  public storeCountryOfInterest(country: CountryStats): void {
    this.store.dispatch(
      CountriesOfInterestActions.add({
        countryOfInterest: {
          country: country.country,
          countryCode: country.countryCode,
        },
      })
    );
  }

  public removeCountryOfInterest(country: CountryStats): void {
    this.store.dispatch(
      CountriesOfInterestActions.remove({
        countryOfInterest: country.country,
      })
    );
  }

  public trackCountryStatsChanges(countryStats: CountryStats): string {
    return `${countryStats.country}_${countryStats.fetchedAt}`;
  }

  private combineCountryStats(): void {
    this.filteredCountryStats$ = combineLatest([
      this.countryAutoComplete.countriesSelected,
      this.countryStats$,
    ]).pipe(
      map(([selectedCountries, countryStats]) => {
        if (!selectedCountries || !selectedCountries.length) {
          return countryStats;
        }

        return countryStats.filter(
          (s) => selectedCountries.indexOf(s.country) > -1
        );
      })
    );
  }

  private combineLoading(): void {
    this.loading$ = combineLatest([
      this.store.pipe(select(fromCountryStatistics.getCountriesStatsLoading)),
      this.store.pipe(
        select(fromCountryStatistics.getCountriesStatsHistoryLoading)
      ),
    ]).pipe(
      map(([countriesLoading, countriesHistoryLoading]) => {
        console.log(
          countriesLoading,
          countriesHistoryLoading,
          countriesLoading || countriesHistoryLoading
        );
        return countriesLoading || countriesHistoryLoading;
      })
    );
  }
}

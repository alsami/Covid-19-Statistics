import {
  AfterViewInit,
  Component,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import * as fromRoot from '@covid19/+state';
import {
  countriesOfInterestActions,
  TitleActions,
} from '@covid19/core/+state/actions';
import {
  countriesStatsActions,
  countriesStatsHistoryActions,
} from '@covid19/countries/+state/actions';
import * as fromCountries from '@covid19/countries/+state/reducer';
import { CountriesAutoCompleteComponent } from '@covid19/countries/components';
import { BAR_CHART_TYPES } from '@covid19/countries/countries.constants';
import { BarChartType, CountryStats } from '@covid19/countries/models';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'covid19-countries-stats-overview',
  templateUrl: './countries-stats-overview.component.html',
  styleUrls: ['./countries-stats-overview.component.scss'],
})
export class CountriesStatsOverviewComponent
  implements OnInit, AfterViewInit, OnDestroy {
  public loading$: Observable<boolean>;
  public countryStats$: Observable<CountryStats[]>;
  public countryStatsHistory$: Observable<CountryStats[]>;
  public filteredCountryStats$: Observable<CountryStats[]>;
  public countriesOfInterest: string[] = [];
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
      label: 'Daily Graphs',
      func: this.loadCountriesStatsHistory,
    },
  ];

  public constructor(
    private store: Store<fromCountries.CountryState>,
    private zone: NgZone
  ) {}

  public ngOnInit(): void {
    this.countryStatsHistory$ = this.store.pipe(
      select(fromCountries.getCountriesStatsHistory)
    );

    this.coiSub$ = this.store
      .pipe(select(fromRoot.getCountriesOfInterest))
      .subscribe((coi) => (this.countriesOfInterest = coi));

    this.countryStats$ = this.store.pipe(
      select(fromCountries.getCountriesStats)
    );

    this.zone.runOutsideAngular(() => this.combineLoading());
    this.zone.runOutsideAngular(() => this.combineCountryStats());

    this.store.dispatch(new TitleActions.SetTitle('Countries'));
  }

  public ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => this.combineCountryStats());
  }

  public ngOnDestroy(): void {
    this.store.dispatch(countriesStatsActions.reset());
    this.coiSub$.unsubscribe();
  }

  public chartTypeSelectionChanged(option: MatSelectChange): void {
    this.selectedBarCharType = this.chartTypes.find(
      (type) => type.value === option.value
    );
  }

  public animationDone(index: number) {
    this.selectedIndex = index;
    this.tabLabelsFunc[this.selectedIndex].func();
  }

  public storeCountryOfInterest(country: string): void {
    this.store.dispatch(
      countriesOfInterestActions.store({
        countryOfInterest: country,
      })
    );
  }

  public removeCountryOfInterest(country: string): void {
    this.store.dispatch(
      countriesOfInterestActions.remove({
        countryOfInterest: country,
      })
    );
  }

  public trackCountryStatsChanges(countryStats: CountryStats): string {
    return `${countryStats.country}_${countryStats.fetchedAt}`;
  }

  private combineCountryStats(): void {
    this.filteredCountryStats$ = combineLatest(
      this.countryAutoComplete.countriesSelected,
      this.countryStats$
    ).pipe(
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
    this.loading$ = combineLatest(
      this.store.pipe(select(fromCountries.getCountriesStatsLoading)),
      this.store.pipe(select(fromCountries.getCountriesStatsHistoryLoading))
    ).pipe(
      map(
        ([countriesLoading, countriesHistoryLoading]) =>
          countriesLoading || countriesHistoryLoading
      )
    );
  }
}

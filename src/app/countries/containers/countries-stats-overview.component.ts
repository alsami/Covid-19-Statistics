import {
  AfterViewInit,
  Component,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
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
import { CountryStats } from '@covid19/countries/models';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'covid19-countries-stats-overview',
  templateUrl: './countries-stats-overview.component.html',
  styleUrls: ['./countries-stats-overview.component.scss'],
})
export class CountriesStatsOverviewComponent implements OnInit, AfterViewInit {
  public loading$: Observable<boolean>;
  public countryStats$: Observable<CountryStats[]>;
  public countryStatsHistory$: Observable<CountryStats[]>;
  public filteredCountryStats$: Observable<CountryStats[]> = of([]);
  public countriesOfInterest$: Observable<string[]>;
  public selectedIndex: number = 0;

  @ViewChild('countryAutoComplete', { static: false })
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
      label: 'Daily Active',
      func: this.loadCountriesStatsHistory,
    },
    {
      label: 'Daily Deaths',
      func: this.loadCountriesStatsHistory,
    },
    {
      label: 'Daily Recovered',
      func: this.loadCountriesStatsHistory,
    },
  ];

  public constructor(
    private store: Store<fromCountries.CountryState>,
    private zone: NgZone
  ) {}

  public ngOnInit(): void {
    console.log(this.countryAutoComplete);

    this.store.dispatch(new TitleActions.SetTitle('Countries'));

    this.loading$ = combineLatest(
      this.store.pipe(select(fromCountries.getCountriesStatsLoading)),
      this.store.pipe(select(fromCountries.getCountriesStatsHistoryLoading))
    ).pipe(
      map(
        ([countriesLoading, countriesHistoryLoading]) =>
          countriesLoading || countriesHistoryLoading
      )
    );

    this.countryStats$ = this.store.pipe(
      select(fromCountries.getCountriesStats)
    );

    this.countryStatsHistory$ = this.store.pipe(
      select(fromCountries.getCountriesStatsHistory)
    );

    this.countriesOfInterest$ = this.store.pipe(
      select(fromRoot.getCountriesOfInterest)
    );
  }

  public ngAfterViewInit(): void {
    this.subscribeFilterCountryStatsChanges();
  }

  public animationDone(index: number) {
    this.tabLabelsFunc[index].func();

    this.selectedIndex = index;
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

  private subscribeFilterCountryStatsChanges(): void {
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
}

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import * as fromRoot from '@covid19/+state';
import {
  countriesOfInterestActions,
  TitleActions
} from '@covid19/core/+state/actions';
import { countriesStatsActions } from '@covid19/countries/+state/actions';
import * as fromCountries from '@covid19/countries/+state/reducer';
import { CountriesAutoCompleteComponent } from '@covid19/countries/components';
import { CountryStats } from '@covid19/countries/models';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { delay, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'covid19-countries-stats-overview',
  templateUrl: './countries-stats-overview.component.html',
  styleUrls: ['./countries-stats-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountriesStatsOverviewComponent
  implements OnInit, AfterViewInit, OnDestroy {
  public loading$: Observable<boolean>;
  public countryStats$: Observable<CountryStats[]>;
  public filteredCountryStats$: Observable<CountryStats[]>;
  public countriesOfInterest$: Observable<string[]>;
  private countriesOfInterest: string[] = [];
  private countriesOfInterestSub: Subscription;

  @ViewChild('countryAutoComplete', { static: false })
  countryAutoComplete: CountriesAutoCompleteComponent;

  public tabLabelsFunc = [
    {
      label: 'Overview'
    },
    {
      label: 'Graph'
    }
  ];

  public constructor(private store: Store<fromCountries.CountryState>) {}

  public ngOnInit(): void {
    this.store.dispatch(new TitleActions.SetTitle('Countries'));
    this.countryStats$ = this.store.pipe(
      select(fromCountries.getCountriesStats)
    );

    this.countriesOfInterest$ = this.store.pipe(
      select(fromRoot.getCountriesOfInterest)
    );

    this.loading$ = this.store.pipe(
      select(fromCountries.getCountriesStatsLoading)
    );

    this.countriesOfInterestSub = this.countriesOfInterest$
      .pipe(delay(100))
      .subscribe(countriesOfInterest => {
        this.countriesOfInterest = countriesOfInterest;
      });
  }

  public ngAfterViewInit(): void {
    this.subscribeFilterCountryStatsChanges();
  }

  public ngOnDestroy(): void {
    if (this.countriesOfInterestSub) {
      this.countriesOfInterestSub.unsubscribe();
    }
  }

  public animationDone(index: number) {
    if (index !== 0) {
      return;
    }

    this.store.dispatch(countriesStatsActions.load());
  }

  public countryOfInterest(country: string): boolean {
    return this.countriesOfInterest.indexOf(country) > -1;
  }

  public storeCountryOfInterest(country: string): void {
    this.store.dispatch(
      countriesOfInterestActions.store({
        countryOfInterest: country
      })
    );
  }

  public removeCountryOfInterest(country: string): void {
    this.store.dispatch(
      countriesOfInterestActions.remove({
        countryOfInterest: country
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
          s => selectedCountries.indexOf(s.country) > -1
        );
      }),
      distinctUntilChanged()
    );
  }
}

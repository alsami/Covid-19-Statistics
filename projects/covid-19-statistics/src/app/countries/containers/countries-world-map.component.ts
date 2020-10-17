import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  countriesStatsActions,
  CountryStats,
  fromCountryStatistics,
} from '@covid19-country-statistics-lib/public-api';
import * as fromRoot from '@covid19-statistics/+state/';
import { TitleActions } from '@covid19-statistics/core/+state/actions';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'covid19-countries-world-map',
  templateUrl: './countries-world-map.component.html',
  styleUrls: ['./countries-world-map.component.scss'],
})
export class CountriesWorldMapComponent implements OnInit, OnDestroy {
  public countryStats$: Observable<CountryStats[]>;
  public loading$: Observable<boolean>;
  public darkThemeSelected$: Observable<boolean>;

  public constructor(
    private store: Store<fromCountryStatistics.CountryState>
  ) {}

  public ngOnInit(): void {
    this.darkThemeSelected$ = this.store.pipe(
      select(fromRoot.getDarkThemeSelected)
    );

    this.countryStats$ = this.store.pipe(
      select(fromCountryStatistics.getCountriesStats)
    );

    this.loading$ = this.store.pipe(
      select(fromCountryStatistics.getCountriesStatsLoading)
    );

    this.store.dispatch(new TitleActions.SetTitle('World Map'));
    this.store.dispatch(countriesStatsActions.load());
  }

  public ngOnDestroy(): void {
    this.store.dispatch(countriesStatsActions.reset());
  }
}

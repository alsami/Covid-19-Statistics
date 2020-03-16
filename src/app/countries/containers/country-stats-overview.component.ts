import { Component, OnInit } from '@angular/core';
import { countryStatsActions } from '@covid19/countries/+state/actions';
import * as fromCountries from '@covid19/countries/+state/reducer';
import { CountryStats } from '@covid19/countries/models';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'covid19-country-stats-overview',
  templateUrl: './country-stats-overview.component.html',
  styleUrls: ['./country-stats-overview.component.scss']
})
export class CountryStatsOverviewComponent implements OnInit {
  public loading$: Observable<boolean>;
  public countryStats$: Observable<CountryStats[]>;

  public constructor(private store: Store<fromCountries.CountryState>) {}

  public ngOnInit(): void {
    this.loading$ = this.store.pipe(
      select(fromCountries.getCountryStatsLoading)
    );

    this.countryStats$ = this.store.pipe(select(fromCountries.getCountryStats));

    this.store.dispatch(countryStatsActions.load());
  }
}

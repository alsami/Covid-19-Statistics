import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TitleActions } from '@covid19/core/+state/actions';
import { countryStatsHistoryActions } from '@covid19/countries/+state/actions';
import * as fromCountries from '@covid19/countries/+state/reducer';
import { CountryStats } from '@covid19/countries/models';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'covid19-country-stats-history-overview',
  templateUrl: './country-stats-history-overview.component.html',
  styleUrls: ['./country-stats-history-overview.component.scss']
})
export class CountryStatsHistoryOverviewComponent implements OnInit {
  public countryStats$: Observable<CountryStats[]>;
  public loading$: Observable<boolean>;

  public constructor(
    private store: Store<fromCountries.CountryState>,
    private route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.loading$ = this.store.pipe(
      select(fromCountries.getCountryHistoryStatsLoading)
    );

    const country = this.route.snapshot.paramMap.get('country');

    this.store.dispatch(new TitleActions.SetTitle(`${country} History`));

    this.store.dispatch(
      countryStatsHistoryActions.load({
        country: country
      })
    );

    this.countryStats$ = this.store.pipe(
      select(fromCountries.getCountryHistoryStats)
    );
  }
}

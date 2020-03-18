import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TitleActions } from '@covid19/core/+state/actions';
import { countryStatsHistoryActions } from '@covid19/countries/+state/actions';
import * as fromCountries from '@covid19/countries/+state/reducer';
import { CountryStats } from '@covid19/countries/models';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'covid19-country-stats-history-overview',
  templateUrl: './country-stats-history-overview.component.html',
  styleUrls: ['./country-stats-history-overview.component.scss']
})
export class CountryStatsHistoryOverviewComponent implements OnInit, OnDestroy {
  private paramSub: Subscription;

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

    this.paramSub = this.route.paramMap
      .pipe(map(paramMap => paramMap.get('country')))
      .subscribe(country => {
        this.store.dispatch(new TitleActions.SetTitle(`${country} History`));

        this.store.dispatch(
          countryStatsHistoryActions.load({
            country: country
          })
        );
      });

    this.countryStats$ = this.store.pipe(
      select(fromCountries.getCountryHistoryStats)
    );
  }

  public ngOnDestroy(): void {
    if (this.paramSub) {
      this.paramSub.unsubscribe();
    }
  }
}

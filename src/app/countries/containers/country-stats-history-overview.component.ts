import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { TitleActions } from '@covid19/core/+state/actions';
import {
  countryStatsDayHistoryActions,
  countryStatsHistoryActions
} from '@covid19/countries/+state/actions';
import * as fromCountries from '@covid19/countries/+state/reducer';
import { CountryStats } from '@covid19/countries/models';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Component({
  selector: 'covid19-country-stats-history-overview',
  templateUrl: './country-stats-history-overview.component.html',
  styleUrls: ['./country-stats-history-overview.component.scss']
})
export class CountryStatsHistoryOverviewComponent
  implements OnInit, AfterViewInit, OnDestroy {
  private paramSub: Subscription;
  private selectedCountry: string;

  public countryStats$: Observable<CountryStats[]>;
  public countryStatsDayHistory$: Observable<CountryStats[]>;
  public loading$: Observable<boolean>;

  @ViewChild('matTabGroup', { static: false }) matTabGroup: MatTabGroup;

  public loadHistory = (country: string) => {
    this.store.dispatch(
      countryStatsHistoryActions.load({
        country: country
      })
    );
  };

  public loadDayHistory = (country: string) => {
    this.store.dispatch(
      countryStatsDayHistoryActions.load({
        country: country
      })
    );
  };

  tabLabelsFunc = [
    {
      label: 'History',
      func: this.loadHistory
    },
    {
      label: 'Graph',
      func: this.loadDayHistory
    }
  ];

  public constructor(
    private store: Store<fromCountries.CountryState>,
    private route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.loading$ = combineLatest(
      this.store.pipe(select(fromCountries.getCountryHistoryStatsLoading)),
      this.store.pipe(select(fromCountries.getCountryDayHistoryStatsLoading))
    ).pipe(
      map(
        ([countryStatsHistoryLoading, countryStatsDayHistoryLoading]) =>
          countryStatsHistoryLoading || countryStatsDayHistoryLoading
      )
    );

    this.countryStats$ = this.store.pipe(
      select(fromCountries.getCountryHistoryStats)
    );

    this.countryStatsDayHistory$ = this.store.pipe(
      select(fromCountries.getCountryDayHistoryStats)
    );
  }

  public ngAfterViewInit(): void {
    this.paramSub = this.route.paramMap
      .pipe(
        delay(0),
        map(paramMap => paramMap.get('country'))
      )
      .subscribe(country => {
        this.store.dispatch(new TitleActions.SetTitle(`${country} History`));
        this.selectedCountry = country;
      });
  }

  public ngOnDestroy(): void {
    if (this.paramSub) {
      this.paramSub.unsubscribe();
    }
  }

  public animationDone(index: number): void {
    this.tabLabelsFunc[index].func(this.selectedCountry);
  }
}

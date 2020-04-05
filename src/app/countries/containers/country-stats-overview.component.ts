import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { TitleActions } from '@covid19/core/+state/actions';
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
      label: 'Graph',
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

  public animationDone(index: number): void {
    this.tabLabelsFunc[index].func(this.selectedCountry);

    this.selectedIndex = index;
  }
}
